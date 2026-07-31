import { Database, Radar, ShieldEllipsis } from 'lucide-react'

const architectureCards = [
  {
    title: 'Modules',
    copy: 'Business capabilities live in isolated module folders with their own UI, model, API, and routes.',
    icon: Radar,
  },
  {
    title: 'State',
    copy: 'TanStack Query handles server state while lightweight Zustand stores own client-side shell state.',
    icon: ShieldEllipsis,
  },
  {
    title: 'Integrations',
    copy: 'Supabase clients and repositories sit behind one gateway layer for auth, data, storage, and realtime.',
    icon: Database,
  },
]

export function DashboardPage() {
  return (
    <div className="space-y-8">
      <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <article className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 shadow-lg shadow-black/10">
          <p className="text-sm uppercase tracking-[0.3em] text-emerald-200/75">Application shell</p>
          <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-[-0.05em] text-white">
            AgriMind is now mounted on a scalable app shell instead of a starter page.
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-8 text-stone-300">
            This screen is intentionally static. It exists to prove the router, providers, layout boundary,
            and integration scaffolds are wired without introducing product functionality yet.
          </p>
        </article>

        <article className="rounded-[2rem] border border-emerald-300/15 bg-emerald-300/8 p-8">
          <p className="text-sm uppercase tracking-[0.3em] text-emerald-200/70">Supabase boundary</p>
          <div className="mt-6 space-y-3 text-sm leading-7 text-stone-300">
            <p>Browser-safe credentials are expected through Vite environment variables.</p>
            <p>Raw SDK usage is restricted to the integrations layer.</p>
            <p>Future repositories can expose typed query functions to modules and features.</p>
          </div>
        </article>
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        {architectureCards.map(({ title, copy, icon: Icon }) => (
          <article key={title} className="rounded-[1.5rem] border border-white/10 bg-stone-900/80 p-6">
            <div className="mb-4 inline-flex rounded-2xl bg-white/5 p-3 text-emerald-200">
              <Icon className="h-5 w-5" />
            </div>
            <h2 className="text-xl font-semibold text-white">{title}</h2>
            <p className="mt-3 text-sm leading-7 text-stone-400">{copy}</p>
          </article>
        ))}
      </section>
    </div>
  )
}