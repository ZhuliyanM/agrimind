import { getWorkspaceCapabilities } from '@/modules/workspace-overview/model/workspace-overview.ts'

type WorkspaceOverviewPanelProps = {
  searchQuery: string
}

export function WorkspaceOverviewPanel({ searchQuery }: WorkspaceOverviewPanelProps) {
  const capabilities = getWorkspaceCapabilities(searchQuery)

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-stone-500">First module slice</p>
          <h2 className="mt-2 text-2xl font-semibold text-white">Workspace overview</h2>
        </div>
        <p className="text-sm text-stone-400">Filtered with shell state from Zustand.</p>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {capabilities.map(({ title, copy, icon: Icon }) => (
          <article key={title} className="rounded-[1.5rem] border border-white/10 bg-stone-900/80 p-6">
            <div className="mb-4 inline-flex rounded-2xl bg-white/5 p-3 text-emerald-200">
              <Icon className="h-5 w-5" />
            </div>
            <h3 className="text-xl font-semibold text-white">{title}</h3>
            <p className="mt-3 text-sm leading-7 text-stone-400">{copy}</p>
          </article>
        ))}
      </div>

      {capabilities.length === 0 ? (
        <div className="rounded-[1.5rem] border border-dashed border-white/10 bg-white/[0.03] px-5 py-6 text-sm text-stone-400">
          No module cards match the current shell search query.
        </div>
      ) : null}
    </section>
  )
}