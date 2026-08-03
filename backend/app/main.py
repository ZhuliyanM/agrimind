from datetime import datetime, UTC
from pathlib import Path
import sqlite3
from typing import Literal
from pydantic import BaseModel, Field
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI(
    title="AgriMind Python API",
    version="0.1.0",
)

DB_PATH = Path(__file__).resolve().parent / "agrimind.db"

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


PARCELS = [
    {"id": "234183485", "name": "Парцел 234183485", "crop": "Пшеница"},
    {"id": "234183486", "name": "Парцел 234183486", "crop": "Слънчоглед"},
    {"id": "258599123", "name": "Парцел 258599123", "crop": "Царевица"},
    {"id": "313304850", "name": "Парцел 313304850", "crop": "Ечемик"},
    {"id": "313304851", "name": "Парцел 313304851", "crop": "Рапица"},
    {"id": "314432044", "name": "Парцел 314432044", "crop": "Слънчоглед"},
    {"id": "315658111", "name": "Парцел 315658111", "crop": "Царевица"},
    {"id": "316439803", "name": "Парцел 316439803", "crop": "Пшеница"},
]

HISTORY_SEED = {
    "234183485": ["15 юли: обновена граница след GPS оглед", "22 юли: дневник за торене и влага"],
    "234183486": ["14 юли: засечен стрес в североизточния блок", "26 юли: повторна проверка на културата"],
    "258599123": ["11 юли: дневник за поливка", "28 юли: отбелязана зона с неравномерен растеж"],
    "313304850": ["09 юли: корекция на блокова линия", "19 юли: архивиран теренен доклад"],
    "313304851": ["12 юли: потвърдено състояние на границите", "30 юли: лог за агрономичен оглед"],
    "314432044": ["17 юли: промяна в полевия достъп", "27 юли: описание на граница към сервизен път"],
    "315658111": ["08 юли: сигнал за южен коридор", "24 юли: вписан дневник за проблемен участък"],
    "316439803": ["13 юли: засечена стабилна вегетация", "25 юли: добавена бележка за исторически добив"],
}


class ChatRequest(BaseModel):
    message: str


class EntryCreateRequest(BaseModel):
    content: str = Field(min_length=1, max_length=2000)


class EntryUpdateRequest(BaseModel):
    content: str = Field(min_length=1, max_length=2000)


class FieldEntry(BaseModel):
    id: int
    field_id: str
    content: str
    created_at: str
    updated_at: str


class FieldEntriesResponse(BaseModel):
    items: list[FieldEntry]


EntryTableName = Literal["journals", "history"]


def utc_now_iso() -> str:
    return datetime.now(UTC).isoformat()


def connect_db() -> sqlite3.Connection:
    connection = sqlite3.connect(DB_PATH)
    connection.row_factory = sqlite3.Row
    return connection


def init_db() -> None:
    connection = connect_db()
    cursor = connection.cursor()

    cursor.execute(
        """
        CREATE TABLE IF NOT EXISTS journals (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            field_id TEXT NOT NULL,
            content TEXT NOT NULL,
            created_at TEXT NOT NULL,
            updated_at TEXT NOT NULL
        )
        """
    )

    cursor.execute(
        """
        CREATE TABLE IF NOT EXISTS history (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            field_id TEXT NOT NULL,
            content TEXT NOT NULL,
            created_at TEXT NOT NULL,
            updated_at TEXT NOT NULL
        )
        """
    )

    history_count = cursor.execute("SELECT COUNT(*) AS count FROM history").fetchone()["count"]

    if history_count == 0:
        for field_id, items in HISTORY_SEED.items():
            for content in items:
                timestamp = utc_now_iso()
                cursor.execute(
                    "INSERT INTO history (field_id, content, created_at, updated_at) VALUES (?, ?, ?, ?)",
                    (field_id, content, timestamp, timestamp),
                )

    connection.commit()
    connection.close()


def row_to_entry(row: sqlite3.Row) -> FieldEntry:
    return FieldEntry(
        id=row["id"],
        field_id=row["field_id"],
        content=row["content"],
        created_at=row["created_at"],
        updated_at=row["updated_at"],
    )


def ensure_field_exists(field_id: str) -> None:
    if not any(parcel["id"] == field_id for parcel in PARCELS):
        raise HTTPException(status_code=404, detail="Field not found")


def ensure_table_supported(table: str) -> EntryTableName:
    if table not in ["journals", "history"]:
        raise HTTPException(status_code=400, detail="Unsupported table")

    return table


def list_entries(field_id: str, table: EntryTableName) -> list[FieldEntry]:
    connection = connect_db()
    cursor = connection.cursor()
    rows = cursor.execute(
        f"SELECT id, field_id, content, created_at, updated_at FROM {table} WHERE field_id = ? ORDER BY id DESC",
        (field_id,),
    ).fetchall()
    connection.close()
    return [row_to_entry(row) for row in rows]


