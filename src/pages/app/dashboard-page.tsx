import { AuthStatusCard } from '@/features/auth/ui/auth-status-card.tsx'
import { useAuth } from '@/features/auth/model/use-auth.ts'
import { WorkspaceOverviewPanel } from '@/modules/workspace-overview/index.ts'
import { useShellStore } from '@/shared/lib/shell-store.ts'

export function DashboardPage() {
  const searchQuery = useShellStore((state) => state.searchQuery)
  const { session } = useAuth()

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

        <AuthStatusCard email={session?.user.email} />
      </section>

      <WorkspaceOverviewPanel searchQuery={searchQuery} />
    </div>
  )
}