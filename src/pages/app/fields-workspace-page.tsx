import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { MapPinned, NotebookPen, ScanSearch, ShieldCheck, Trash2, Waypoints } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { parcelOutlines } from '@/modules/field-intelligence/model/shumen-region.ts'
import { getParcelNdvi } from '@/modules/fields/model/field-kpis.ts'
import {
  createFieldHistory,
  createFieldJournal,
  deleteFieldHistory,
  deleteFieldJournal,
  fetchFieldHistory,
  fetchFieldJournals,
  updateFieldHistory,
  updateFieldJournal,
  type FieldEntry,
} from '@/shared/api/python-fields.ts'
import { useShellStore, type FieldsSectionMode } from '@/shared/lib/shell-store.ts'

const boundaryNotesByParcel: Record<string, string[]> = {
  '234183485': ['Северна граница е синхронизирана с последния GPS трак.', 'Източният ръб изисква полево потвърждение.'],
  '234183486': ['Блокът граничи с напоителен канал.', 'Западната линия е маркирана за сезонна ревизия.'],
  '258599123': ['Централната зона има два вътрешни ориентировъчни сегмента.', 'Границата е стабилна спрямо OSM очертанието.'],
  '313304850': ['Южната част е с тесен обслужващ достъп.', 'Контурът е готов за експортиране към кадастър.'],
  '313304851': ['Има архивирани 3 версии на контура.', 'Северният връх е последно редактиран през юли.'],
  '314432044': ['Малкият блок е маркиран като бърз за теренен обход.', 'Провери граничната линия след валеж.'],
  '315658111': ['Южната зона е приоритет за следваща ревизия.', 'Има активна бележка за проверка на контур.'],
  '316439803': ['Границата е без отворени задачи.', 'Има налична история на две сезонни актуализации.'],
}

const sections: Array<{ id: FieldsSectionMode; label: string }> = [
  { id: 'overview', label: 'Преглед' },
  { id: 'journals', label: 'Дневници' },
  { id: 'boundaries', label: 'Граници' },
  { id: 'history', label: 'История' },
]

function formatTimestamp(value: string): string {
  const date = new Date(value)

  if (Number.isNaN(date.getTime())) {
    return value
  }

  return new Intl.DateTimeFormat('bg-BG', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date)
}