def create_entry(field_id: str, table: EntryTableName, content: str) -> FieldEntry:
    timestamp = utc_now_iso()
    connection = connect_db()
    cursor = connection.cursor()
    cursor.execute(
        f"INSERT INTO {table} (field_id, content, created_at, updated_at) VALUES (?, ?, ?, ?)",
        (field_id, content, timestamp, timestamp),
    )
    entry_id = cursor.lastrowid
    row = cursor.execute(
        f"SELECT id, field_id, content, created_at, updated_at FROM {table} WHERE id = ?",
        (entry_id,),
    ).fetchone()
    connection.commit()
    connection.close()

    if row is None:
        raise HTTPException(status_code=500, detail="Entry creation failed")

    return row_to_entry(row)


def update_entry(field_id: str, table: EntryTableName, entry_id: int, content: str) -> FieldEntry:
    timestamp = utc_now_iso()
    connection = connect_db()
    cursor = connection.cursor()
    result = cursor.execute(
        f"UPDATE {table} SET content = ?, updated_at = ? WHERE id = ? AND field_id = ?",
        (content, timestamp, entry_id, field_id),
    )

    if result.rowcount == 0:
        connection.close()
        raise HTTPException(status_code=404, detail="Entry not found")

    row = cursor.execute(
        f"SELECT id, field_id, content, created_at, updated_at FROM {table} WHERE id = ? AND field_id = ?",
        (entry_id, field_id),
    ).fetchone()
    connection.commit()
    connection.close()

    if row is None:
        raise HTTPException(status_code=500, detail="Entry update failed")

    return row_to_entry(row)


def delete_entry(field_id: str, table: EntryTableName, entry_id: int) -> None:
    connection = connect_db()
    cursor = connection.cursor()
    result = cursor.execute(
        f"DELETE FROM {table} WHERE id = ? AND field_id = ?",
        (entry_id, field_id),
    )
    connection.commit()
    connection.close()

    if result.rowcount == 0:
        raise HTTPException(status_code=404, detail="Entry not found")


init_db()


def normalize(value: str) -> str:
    return value.strip().lower()


def parse_chat_command(message: str) -> dict:
    normalized = normalize(message)
    actions = []

    if any(token in normalized for token in ["начало", "landing", "начална страница"]):
        actions.append({"type": "navigate", "path": "/"})
        return {"message": "Отварям началната страница.", "actions": actions}

    if any(token in normalized for token in ["вход", "логин", "auth"]):
        actions.append({"type": "navigate", "path": "/auth"})
        return {"message": "Отварям страницата за вход.", "actions": actions}

    actions.append({"type": "navigate", "path": "/app"})

    if "ndvi" in normalized:
        actions.append({"type": "set_map_layer", "value": "ndvi"})

    if any(token in normalized for token in ["сателит", "rgb", "карта"]):
        actions.append({"type": "set_map_layer", "value": "sentinel"})

    journals_tokens = ["дневници", "дневник", "журнал", "журнали", "бележки"]
    boundaries_tokens = ["граници", "граница", "контур", "контури"]
    history_tokens = ["история", "история на блока", "исторически"]

    if any(token in normalized for token in journals_tokens):
        actions[0] = {"type": "navigate", "path": "/app/fields"}
        actions.append({"type": "close_panels"})
        actions.append({"type": "open_fields_section", "section": "journals"})
        return {"message": "Отварям секцията с дневниците на полетата.", "actions": actions}

    if any(token in normalized for token in boundaries_tokens):
        actions[0] = {"type": "navigate", "path": "/app/fields"}
        actions.append({"type": "close_panels"})
        actions.append({"type": "open_fields_section", "section": "boundaries"})
        return {"message": "Отварям секцията за управление на границите.", "actions": actions}

    if any(token in normalized for token in history_tokens):
        actions[0] = {"type": "navigate", "path": "/app/fields"}
        actions.append({"type": "close_panels"})
        actions.append({"type": "open_fields_section", "section": "history"})
        return {"message": "Отварям историята на избрания блок.", "actions": actions}

    if any(token in normalized for token in ["всички полета", "полетата", "покажи полета", "отвори полета"]):
        actions[0] = {"type": "navigate", "path": "/app/fields"}
        actions.append({"type": "close_panels"})
        actions.append({"type": "set_search_query", "value": ""})
        return {"message": "Отварям отделната страница за всички полета.", "actions": actions}

    if any(token in normalized for token in ["операции", "инциденти", "оперативен панел"]):
        actions.append({"type": "open_panel", "panel": "right"})
        return {"message": "Отварям оперативния панел.", "actions": actions}

    if any(token in normalized for token in ["върни ме на картата", "към картата", "начален екран на картата"]):
        actions.append({"type": "close_panels"})
        return {"message": "Връщам те към основната карта.", "actions": actions}

    if any(token in normalized for token in ["затвори панелите", "изчисти", "само карта"]):
        actions.append({"type": "close_panels"})
        return {"message": "Оставям само картата и затварям страничните панели.", "actions": actions}

    parcel_match = next((parcel for parcel in PARCELS if parcel["id"] in normalized), None)

    if parcel_match is None:
        parcel_match = next(
            (
                parcel
                for parcel in PARCELS
                if normalize(parcel["crop"]) in normalized or normalize(parcel["name"]) in normalized
            ),
            None,
        )

    if parcel_match is not None:
        actions[0] = {"type": "navigate", "path": "/app/fields"}
        actions.append({"type": "close_panels"})
        actions.append({"type": "select_parcel", "parcelId": parcel_match["id"]})
        actions.append({"type": "set_search_query", "value": parcel_match["id"]})
        return {
            "message": f"Избирам {parcel_match['name']} и отварям страницата с полетата.",
            "actions": actions,
        }

    if any(crop in normalized for crop in ["пшеница", "царевица", "слънчоглед", "ечемик", "рапица"]):
        actions[0] = {"type": "navigate", "path": "/app/fields"}
        actions.append({"type": "close_panels"})
        actions.append({"type": "set_search_query", "value": message.strip()})
        return {"message": "Филтрирам полетата по зададената култура.", "actions": actions}

    return {
        "message": "Мога да управлявам полета, операции, карта, NDVI режим и избор на конкретен парцел. Например: „Покажи всички полета“.",
        "actions": actions,
    }


