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
    return 'border-rose-200 bg-rose-50 text-rose-700'
  }

  if (severity === 'medium') {
    return 'border-amber-200 bg-amber-50 text-amber-700'
  }

  return 'border-sky-200 bg-sky-50 text-sky-700'
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
    <section className="pointer-events-auto flex h-full max-h-[clamp(236px,36svh,520px)] min-h-[228px] flex-col overflow-hidden rounded-[1.2rem] border border-white/55 bg-white/56 p-2.5 shadow-[0_14px_32px_rgba(59,130,246,0.12)] backdrop-blur-xl sm:p-3 xl:max-h-[min(66svh,620px)] xl:min-h-[min(300px,40svh)] [@media(max-height:800px)]:max-h-[min(58svh,500px)] [@media(max-height:800px)]:min-h-[220px] [@media(max-height:800px)]:p-2 [@media(max-height:700px)]:max-h-[min(52svh,420px)] [@media(max-height:700px)]:min-h-[200px] [@media(max-height:700px)]:rounded-[1rem] [@media(max-height:700px)]:p-1.5">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-[11px] uppercase tracking-[0.22em] text-blue-700">Оперативен център</p>
          <h3 className="mt-1 text-sm font-semibold text-slate-900">Диспечер и инциденти</h3>
        </div>
        <div className="rounded-full border border-white/55 bg-blue-50/44 px-2.5 py-1 text-[11px] text-blue-700">
          {openCount} активни
        </div>
      </div>

      <div className="mt-2 grid gap-1 sm:grid-cols-3 [@media(max-height:800px)]:hidden">
        <button className="inline-flex items-center justify-center gap-1.5 rounded-[0.95rem] border border-white/55 bg-blue-50/34 px-2 py-1.5 text-[10px] uppercase tracking-[0.12em] text-blue-700 transition duration-300 hover:border-blue-200 hover:bg-white/60">
          <Plus className="h-3.5 w-3.5" /> Нова мисия
        </button>
        <button className="inline-flex items-center justify-center gap-1.5 rounded-[0.95rem] border border-white/55 bg-blue-50/34 px-2 py-1.5 text-[10px] uppercase tracking-[0.12em] text-blue-700 transition duration-300 hover:border-blue-200 hover:bg-white/60">
          <Droplets className="h-3.5 w-3.5" /> Проверка на поливане
        </button>
        <button className="inline-flex items-center justify-center gap-1.5 rounded-[0.95rem] border border-white/55 bg-blue-50/34 px-2 py-1.5 text-[10px] uppercase tracking-[0.12em] text-blue-700 transition duration-300 hover:border-blue-200 hover:bg-white/60">
          <Tractor className="h-3.5 w-3.5" /> План за техника
        </button>
      </div>

      <div className="mt-2 grid min-h-0 flex-1 gap-1.5 xl:grid-cols-1 [@media(max-height:800px)]:mt-1.5 [@media(max-height:700px)]:mt-1">
        <article className="flex min-h-0 flex-col rounded-[1rem] border border-white/55 bg-blue-50/28 p-2 [@media(max-height:800px)]:p-1.5">
          <div className="mb-3 flex items-center gap-2 text-slate-600">
            <AlertTriangle className="h-4 w-4 text-amber-500" />
            <p className="text-xs uppercase tracking-[0.2em]">Опашка инциденти</p>
          </div>
          <div className="grid max-h-[min(17svh,200px)] gap-1 overflow-auto pr-1 sm:max-h-[min(19svh,220px)] xl:max-h-[min(26svh,240px)] [@media(max-height:800px)]:max-h-[min(16svh,170px)] [@media(max-height:700px)]:max-h-[min(14svh,128px)]">
            {incidents.map((incident) => (
              <div key={incident.id} className="rounded-[0.9rem] border border-white/55 bg-white/46 px-2.5 py-2">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold text-slate-900 sm:text-sm">{incident.title}</p>
                    <p className="mt-1 text-xs text-slate-500">{incident.parcel}</p>
                  </div>
                  <span className={["rounded-full border px-2 py-1 text-[10px] uppercase tracking-[0.2em]", severityStyle(incident.severity)].join(' ')}>
                    {severityLabel[incident.severity]}
                  </span>
                </div>
                <div className="mt-3 flex items-center justify-between gap-2">
                  <span className="text-xs text-slate-500">Статус: {statusLabel[incident.status]}</span>
                  <button
                    type="button"
                    onClick={() => markResolved(incident.id)}
                    disabled={incident.status === 'resolved'}
                    className="inline-flex items-center gap-1 rounded-[0.8rem] border border-white/60 bg-blue-50/42 px-2 py-1 text-xs text-blue-700 transition duration-300 hover:bg-white/62 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <CheckCircle2 className="h-3.5 w-3.5" /> Затвори
                  </button>
                </div>
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-[1rem] border border-white/55 bg-blue-50/28 p-2 [@media(max-height:800px)]:p-1.5">
          <div className="mb-3 flex items-center gap-2 text-slate-600">
            <ListChecks className="h-4 w-4 text-blue-600" />
            <p className="text-xs uppercase tracking-[0.2em]">Хронология на изпълнение</p>
          </div>
          <div className="grid max-h-[min(17svh,200px)] gap-1 overflow-auto pr-1 sm:max-h-[min(19svh,220px)] xl:max-h-[min(24svh,220px)] [@media(max-height:800px)]:max-h-[min(15svh,160px)] [@media(max-height:700px)]:max-h-[min(13svh,116px)]">
            {timelineEvents.map((event) => (
              <div key={event.at + event.event} className="rounded-[0.9rem] border border-white/55 bg-white/46 px-2.5 py-2">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-xs text-slate-500">{event.at}</p>
                  <Clock3 className={[
                    'h-3.5 w-3.5',
                    event.tone === 'ok' ? 'text-blue-600' : 'text-amber-500',
                  ].join(' ')} />
                </div>
                <p className="mt-1 text-xs text-slate-700 sm:text-sm">{event.event}</p>
              </div>
            ))}
          </div>
        </article>
      </div>
    </section>
  )
}
