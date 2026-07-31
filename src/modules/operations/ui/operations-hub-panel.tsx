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
    title: 'NDVI drop in south corridor',
    parcel: 'Parcel 315658111',
    severity: 'high',
    status: 'open',
  },
  {
    id: 'inc-002',
    title: 'Irrigation pressure anomaly',
    parcel: 'Parcel 313304851',
    severity: 'medium',
    status: 'assigned',
  },
  {
    id: 'inc-003',
    title: 'Late scouting report sync',
    parcel: 'Parcel 234183486',
    severity: 'low',
    status: 'open',
  },
]

const timelineEvents = [
  { at: '06:20', event: 'Sentinel sync completed', tone: 'ok' },
  { at: '07:15', event: 'NDVI layer recalculated', tone: 'ok' },
  { at: '08:05', event: 'Scouting mission drafted', tone: 'warn' },
  { at: '08:25', event: 'Dispatch waiting approval', tone: 'warn' },
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

  return (
    <section className="pointer-events-auto rounded-[1.5rem] border border-white/20 bg-stone-950/84 p-4 backdrop-blur-2xl sm:p-5">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-[11px] uppercase tracking-[0.26em] text-emerald-200/75">Operations hub</p>
          <h3 className="mt-1 text-lg font-semibold text-white">Dispatch and incident center</h3>
        </div>
        <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-stone-200">
          {openCount} active
        </div>
      </div>

      <div className="mt-4 grid gap-2 sm:grid-cols-3">
        <button className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2.5 text-xs uppercase tracking-[0.2em] text-stone-200 transition hover:border-white/30 hover:text-white">
          <Plus className="h-3.5 w-3.5" /> New mission
        </button>
        <button className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2.5 text-xs uppercase tracking-[0.2em] text-stone-200 transition hover:border-white/30 hover:text-white">
          <Droplets className="h-3.5 w-3.5" /> Irrigation check
        </button>
        <button className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2.5 text-xs uppercase tracking-[0.2em] text-stone-200 transition hover:border-white/30 hover:text-white">
          <Tractor className="h-3.5 w-3.5" /> Machinery plan
        </button>
      </div>

      <div className="mt-4 grid gap-4 xl:grid-cols-[1fr_0.9fr]">
        <article className="rounded-xl border border-white/10 bg-white/[0.03] p-3.5">
          <div className="mb-3 flex items-center gap-2 text-stone-300">
            <AlertTriangle className="h-4 w-4 text-amber-200" />
            <p className="text-xs uppercase tracking-[0.24em]">Incident queue</p>
          </div>
          <div className="grid gap-2">
            {incidents.map((incident) => (
              <div key={incident.id} className="rounded-lg border border-white/10 bg-stone-950/70 px-3 py-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-white">{incident.title}</p>
                    <p className="mt-1 text-xs text-stone-400">{incident.parcel}</p>
                  </div>
                  <span className={["rounded-full border px-2 py-1 text-[10px] uppercase tracking-[0.2em]", severityStyle(incident.severity)].join(' ')}>
                    {incident.severity}
                  </span>
                </div>
                <div className="mt-3 flex items-center justify-between gap-2">
                  <span className="text-xs text-stone-400">Status: {incident.status}</span>
                  <button
                    type="button"
                    onClick={() => markResolved(incident.id)}
                    disabled={incident.status === 'resolved'}
                    className="inline-flex items-center gap-1 rounded-md border border-emerald-300/35 bg-emerald-300/15 px-2 py-1 text-xs text-emerald-100 transition disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <CheckCircle2 className="h-3.5 w-3.5" /> Resolve
                  </button>
                </div>
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-xl border border-white/10 bg-white/[0.03] p-3.5">
          <div className="mb-3 flex items-center gap-2 text-stone-300">
            <ListChecks className="h-4 w-4 text-emerald-200" />
            <p className="text-xs uppercase tracking-[0.24em]">Execution timeline</p>
          </div>
          <div className="grid gap-2">
            {timelineEvents.map((event) => (
              <div key={event.at + event.event} className="rounded-lg border border-white/10 bg-stone-950/70 px-3 py-2.5">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-xs text-stone-500">{event.at}</p>
                  <Clock3 className={[
                    'h-3.5 w-3.5',
                    event.tone === 'ok' ? 'text-emerald-200' : 'text-amber-200',
                  ].join(' ')} />
                </div>
                <p className="mt-1 text-sm text-stone-200">{event.event}</p>
              </div>
            ))}
          </div>
        </article>
      </div>
    </section>
  )
}