def build_overview_payload() -> dict:
    return {
        "source": "python-fastapi",
        "region": "Земеделски пояс Шумен",
        "stats": [
            {"label": "Регион", "value": "Земеделски пояс Шумен"},
            {"label": "Граници", "value": "Реални OSM парцели"},
            {"label": "Изображение", "value": "Sentinel + NDVI режим"},
            {"label": "Сигнали", "value": "3 активни за проверка"},
        ],
        "recommendation": "Провери южния коридор за спад в NDVI и синхронизирай с графика за напояване.",
        "status": "Python backend active",
    }


@app.get("/health")
def health() -> dict:
    return {
        "status": "ok",
        "service": "agrimind-python-api",
    }


@app.get("/api/overview")
def overview() -> dict:
    return build_overview_payload()


@app.post("/api/chat")
def chat(request: ChatRequest) -> dict:
    return parse_chat_command(request.message)


@app.get("/api/fields/{field_id}/journals", response_model=FieldEntriesResponse)
def get_field_journals(field_id: str) -> FieldEntriesResponse:
    ensure_field_exists(field_id)
    table = ensure_table_supported("journals")
    return FieldEntriesResponse(items=list_entries(field_id, table))


@app.post("/api/fields/{field_id}/journals", response_model=FieldEntry)
def create_field_journal(field_id: str, request: EntryCreateRequest) -> FieldEntry:
    ensure_field_exists(field_id)
    table = ensure_table_supported("journals")
    return create_entry(field_id, table, request.content.strip())


@app.put("/api/fields/{field_id}/journals/{entry_id}", response_model=FieldEntry)
def update_field_journal(field_id: str, entry_id: int, request: EntryUpdateRequest) -> FieldEntry:
    ensure_field_exists(field_id)
    table = ensure_table_supported("journals")
    return update_entry(field_id, table, entry_id, request.content.strip())


@app.delete("/api/fields/{field_id}/journals/{entry_id}")
def delete_field_journal(field_id: str, entry_id: int) -> dict:
    ensure_field_exists(field_id)
    table = ensure_table_supported("journals")
    delete_entry(field_id, table, entry_id)
    return {"ok": True, "id": entry_id}


@app.get("/api/fields/{field_id}/history", response_model=FieldEntriesResponse)
def get_field_history(field_id: str) -> FieldEntriesResponse:
    ensure_field_exists(field_id)
    table = ensure_table_supported("history")
    return FieldEntriesResponse(items=list_entries(field_id, table))


@app.post("/api/fields/{field_id}/history", response_model=FieldEntry)
def create_field_history(field_id: str, request: EntryCreateRequest) -> FieldEntry:
    ensure_field_exists(field_id)
    table = ensure_table_supported("history")
    return create_entry(field_id, table, request.content.strip())


@app.put("/api/fields/{field_id}/history/{entry_id}", response_model=FieldEntry)
def update_field_history(field_id: str, entry_id: int, request: EntryUpdateRequest) -> FieldEntry:
    ensure_field_exists(field_id)
    table = ensure_table_supported("history")
    return update_entry(field_id, table, entry_id, request.content.strip())


@app.delete("/api/fields/{field_id}/history/{entry_id}")
def delete_field_history(field_id: str, entry_id: int) -> dict:
    ensure_field_exists(field_id)
    table = ensure_table_supported("history")
    delete_entry(field_id, table, entry_id)
    return {"ok": True, "id": entry_id}
