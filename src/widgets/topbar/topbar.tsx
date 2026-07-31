import { Bell, CloudSun, Search } from 'lucide-react'
import { useAuth } from '@/features/auth/model/use-auth.ts'
import { useShellStore } from '@/shared/lib/shell-store.ts'

const commandModes = ['Map', 'Fields', 'Ops', 'Finance']

export function Topbar() {
  const searchQuery = useShellStore((state) => state.searchQuery)
  const setSearchQuery = useShellStore((state) => state.setSearchQuery)
  const { session, status } = useAuth()
  const statusLabel = {
    authenticated: session?.user.email ?? 'Authenticated',
    anonymous: 'Anonymous',
    'env-missing': 'Demo mode active',
    loading: 'Checking session',
  }[status]
  const liveDate = new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date())

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-[950] px-3 pt-3 sm:px-5 sm:pt-5">
      <div className="ml-auto w-full max-w-[980px]">
        <div className="group pointer-events-auto rounded-[1.75rem] border border-white/20 bg-stone-950/82 px-4 py-3 backdrop-blur-2xl transition-all duration-300 hover:bg-stone-950/90 focus-within:bg-stone-950/90 sm:px-5">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-emerald-200/75">AgriMind Hover Command</p>
              <p className="mt-1 text-lg font-semibold text-white sm:text-xl">Fullscreen field intelligence OS</p>
              <p className="mt-1 text-xs text-stone-400 sm:text-sm">{statusLabel} · {liveDate}</p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <label className="flex min-w-[220px] items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-stone-300">
                <Search className="h-4 w-4 text-stone-500" />
                <input
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder="Search modules, fields, alerts"
                  className="w-full bg-transparent outline-none placeholder:text-stone-500"
                />
              </label>
              <div className="flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.03] p-1">
                {commandModes.map((mode, index) => (
                  <button
                    key={mode}
                    className={[
                      'rounded-full px-2.5 py-1.5 text-[10px] uppercase tracking-[0.2em] transition',
                      index === 0
                        ? 'bg-emerald-300 text-stone-950'
                        : 'text-stone-300 hover:bg-white/10 hover:text-white',
                    ].join(' ')}
                  >
                    {mode}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <button className="rounded-full border border-white/10 bg-white/5 p-2.5 text-stone-300 transition hover:bg-white/10 hover:text-white">
                  <CloudSun className="h-4 w-4" />
                </button>
                <button className="rounded-full border border-white/10 bg-white/5 p-2.5 text-stone-300 transition hover:bg-white/10 hover:text-white">
                  <Bell className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}