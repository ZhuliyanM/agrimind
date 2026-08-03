# AgriMind

AgriMind is a Vite + React frontend with a lightweight Python backend layer for agronomy-oriented overview data.

## Frontend

- `npm run dev`
- `npm run typecheck`
- `npm run build`

## Python Backend

1. `npm run api:install`
2. `npm run api:dev`

The Python API runs on `http://127.0.0.1:8000` by default and exposes:

- `GET /health`
- `GET /api/overview`
- `POST /api/chat`

## Environment

Copy `.env.example` into your local env file and configure:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `VITE_API_BASE_URL`
