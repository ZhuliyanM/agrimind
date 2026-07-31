import { Bell, CloudSun, Search } from 'lucide-react'
import { useAuth } from '@/features/auth/model/use-auth.ts'
import { useShellStore } from '@/shared/lib/shell-store.ts'

const commandModes = ['Карта', 'Полета', 'Операции', 'Финанси']

export function Topbar() {
  const searchQuery = useShellStore((state) => state.searchQuery)
  const setSearchQuery = useShellStore((state) => state.setSearchQuery)
  const { session, status } = useAuth()
  const statusLabel = {
    authenticated: session?.user.email ?? 'Вписан потребител',
    anonymous: 'Гост режим',
    'env-missing': 'Демо режим (без среда)',
    loading: 'Проверка на сесията',
  }[status]
  const liveDate = new Intl.DateTimeFormat('bg-BG', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date())

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-[950] px-2 pt-2 sm:px-4 sm:pt-3">
      <div className="ml-auto w-full max-w-[860px]">
        <div className="group pointer-events-auto rounded-[1.2rem] border border-white/20 bg-stone-950/82 px-3 py-2.5 backdrop-blur-2xl transition-all duration-300 hover:bg-stone-950/90 focus-within:bg-stone-950/90 sm:px-4">
          <div className="flex flex-col gap-2.5 lg:flex-row lg:items-center lg:justify-between">
            <div className="min-w-0">
              <p className="text-[10px] uppercase tracking-[0.2em] text-emerald-200/75">AgriMind Команден Център</p>
              <p className="mt-0.5 truncate text-sm font-semibold text-white sm:text-base">Полеви мониторинг</p>
              <p className="mt-0.5 text-[11px] text-stone-400">{statusLabel} · {liveDate}</p>
            </div>

            <div className="flex flex-col gap-2 lg:flex-row lg:items-center">
              <label className="flex w-full min-w-0 items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs text-stone-300 sm:min-w-[210px]">
                <Search className="h-3.5 w-3.5 text-stone-500" />
                <input
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder="Търси..."
                  className="w-full bg-transparent outline-none placeholder:text-stone-500"
                />
              </label>
              <div className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/[0.03] p-1 md:flex">
                {commandModes.map((mode, index) => (
                  <button
                    key={mode}
                    className={[
                      'rounded-full px-2 py-1 text-[10px] uppercase tracking-[0.14em] transition',
                      index === 0
                        ? 'bg-emerald-300 text-stone-950'
                        : 'text-stone-300 hover:bg-white/10 hover:text-white',
                    ].join(' ')}
                  >
                    {mode}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-2 self-end lg:self-auto">
                <button className="rounded-full border border-white/10 bg-white/5 p-2 text-stone-300 transition hover:bg-white/10 hover:text-white">
                  <CloudSun className="h-3.5 w-3.5" />
                </button>
                <button className="rounded-full border border-white/10 bg-white/5 p-2 text-stone-300 transition hover:bg-white/10 hover:text-white">
                  <Bell className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}