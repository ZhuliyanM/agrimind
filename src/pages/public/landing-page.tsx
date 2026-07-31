import { ArrowRight, Leaf, ShieldCheck, Waypoints } from 'lucide-react'
import { Link } from 'react-router-dom'

const pillars = [
  {
    title: 'Modular by design',
    description: 'Every domain grows as its own module with isolated UI, state, and data boundaries.',
    icon: Waypoints,
  },
  {
    title: 'Operational clarity',
    description: 'Shared primitives, layouts, and processes reduce entropy as the product expands.',
    icon: ShieldCheck,
  },
  {
    title: 'Supabase-ready core',
    description: 'A single integration layer keeps auth, storage, realtime, and data access consistent.',
    icon: Leaf,
  },
]

export function LandingPage() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(185,255,177,0.22),_transparent_28%),linear-gradient(180deg,_#0f172a_0%,_#111827_42%,_#020617_100%)] text-stone-50">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col px-6 py-10 lg:px-10">
        <header className="flex items-center justify-between rounded-full border border-white/10 bg-white/5 px-5 py-3 backdrop-blur">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-emerald-200/80">AgriMind</p>
            <p className="text-xs text-stone-400">Scalable SaaS foundation</p>
          </div>
          <Link
            to="/app"
            className="inline-flex items-center gap-2 rounded-full bg-emerald-300 px-4 py-2 text-sm font-medium text-stone-950 transition hover:bg-emerald-200"
          >
            Open shell
            <ArrowRight className="h-4 w-4" />
          </Link>
        </header>

        <section className="grid flex-1 items-center gap-12 py-16 lg:grid-cols-[1.2fr_0.8fr] lg:py-24">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-1 text-xs uppercase tracking-[0.3em] text-emerald-200">
              Future-proof architecture
            </div>
            <div className="space-y-5">
              <h1 className="max-w-4xl text-5xl font-semibold tracking-[-0.06em] text-white sm:text-6xl lg:text-7xl">
                A modern agricultural SaaS that can absorb new modules for years.
              </h1>
              <p className="max-w-2xl text-base leading-8 text-stone-300 sm:text-lg">
                The app is now organized around route shells, integration boundaries, reusable primitives,
                and isolated module contracts instead of a flat starter template.
              </p>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-5 shadow-2xl shadow-emerald-950/20 backdrop-blur">
            <div className="rounded-[1.5rem] border border-white/10 bg-stone-950/80 p-5">
              <div className="grid gap-4">
                {pillars.map(({ title, description, icon: Icon }) => (
                  <article key={title} className="rounded-2xl border border-white/8 bg-white/[0.03] p-5">
                    <div className="mb-4 inline-flex rounded-2xl bg-emerald-300/12 p-3 text-emerald-200">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h2 className="mb-2 text-xl font-semibold text-white">{title}</h2>
                    <p className="text-sm leading-7 text-stone-400">{description}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}