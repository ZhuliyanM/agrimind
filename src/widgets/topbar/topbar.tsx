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
    <header className="pointer-events-none fixed inset-x-0 top-0 z-[950] px-3 pt-3 sm:px-4 [@media(max-height:800px)]:pt-2 [@media(max-height:700px)]:px-2 [@media(max-height:700px)]:pt-1.5">
      <div className="ml-auto w-full max-w-[1240px] sm:pl-[92px]">
        <div className="group pointer-events-auto ml-auto w-full max-w-[360px] rounded-[1.2rem] border border-white/50 bg-white/54 px-3 py-2 shadow-[0_14px_36px_rgba(37,99,235,0.12)] backdrop-blur-xl transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] delay-75 hover:max-w-[880px] hover:bg-white/70 hover:shadow-[0_18px_42px_rgba(37,99,235,0.18)] focus-within:max-w-[880px] focus-within:bg-white/70 focus-within:shadow-[0_18px_42px_rgba(37,99,235,0.18)] sm:px-3.5 [@media(max-height:800px)]:max-w-[300px] [@media(max-height:800px)]:rounded-[1rem] [@media(max-height:800px)]:py-1.5 [@media(max-height:800px)]:hover:max-w-[640px] [@media(max-height:800px)]:focus-within:max-w-[640px] [@media(max-height:700px)]:max-w-[248px] [@media(max-height:700px)]:rounded-[0.95rem] [@media(max-height:700px)]:px-2.5 [@media(max-height:700px)]:py-1 [@media(max-height:700px)]:hover:max-w-[420px] [@media(max-height:700px)]:focus-within:max-w-[420px]">
          <div className="flex flex-col gap-2.5 lg:flex-row lg:items-center lg:justify-between">
            <div className="min-w-0">
              <p className="text-[10px] uppercase tracking-[0.2em] text-blue-700">AgriMind Команден Център</p>
              <p className="mt-0.5 truncate text-sm font-bold text-slate-900 sm:text-[14px] [@media(max-height:700px)]:text-[13px]">Полеви мониторинг</p>
              <div className="mt-1 hidden max-w-0 items-center gap-2 overflow-hidden text-[11px] text-slate-500 opacity-0 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:max-w-[420px] group-hover:opacity-100 group-focus-within:max-w-[420px] group-focus-within:opacity-100 sm:flex [@media(max-height:800px)]:hidden">
                <span>{statusLabel}</span>
                <span className="h-1 w-1 rounded-full bg-slate-300" />
                <span>{liveDate}</span>
                <span className="rounded-full border border-blue-100 bg-blue-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-blue-700">
                  Live
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-1.5 lg:flex-row lg:items-center lg:gap-2">
              <label className="flex w-full min-w-0 items-center gap-2 rounded-[0.95rem] border border-white/60 bg-blue-50/42 px-3 py-1.5 text-xs text-slate-600 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] delay-100 sm:min-w-[210px] [@media(max-height:700px)]:min-w-[170px] [@media(max-height:700px)]:px-2.5 [@media(max-height:700px)]:py-1">
                <Search className="h-3.5 w-3.5 text-blue-500" />
                <input
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder="Търси поле или парцел"
                  className="w-full bg-transparent outline-none placeholder:text-slate-400"
                />
              </label>
              <div className="hidden max-w-0 items-center gap-1 overflow-hidden rounded-[0.95rem] border border-white/55 bg-white/42 p-1 opacity-0 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:max-w-[360px] group-hover:opacity-100 group-focus-within:max-w-[360px] group-focus-within:opacity-100 md:flex [@media(max-height:800px)]:hidden">
                {commandModes.map((mode, index) => (
                  <button
                    key={mode}
                    className={[
                      'rounded-lg px-2.5 py-1 text-[10px] uppercase tracking-[0.14em] transition duration-300',
                      index === 0
                        ? 'bg-blue-600 text-white'
                        : 'text-slate-500 hover:bg-white/60 hover:text-blue-700',
                    ].join(' ')}
                    style={{ transitionDelay: `${90 + index * 35}ms` }}
                  >
                    {mode}
                  </button>
                ))}
              </div>
              <div className="hidden items-center gap-2 self-end transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:flex group-focus-within:flex lg:self-auto [@media(max-height:800px)]:hidden">
                <button className="rounded-[0.95rem] border border-white/60 bg-white/48 p-1.5 text-blue-600 transition duration-300 hover:bg-white/68 hover:text-blue-700">
                  <CloudSun className="h-3.5 w-3.5" />
                </button>
                <button className="rounded-[0.95rem] border border-white/60 bg-white/48 p-1.5 text-blue-600 transition duration-300 hover:bg-white/68 hover:text-blue-700">
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