export function FieldsWorkspacePage() {
  const searchQuery = useShellStore((state) => state.searchQuery)
  const selectedParcelId = useShellStore((state) => state.selectedParcelId)
  const setSelectedParcelId = useShellStore((state) => state.setSelectedParcelId)
  const activeFieldsSection = useShellStore((state) => state.activeFieldsSection)
  const setActiveFieldsSection = useShellStore((state) => state.setActiveFieldsSection)
  const queryClient = useQueryClient()
  const selectedParcel = parcelOutlines.find((parcel) => parcel.id === selectedParcelId) ?? parcelOutlines[0]
  const selectedNdvi = getParcelNdvi(selectedParcel?.id ?? null)
  const [journalDraft, setJournalDraft] = useState('')
  const [historyDraft, setHistoryDraft] = useState('')
  const [editingJournal, setEditingJournal] = useState<{ id: number; value: string } | null>(null)
  const [editingHistory, setEditingHistory] = useState<{ id: number; value: string } | null>(null)
  const sectionsRef = useRef<Partial<Record<FieldsSectionMode, HTMLElement | null>>>({})

  const normalizedQuery = searchQuery.trim().toLowerCase()
  const visibleParcels = useMemo(
    () =>
      normalizedQuery
        ? parcelOutlines.filter((parcel) =>
            [parcel.name, parcel.id, parcel.crop].some((value) => value.toLowerCase().includes(normalizedQuery)),
          )
        : parcelOutlines,
    [normalizedQuery],
  )
  const fieldId = selectedParcel?.id ?? ''

  const journalsQuery = useQuery({
    queryKey: ['field-journals', fieldId],
    queryFn: () => fetchFieldJournals(fieldId),
    enabled: Boolean(fieldId),
  })

  const historyQuery = useQuery({
    queryKey: ['field-history', fieldId],
    queryFn: () => fetchFieldHistory(fieldId),
    enabled: Boolean(fieldId),
  })

  const createJournalMutation = useMutation({
    mutationFn: (content: string) => createFieldJournal(fieldId, content),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['field-journals', fieldId] })
      setJournalDraft('')
    },
  })

  const updateJournalMutation = useMutation({
    mutationFn: ({ entryId, content }: { entryId: number; content: string }) => updateFieldJournal(fieldId, entryId, content),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['field-journals', fieldId] })
      setEditingJournal(null)
    },
  })

  const deleteJournalMutation = useMutation({
    mutationFn: (entryId: number) => deleteFieldJournal(fieldId, entryId),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['field-journals', fieldId] })
    },
  })

  const createHistoryMutation = useMutation({
    mutationFn: (content: string) => createFieldHistory(fieldId, content),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['field-history', fieldId] })
      setHistoryDraft('')
    },
  })

  const updateHistoryMutation = useMutation({
    mutationFn: ({ entryId, content }: { entryId: number; content: string }) => updateFieldHistory(fieldId, entryId, content),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['field-history', fieldId] })
      setEditingHistory(null)
    },
  })

  const deleteHistoryMutation = useMutation({
    mutationFn: (entryId: number) => deleteFieldHistory(fieldId, entryId),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['field-history', fieldId] })
    },
  })

  useEffect(() => {
    if (activeFieldsSection === 'overview') {
      return
    }

    sectionsRef.current[activeFieldsSection]?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [activeFieldsSection, fieldId])

  const boundaryPoints = selectedParcel?.polygon.length ?? 0
  const parcelHistory = historyQuery.data?.items ?? []
  const parcelJournals = journalsQuery.data?.items ?? []
  const parcelBoundaryNotes = boundaryNotesByParcel[selectedParcel?.id ?? ''] ?? []

  const addJournalEntry = () => {
    const trimmed = journalDraft.trim()

    if (!trimmed) {
      return
    }

    createJournalMutation.mutate(trimmed)
  }

  const addHistoryEntry = () => {
    const trimmed = historyDraft.trim()

    if (!trimmed) {
      return
    }

    createHistoryMutation.mutate(trimmed)
  }

  const renderEntriesState = (isLoading: boolean, isError: boolean, emptyText: string) => {
    if (isLoading) {
      return <div className="rounded-[1rem] border border-white/55 bg-white/44 px-3 py-3 text-sm text-slate-500">Зареждане от Python backend...</div>
    }

    if (isError) {
      return <div className="rounded-[1rem] border border-dashed border-rose-200 bg-rose-50/70 px-3 py-3 text-sm text-rose-600">Грешка при зареждане. Провери Python API.</div>
    }

    return <div className="rounded-[1rem] border border-dashed border-white/55 bg-white/44 px-3 py-3 text-sm text-slate-500">{emptyText}</div>
  }

  const EntryActions = ({
    onEdit,
    onDelete,
    disabled,
  }: {
    onEdit: () => void
    onDelete: () => void
    disabled: boolean
  }) => (
    <div className="flex items-center gap-1.5">
      <button
        type="button"
        onClick={onEdit}
        disabled={disabled}
        className="rounded-full border border-white/60 bg-white/70 px-3 py-1.5 text-xs text-slate-600 transition hover:text-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Редакция
      </button>
      <button
        type="button"
        onClick={onDelete}
        disabled={disabled}
        className="inline-flex items-center gap-1 rounded-full border border-rose-200 bg-rose-50/70 px-3 py-1.5 text-xs text-rose-700 transition hover:bg-rose-100 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <Trash2 className="h-3 w-3" />
        Изтрий
      </button>
    </div>
  )

  const EntryMeta = ({ entry }: { entry: FieldEntry }) => (
    <p className="mt-1 text-[11px] text-slate-400">Обновено: {formatTimestamp(entry.updated_at)}</p>
  )

  const isJournalBusy = createJournalMutation.isPending || updateJournalMutation.isPending || deleteJournalMutation.isPending
  const isHistoryBusy = createHistoryMutation.isPending || updateHistoryMutation.isPending || deleteHistoryMutation.isPending

  const onSelectSection = (section: FieldsSectionMode) => {
    setActiveFieldsSection(section)
  }

  return (
    <div className="h-full w-full overflow-y-auto px-3 py-3 sm:px-4">
      <div className="mx-auto grid max-w-[1380px] gap-3 xl:grid-cols-[300px_minmax(0,1fr)]">
        <aside className="rounded-[1.4rem] border border-white/55 bg-white/72 p-3 shadow-[0_16px_34px_rgba(37,99,235,0.12)] backdrop-blur-xl">
          <p className="text-[10px] uppercase tracking-[0.18em] text-blue-700">Всички полета</p>
          <h1 className="mt-1 text-lg font-semibold text-slate-900">Работна страница за блокове</h1>
          <p className="mt-1 text-sm text-slate-500">AI чатът управлява филтъра, избора и навигацията. Тук виждаш дневници, граници и история.</p>

          <div className="mt-3 grid grid-cols-2 gap-1.5">
            {sections.map((section) => {
              const isActive = activeFieldsSection === section.id

              return (
                <button
                  key={section.id}
                  type="button"
                  onClick={() => onSelectSection(section.id)}
                  className={[
                    'rounded-full border px-2.5 py-1.5 text-xs font-medium transition',
                    isActive
                      ? 'border-blue-300 bg-blue-50 text-blue-700'
                      : 'border-white/60 bg-white/58 text-slate-600 hover:border-blue-200 hover:text-slate-900',
                  ].join(' ')}
                >
                  {section.label}
                </button>
              )
            })}
          </div>

          <div className="mt-3 grid gap-2">
            {visibleParcels.map((parcel) => {
              const isActive = selectedParcel?.id === parcel.id

              return (
                <button
                  key={parcel.id}
                  type="button"
                  onClick={() => {
                    setSelectedParcelId(parcel.id)
                    setActiveFieldsSection('overview')
                  }}
                  className={[
                    'rounded-[1rem] border px-3 py-2.5 text-left transition',
                    isActive
                      ? 'border-blue-300 bg-blue-50/80 text-slate-900'
                      : 'border-white/55 bg-white/58 text-slate-600 hover:border-blue-200 hover:bg-white/78 hover:text-slate-900',
                  ].join(' ')}
                >
                  <p className="text-sm font-semibold">{parcel.name}</p>
                  <p className="mt-1 text-xs text-slate-500">{parcel.crop} · {parcel.area}</p>
                </button>
              )
            })}
            {visibleParcels.length === 0 ? (
              <div className="rounded-[1rem] border border-dashed border-white/55 bg-white/48 px-3 py-3 text-sm text-slate-500">
                Няма намерени полета за: {searchQuery}
              </div>
            ) : null}
          </div>
        </aside>

        <section className="grid gap-3">
          <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_minmax(280px,340px)]">
            <article className="rounded-[1.4rem] border border-white/55 bg-white/72 p-4 shadow-[0_16px_34px_rgba(37,99,235,0.12)] backdrop-blur-xl">
              <div ref={(element) => {
                sectionsRef.current.overview = element
              }} />
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.18em] text-blue-700">Активен блок</p>
                  <h2 className="mt-1 text-xl font-semibold text-slate-900">{selectedParcel?.name}</h2>
                  <p className="mt-1 text-sm text-slate-500">{selectedParcel?.crop} · {selectedParcel?.area}</p>
                </div>
                <MapPinned className="h-5 w-5 text-blue-600" />
              </div>

              <div className="mt-4 grid gap-2 sm:grid-cols-3">
                <div className="rounded-[1rem] border border-white/55 bg-blue-50/42 px-3 py-2.5">
                  <p className="text-[10px] uppercase tracking-[0.16em] text-blue-700">NDVI</p>
                  <p className="mt-1 text-sm font-semibold text-slate-900">{selectedNdvi?.toFixed(2) ?? 'Няма данни'}</p>
                </div>
                <div className="rounded-[1rem] border border-white/55 bg-blue-50/42 px-3 py-2.5">
                  <p className="text-[10px] uppercase tracking-[0.16em] text-blue-700">Гранични точки</p>
                  <p className="mt-1 text-sm font-semibold text-slate-900">{boundaryPoints}</p>
                </div>
                <div className="rounded-[1rem] border border-white/55 bg-blue-50/42 px-3 py-2.5">
                  <p className="text-[10px] uppercase tracking-[0.16em] text-blue-700">История</p>
                  <p className="mt-1 text-sm font-semibold text-slate-900">{parcelHistory.length} записа</p>
                </div>
              </div>
            </article>

            <article className="rounded-[1.4rem] border border-white/55 bg-white/72 p-4 shadow-[0_16px_34px_rgba(37,99,235,0.12)] backdrop-blur-xl">
              <div ref={(element) => {
                sectionsRef.current.boundaries = element
              }} />
              <div className="flex items-center gap-2 text-blue-700">
                <ShieldCheck className="h-4 w-4" />
                <p className="text-xs uppercase tracking-[0.18em]">Управление на граници</p>
              </div>
              <div className="mt-3 space-y-2 text-sm text-slate-600">
                {parcelBoundaryNotes.map((note) => (
                  <div key={note} className="rounded-[1rem] border border-white/55 bg-white/52 px-3 py-2.5">
                    {note}
                  </div>
                ))}
              </div>
            </article>
          </div>

          <div className="grid gap-3 xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
            <article className="rounded-[1.4rem] border border-white/55 bg-white/72 p-4 shadow-[0_16px_34px_rgba(37,99,235,0.12)] backdrop-blur-xl">
              <div ref={(element) => {
                sectionsRef.current.journals = element
              }} />
              <div className="flex items-center gap-2 text-blue-700">
                <NotebookPen className="h-4 w-4" />
                <p className="text-xs uppercase tracking-[0.18em]">Дневници</p>
              </div>
              <div className="mt-3 rounded-[1rem] border border-white/55 bg-white/56 p-3">
                <textarea
                  value={journalDraft}
                  onChange={(event) => setJournalDraft(event.target.value)}
                  placeholder="Добави полеви дневник, наблюдение или бележка за блока..."
                  className="min-h-[110px] w-full resize-none bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
                />
                <div className="mt-3 flex justify-end">
                  <button
                    type="button"
                    onClick={addJournalEntry}
                    disabled={isJournalBusy || !journalDraft.trim()}
                    className="rounded-full bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {createJournalMutation.isPending ? 'Записвам...' : 'Запиши дневник'}
                  </button>
                </div>
              </div>

              <div className="mt-3 space-y-2">
                {parcelJournals.length === 0 ? (
                  renderEntriesState(
                    journalsQuery.isLoading,
                    journalsQuery.isError,
                    'Все още няма нови ръчни записи за този блок.',
                  )
                ) : (
                  parcelJournals.map((entry) => (
                    <div key={entry.id} className="rounded-[1rem] border border-white/55 bg-blue-50/34 px-3 py-2.5 text-sm text-slate-700">
                      {editingJournal?.id === entry.id ? (
                        <>
                          <textarea
                            value={editingJournal.value}
                            onChange={(event) => setEditingJournal({ id: entry.id, value: event.target.value })}
                            className="min-h-[90px] w-full resize-none rounded-[0.9rem] border border-white/65 bg-white/75 px-2.5 py-2 text-sm outline-none"
                          />
                          <div className="mt-2 flex justify-end gap-1.5">
                            <button
                              type="button"
                              onClick={() => setEditingJournal(null)}
                              className="rounded-full border border-white/60 bg-white/70 px-3 py-1.5 text-xs text-slate-600"
                            >
                              Отказ
                            </button>
                            <button
                              type="button"
                              disabled={updateJournalMutation.isPending || !editingJournal.value.trim()}
                              onClick={() => updateJournalMutation.mutate({ entryId: entry.id, content: editingJournal.value.trim() })}
                              className="rounded-full bg-blue-600 px-3 py-1.5 text-xs font-medium text-white disabled:cursor-not-allowed disabled:opacity-60"
                            >
                              Запази
                            </button>
                          </div>
                        </>
                      ) : (
                        <>
                          <p>{entry.content}</p>
                          <EntryMeta entry={entry} />
                          <div className="mt-2 flex justify-end">
                            <EntryActions
                              disabled={isJournalBusy}
                              onEdit={() => setEditingJournal({ id: entry.id, value: entry.content })}
                              onDelete={() => deleteJournalMutation.mutate(entry.id)}
                            />
                          </div>
                        </>
                      )}
                    </div>
                  ))
                )}
              </div>
            </article>

            <article className="rounded-[1.4rem] border border-white/55 bg-white/72 p-4 shadow-[0_16px_34px_rgba(37,99,235,0.12)] backdrop-blur-xl">
              <div ref={(element) => {
                sectionsRef.current.history = element
              }} />
              <div className="flex items-center gap-2 text-blue-700">
                <Waypoints className="h-4 w-4" />
                <p className="text-xs uppercase tracking-[0.18em]">История на блока</p>
              </div>
              <div className="mt-3 rounded-[1rem] border border-white/55 bg-white/56 p-3">
                <textarea
                  value={historyDraft}
                  onChange={(event) => setHistoryDraft(event.target.value)}
                  placeholder="Добави събитие в историята на блока..."
                  className="min-h-[84px] w-full resize-none bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
                />
                <div className="mt-3 flex justify-end">
                  <button
                    type="button"
                    onClick={addHistoryEntry}
                    disabled={isHistoryBusy || !historyDraft.trim()}
                    className="rounded-full bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {createHistoryMutation.isPending ? 'Записвам...' : 'Добави събитие'}
                  </button>
                </div>
              </div>

              <div className="mt-3 space-y-2">
                {parcelHistory.length === 0 ? (
                  renderEntriesState(historyQuery.isLoading, historyQuery.isError, 'Все още няма събития за този блок.')
                ) : (
                  parcelHistory.map((event) => (
                    <div key={event.id} className="rounded-[1rem] border border-white/55 bg-white/52 px-3 py-2.5 text-sm text-slate-700">
                      {editingHistory?.id === event.id ? (
                        <>
                          <textarea
                            value={editingHistory.value}
                            onChange={(editEvent) => setEditingHistory({ id: event.id, value: editEvent.target.value })}
                            className="min-h-[90px] w-full resize-none rounded-[0.9rem] border border-white/65 bg-white/75 px-2.5 py-2 text-sm outline-none"
                          />
                          <div className="mt-2 flex justify-end gap-1.5">
                            <button
                              type="button"
                              onClick={() => setEditingHistory(null)}
                              className="rounded-full border border-white/60 bg-white/70 px-3 py-1.5 text-xs text-slate-600"
                            >
                              Отказ
                            </button>
                            <button
                              type="button"
                              disabled={updateHistoryMutation.isPending || !editingHistory.value.trim()}
                              onClick={() => updateHistoryMutation.mutate({ entryId: event.id, content: editingHistory.value.trim() })}
                              className="rounded-full bg-blue-600 px-3 py-1.5 text-xs font-medium text-white disabled:cursor-not-allowed disabled:opacity-60"
                            >
                              Запази
                            </button>
                          </div>
                        </>
                      ) : (
                        <>
                          <p>{event.content}</p>
                          <EntryMeta entry={event} />
                          <div className="mt-2 flex justify-end">
                            <EntryActions
                              disabled={isHistoryBusy}
                              onEdit={() => setEditingHistory({ id: event.id, value: event.content })}
                              onDelete={() => deleteHistoryMutation.mutate(event.id)}
                            />
                          </div>
                        </>
                      )}
                    </div>
                  ))
                )}
              </div>
            </article>
          </div>

          <article className="rounded-[1.4rem] border border-white/55 bg-white/72 p-4 shadow-[0_16px_34px_rgba(37,99,235,0.12)] backdrop-blur-xl">
            <div className="flex items-center gap-2 text-blue-700">
              <ScanSearch className="h-4 w-4" />
              <p className="text-xs uppercase tracking-[0.18em]">AI управление</p>
            </div>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              Използвай AI чата за управление: „Покажи всички полета“, „Избери парцел 234183485“, „Покажи пшеничните полета“, „Отвори дневници“, „Покажи граници“ или „История на блока".
            </p>
          </article>
        </section>
      </div>
    </div>
  )
}