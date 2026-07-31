import { AlertTriangle, CheckCircle2, Clock3, Droplets, ListChecks, Plus, Tractor } from 'lucide-react'
import { useMemo, useState } from 'react'

type Incident = {
  id: string
  title: string
  parcel: string
  severity: 'high' | 'medium' | 'low'
  status: 'open' | 'assigned' | 'resolved'
}

const seedIncidents: Incident[] = [
  {
    id: 'inc-001',
    title: 'Спад на NDVI в южен коридор',
    parcel: 'Парцел 315658111',
    severity: 'high',
    status: 'open',
  },
  {
    id: 'inc-002',
    title: 'Аномалия в налягането на поливната система',
    parcel: 'Парцел 313304851',
    severity: 'medium',
    status: 'assigned',
  },
  {
    id: 'inc-003',
    title: 'Забавена синхронизация на оглед',
    parcel: 'Парцел 234183486',
    severity: 'low',
    status: 'open',
  },
]

const timelineEvents = [
  { at: '06:20', event: 'Синхронизация на Sentinel приключи', tone: 'ok' },
  { at: '07:15', event: 'NDVI слоят е преизчислен', tone: 'ok' },
  { at: '08:05', event: 'Създадена задача за теренен оглед', tone: 'warn' },
  { at: '08:25', event: 'Изпращането чака одобрение', tone: 'warn' },
]

function severityStyle(severity: Incident['severity']) {
  if (severity === 'high') {
    return 'border-rose-300/40 bg-rose-300/15 text-rose-100'
  }

  if (severity === 'medium') {
    return 'border-amber-300/40 bg-amber-300/15 text-amber-100'
  }

  return 'border-sky-300/40 bg-sky-300/15 text-sky-100'
}

export function OperationsHubPanel() {
  const [incidents, setIncidents] = useState(seedIncidents)

  const openCount = useMemo(() => incidents.filter((i) => i.status !== 'resolved').length, [incidents])

  const markResolved = (id: string) => {
    setIncidents((current) =>
      current.map((incident) =>
        incident.id === id ? { ...incident, status: 'resolved' } : incident,
      ),
    )
  }

  const statusLabel = {
    open: 'Отворен',
    assigned: 'Назначен',
    resolved: 'Затворен',
  }

  const severityLabel = {
    high: 'Висок',
    medium: 'Среден',
    low: 'Нисък',
  }

  return (
    <section className="pointer-events-auto flex h-full max-h-[44svh] min-h-[280px] flex-col overflow-hidden rounded-[1rem] border border-white/20 bg-stone-950/84 p-3 backdrop-blur-2xl sm:rounded-[1.2rem] sm:p-3.5 xl:max-h-none xl:min-h-0">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-[11px] uppercase tracking-[0.22em] text-emerald-200/75">Оперативен център</p>
          <h3 className="mt-1 text-sm font-semibold text-white sm:text-base">Диспечер и инциденти</h3>
        </div>
        <div className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-stone-200">
          {openCount} активни
        </div>
      </div>

      <div className="mt-2.5 grid gap-1.5 sm:grid-cols-3">
        <button className="inline-flex items-center justify-center gap-1.5 rounded-md border border-white/10 bg-white/[0.04] px-2.5 py-2 text-[11px] uppercase tracking-[0.12em] text-stone-200 transition hover:border-white/30 hover:text-white">
          <Plus className="h-3.5 w-3.5" /> Нова мисия
        </button>
        <button className="inline-flex items-center justify-center gap-1.5 rounded-md border border-white/10 bg-white/[0.04] px-2.5 py-2 text-[11px] uppercase tracking-[0.12em] text-stone-200 transition hover:border-white/30 hover:text-white">
          <Droplets className="h-3.5 w-3.5" /> Проверка на поливане
        </button>
        <button className="inline-flex items-center justify-center gap-1.5 rounded-md border border-white/10 bg-white/[0.04] px-2.5 py-2 text-[11px] uppercase tracking-[0.12em] text-stone-200 transition hover:border-white/30 hover:text-white">
          <Tractor className="h-3.5 w-3.5" /> План за техника
        </button>
      </div>

      <div className="mt-2.5 grid min-h-0 flex-1 gap-2.5 xl:grid-cols-1">
        <article className="flex min-h-0 flex-col rounded-md border border-white/10 bg-white/[0.03] p-3">
          <div className="mb-3 flex items-center gap-2 text-stone-300">
            <AlertTriangle className="h-4 w-4 text-amber-200" />
            <p className="text-xs uppercase tracking-[0.2em]">Опашка инциденти</p>
          </div>
          <div className="grid max-h-[22svh] gap-1.5 overflow-auto pr-1 sm:max-h-[24svh] xl:max-h-[28svh]">
            {incidents.map((incident) => (
              <div key={incident.id} className="rounded-md border border-white/10 bg-stone-950/70 px-2.5 py-2.5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold text-white sm:text-sm">{incident.title}</p>
                    <p className="mt-1 text-xs text-stone-400">{incident.parcel}</p>
                  </div>
                  <span className={["rounded-full border px-2 py-1 text-[10px] uppercase tracking-[0.2em]", severityStyle(incident.severity)].join(' ')}>
                    {severityLabel[incident.severity]}
                  </span>
                </div>
                <div className="mt-3 flex items-center justify-between gap-2">
                  <span className="text-xs text-stone-400">Статус: {statusLabel[incident.status]}</span>
                  <button
                    type="button"
                    onClick={() => markResolved(incident.id)}
                    disabled={incident.status === 'resolved'}
                    className="inline-flex items-center gap-1 rounded-md border border-emerald-300/35 bg-emerald-300/15 px-2 py-1 text-xs text-emerald-100 transition disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <CheckCircle2 className="h-3.5 w-3.5" /> Затвори
                  </button>
                </div>
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-md border border-white/10 bg-white/[0.03] p-3">
          <div className="mb-3 flex items-center gap-2 text-stone-300">
            <ListChecks className="h-4 w-4 text-emerald-200" />
            <p className="text-xs uppercase tracking-[0.2em]">Хронология на изпълнение</p>
          </div>
          <div className="grid max-h-[22svh] gap-1.5 overflow-auto pr-1 sm:max-h-[24svh] xl:max-h-[26svh]">
            {timelineEvents.map((event) => (
              <div key={event.at + event.event} className="rounded-md border border-white/10 bg-stone-950/70 px-2.5 py-2">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-xs text-stone-500">{event.at}</p>
                  <Clock3 className={[
                    'h-3.5 w-3.5',
                    event.tone === 'ok' ? 'text-emerald-200' : 'text-amber-200',
                  ].join(' ')} />
                </div>
                <p className="mt-1 text-xs text-stone-200 sm:text-sm">{event.event}</p>
              </div>
            ))}
          </div>
        </article>
      </div>
    </section>
  )
}
