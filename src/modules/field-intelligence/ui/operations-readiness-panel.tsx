import { AlertTriangle, ArrowUpRight, Bot, CalendarRange, Droplets, ShieldCheck } from 'lucide-react'
import { morningBrief, operationalAlerts, readinessModules } from '@/modules/field-intelligence/model/shumen-region.ts'

const postureCards = [
  {
    title: 'Operational readiness',
    value: 'Architecture prepared',
    icon: ShieldCheck,
  },
  {
    title: 'Automation direction',
    value: 'Agent-ready workflows',
    icon: Bot,
  },
  {
    title: 'Water intelligence',
    value: 'Prepared for modules',
    icon: Droplets,
  },
]

export function OperationsReadinessPanel() {
  return (
    <section className="grid gap-6">
      <article className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6">
        <p className="text-sm uppercase tracking-[0.3em] text-stone-500">Operational posture</p>
        <h2 className="mt-3 text-2xl font-semibold text-white">Designed as an operating system, not a one-off dashboard.</h2>
        <div className="mt-6 grid gap-3">
          {postureCards.map(({ title, value, icon: Icon }) => (
            <div key={title} className="flex items-center gap-4 rounded-2xl border border-white/10 bg-stone-950/70 px-4 py-4">
              <div className="rounded-2xl bg-emerald-300/12 p-3 text-emerald-200">
                <Icon className="h-4 w-4" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-stone-500">{title}</p>
                <p className="mt-1 text-sm font-medium text-white">{value}</p>
              </div>
            </div>
          ))}
        </div>
      </article>

      <article className="rounded-[2rem] border border-white/10 bg-stone-900/80 p-6">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-stone-500">Morning brief</p>
            <h3 className="mt-2 text-xl font-semibold text-white">What the operator should see first</h3>
          </div>
          <CalendarRange className="h-5 w-5 text-emerald-200" />
        </div>
        <div className="mt-5 grid gap-3">
          {morningBrief.map((item) => (
            <div key={item.label} className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-4">
              <p className="text-[11px] uppercase tracking-[0.24em] text-stone-500">{item.label}</p>
              <p className="mt-2 text-sm font-medium text-white">{item.value}</p>
            </div>
          ))}
        </div>
      </article>

      <article className="rounded-[2rem] border border-white/10 bg-stone-900/80 p-6">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-stone-500">Operational alerts</p>
            <h3 className="mt-2 text-xl font-semibold text-white">Example live queue</h3>
          </div>
          <AlertTriangle className="h-5 w-5 text-amber-200" />
        </div>
        <div className="mt-5 grid gap-4">
          {operationalAlerts.map((alert) => (
            <div key={alert.title} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              <p className="text-sm font-semibold text-white">{alert.title}</p>
              <p className="mt-2 text-sm leading-6 text-stone-400">{alert.description}</p>
            </div>
          ))}
        </div>
      </article>

      <article className="rounded-[2rem] border border-white/10 bg-stone-900/80 p-6">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-stone-500">Module lanes</p>
            <h3 className="mt-2 text-xl font-semibold text-white">Example product runway</h3>
          </div>
          <ArrowUpRight className="h-5 w-5 text-emerald-200" />
        </div>
        <div className="mt-5 grid gap-4">
          {readinessModules.map((module) => (
            <div key={module.title} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              <p className="text-sm font-semibold text-white">{module.title}</p>
              <p className="mt-2 text-sm leading-6 text-stone-400">{module.copy}</p>
            </div>
          ))}
        </div>
      </article>
    </section>
  )
}