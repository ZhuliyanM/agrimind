import { AuthStatusCard } from '@/features/auth/ui/auth-status-card.tsx'
import { useAuth } from '@/features/auth/model/use-auth.ts'
import { OperationsReadinessPanel } from '@/modules/field-intelligence/index.ts'
import { SentinelMapCard } from '@/modules/field-intelligence/index.ts'
import { WorkspaceOverviewPanel } from '@/modules/workspace-overview/index.ts'
import { useShellStore } from '@/shared/lib/shell-store.ts'

const northStarStats = [
  { label: 'Reference region', value: 'Shumen' },
  { label: 'Primary imagery', value: 'Sentinel-2' },
  { label: 'Expansion model', value: 'Module-based' },
]

export function DashboardPage() {
  const searchQuery = useShellStore((state) => state.searchQuery)
  const { session } = useAuth()

  return (
    <div className="space-y-8">
      <SentinelMapCard />

      <section className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <article className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 shadow-lg shadow-black/10">
          <p className="text-sm uppercase tracking-[0.3em] text-emerald-200/75">Prototype workspace</p>
          <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-[-0.05em] text-white xl:text-5xl">
            AgriMind now looks and behaves like a serious agricultural SaaS product, not a starter template.
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-8 text-stone-300">
            This sample dashboard is shaped around a large Sentinel field view for Shumen, a modular
            control surface, and a UI system built to absorb agronomy, irrigation, machinery, finance,
            and compliance modules over time.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {northStarStats.map((item) => (
              <div key={item.label} className="rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-4">
                <p className="text-xs uppercase tracking-[0.28em] text-stone-500">{item.label}</p>
                <p className="mt-2 text-lg font-semibold text-white">{item.value}</p>
              </div>
            ))}
          </div>
        </article>

        <AuthStatusCard email={session?.user.email} />
      </section>

      <section className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <OperationsReadinessPanel />
        <WorkspaceOverviewPanel searchQuery={searchQuery} />
      </section>
    </div>
  )
}