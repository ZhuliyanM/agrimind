import { Bell, CloudSun, Search } from 'lucide-react'
import { useAuth } from '@/features/auth/model/use-auth.ts'
import { useShellStore } from '@/shared/lib/shell-store.ts'

export function Topbar() {
  const searchQuery = useShellStore((state) => state.searchQuery)
  const setSearchQuery = useShellStore((state) => state.setSearchQuery)
  const { session, status } = useAuth()
  const statusLabel = {
    authenticated: session?.user.email ?? 'Authenticated',
    anonymous: 'Anonymous',
    'env-missing': 'Supabase not configured',
    loading: 'Checking session',
  }[status]

  return (
    <header className="border-b border-white/10 bg-stone-950/60 px-6 py-5 backdrop-blur lg:px-10">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-stone-500">Workspace</p>
          <p className="mt-2 text-2xl font-semibold text-white">SaaS architecture control plane</p>
          <p className="mt-1 text-sm text-stone-400">{statusLabel}</p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <label className="flex min-w-[260px] items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-3 text-sm text-stone-300">
            <Search className="h-4 w-4 text-stone-500" />
            <input
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search future modules"
              className="w-full bg-transparent outline-none placeholder:text-stone-500"
            />
          </label>
          <div className="flex items-center gap-3">
            <button className="rounded-full border border-white/10 bg-white/5 p-3 text-stone-300 transition hover:bg-white/10 hover:text-white">
              <CloudSun className="h-4 w-4" />
            </button>
            <button className="rounded-full border border-white/10 bg-white/5 p-3 text-stone-300 transition hover:bg-white/10 hover:text-white">
              <Bell className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}