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

const platformSignals = [
  'Sentinel-centered field monitoring',
  'Module contracts for long-term growth',
  'SaaS shell built for agronomy, water, and operations',
]

export function LandingPage() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.14),_transparent_32%),linear-gradient(180deg,_#f8fbff_0%,_#eef5ff_55%,_#eaf2ff_100%)] text-slate-900">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col px-6 py-10 lg:px-10">
        <header className="flex items-center justify-between rounded-full border border-blue-100 bg-white/90 px-5 py-3 shadow-[0_10px_24px_rgba(59,130,246,0.08)] backdrop-blur">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-blue-700">AgriMind</p>
            <p className="text-xs text-slate-500">Scalable SaaS foundation</p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/auth"
              className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-blue-50"
            >
              Open auth
            </Link>
            <Link
              to="/app"
              className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-500"
            >
              Open shell
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </header>

        <section className="grid flex-1 items-center gap-12 py-16 lg:grid-cols-[1.2fr_0.8fr] lg:py-24">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs uppercase tracking-[0.3em] text-blue-700">
              New-generation agricultural SaaS
            </div>
            <div className="space-y-5">
              <h1 className="max-w-4xl text-5xl font-semibold tracking-[-0.06em] text-slate-900 sm:text-6xl lg:text-7xl">
                Sentinel-first software for farms, cooperatives, and agri operations teams.
              </h1>
              <p className="max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
                AgriMind is now shaped as a professional SaaS foundation with a modular app shell, field
                intelligence workspace, and a design language ready for years of new products.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {platformSignals.map((signal) => (
                <div key={signal} className="rounded-2xl border border-blue-100 bg-white px-4 py-4 text-sm text-slate-700">
                  {signal}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-blue-100 bg-white/90 p-5 shadow-[0_18px_40px_rgba(59,130,246,0.12)] backdrop-blur">
            <div className="rounded-[1.5rem] border border-blue-100 bg-white p-5">
              <div className="mb-4 rounded-2xl border border-blue-200 bg-blue-50 px-4 py-4">
                <p className="text-xs uppercase tracking-[0.3em] text-blue-700">Live design direction</p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  The `/app` workspace now demonstrates a full-size Sentinel map focused on Shumen and a SaaS
                  dashboard structure that can host future agronomy modules.
                </p>
              </div>
              <div className="grid gap-4">
                {pillars.map(({ title, description, icon: Icon }) => (
                  <article key={title} className="rounded-2xl border border-blue-100 bg-blue-50/35 p-5">
                    <div className="mb-4 inline-flex rounded-2xl bg-blue-100 p-3 text-blue-700">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h2 className="mb-2 text-xl font-semibold text-slate-900">{title}</h2>
                    <p className="text-sm leading-7 text-slate-600">{description}</p>
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