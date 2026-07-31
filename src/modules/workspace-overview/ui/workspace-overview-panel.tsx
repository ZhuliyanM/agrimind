import { getWorkspaceCapabilities } from '@/modules/workspace-overview/model/workspace-overview.ts'

type WorkspaceOverviewPanelProps = {
  searchQuery: string
}

export function WorkspaceOverviewPanel({ searchQuery }: WorkspaceOverviewPanelProps) {
  const capabilities = getWorkspaceCapabilities(searchQuery)

  return (
    <section className="space-y-5">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-stone-500">Module runway</p>
          <h2 className="mt-2 text-2xl font-semibold text-white">Product lanes ready for expansion</h2>
        </div>
        <p className="text-sm text-stone-400">Filtered with shell state from Zustand.</p>
      </div>

      <div className="grid gap-4 xl:grid-cols-3">
        {capabilities.map(({ title, copy, icon: Icon, area, stage }) => (
          <article key={title} className="rounded-[1.5rem] border border-white/10 bg-stone-900/80 p-6">
            <div className="flex items-start justify-between gap-4">
              <div className="mb-4 inline-flex rounded-2xl bg-white/5 p-3 text-emerald-200">
                <Icon className="h-5 w-5" />
              </div>
              <div className="flex flex-col items-end gap-2">
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] uppercase tracking-[0.24em] text-stone-300">
                  {stage}
                </span>
                <span className="text-[11px] uppercase tracking-[0.24em] text-stone-500">{area}</span>
              </div>
            </div>
            <div>
            <h3 className="text-xl font-semibold text-white">{title}</h3>
              <p className="mt-3 text-sm leading-7 text-stone-400">{copy}</p>
            </div>
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