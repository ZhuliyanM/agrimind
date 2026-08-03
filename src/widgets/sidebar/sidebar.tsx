import { Activity, ChartNoAxesCombined, ChevronRight, DatabaseZap, LayoutDashboard, Sprout, Waves } from 'lucide-react'

const navigationItems = [
  {
    label: 'Обзор',
    to: '/app',
    icon: LayoutDashboard,
  },
  {
    label: 'Гео наблюдение',
    to: '/app',
    icon: Sprout,
  },
  {
    label: 'Водни системи',
    to: '/app',
    icon: Waves,
  },
  {
    label: 'Данни',
    to: '/app',
    icon: DatabaseZap,
  },
  {
    label: 'Операции',
    to: '/app',
    icon: Activity,
  },
  {
    label: 'Анализи',
    to: '/app',
    icon: ChartNoAxesCombined,
  },
]

export function Sidebar() {
  return (
    <aside className="pointer-events-none fixed inset-y-0 left-0 z-[900] hidden p-3 sm:flex">
      <div className="group pointer-events-auto flex h-full max-h-[min(840px,calc(100svh-24px))] w-[72px] flex-col overflow-hidden rounded-[1.35rem] border border-white/45 bg-white/52 p-2.5 shadow-[0_14px_34px_rgba(37,99,235,0.14)] backdrop-blur-xl transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] delay-75 hover:w-[204px] hover:bg-white/68 hover:shadow-[0_20px_42px_rgba(37,99,235,0.18)] focus-within:w-[204px] focus-within:bg-white/68 focus-within:shadow-[0_20px_42px_rgba(37,99,235,0.18)]">
        <div className="border-b border-blue-100 pb-3">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-[1rem] bg-blue-600 text-white shadow-[0_8px_18px_rgba(37,99,235,0.24)]">
              <Sprout className="h-4 w-4" />
            </div>
            <div className="min-w-0 max-w-0 overflow-hidden opacity-0 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] delay-100 group-hover:max-w-[132px] group-hover:opacity-100 group-focus-within:max-w-[132px] group-focus-within:opacity-100">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-700">AgriMind</p>
              <p className="text-xs text-slate-500">Field Operations OS</p>
            </div>
          </div>
        </div>

        <div className="mt-2.5 rounded-[1rem] border border-white/55 bg-blue-50/42 px-2.5 py-2">
          <p className="text-center text-[10px] font-semibold uppercase tracking-[0.16em] text-blue-700 group-hover:hidden group-focus-within:hidden">ШУ</p>
          <div className="hidden group-hover:block group-focus-within:block animate-in fade-in duration-500 delay-100">
            <p className="text-[10px] uppercase tracking-[0.16em] text-blue-700">Активна зона</p>
            <p className="mt-1 text-[13px] font-semibold text-slate-900">Шумен, България</p>
            <p className="mt-0.5 text-xs text-slate-500">8 парцела в наблюдение</p>
          </div>
        </div>

        <nav className="mt-2.5 grid gap-1">
          {navigationItems.map(({ label, to: _to, icon: Icon }, index) => (
            <button
              key={label}
              type="button"
              title={label}
              className={[
                'flex items-center justify-between rounded-[0.95rem] px-2.5 py-2 text-left text-[13px] transition duration-300 ease-out',
                index === 0
                  ? 'bg-blue-600 text-white shadow-[0_10px_18px_rgba(37,99,235,0.2)]'
                  : 'text-slate-600 hover:bg-white/55 hover:text-blue-700',
              ].join(' ')}
              style={{ transitionDelay: `${index * 35}ms` }}
            >
              <span className="flex items-center gap-2.5">
                <Icon className="h-4 w-4 shrink-0" />
                <span className="max-w-0 overflow-hidden whitespace-nowrap opacity-0 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:max-w-[112px] group-hover:opacity-100 group-focus-within:max-w-[112px] group-focus-within:opacity-100" style={{ transitionDelay: `${80 + index * 40}ms` }}>{label}</span>
              </span>
              <ChevronRight className="h-4 w-4 shrink-0 translate-x-[-4px] opacity-0 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0 group-hover:opacity-70 group-focus-within:translate-x-0 group-focus-within:opacity-70" style={{ transitionDelay: `${120 + index * 40}ms` }} />
            </button>
          ))}
        </nav>

        <div className="mt-auto rounded-[1rem] border border-white/55 bg-white/48 px-2.5 py-2.5 backdrop-blur-md">
          <p className="text-center text-[10px] font-semibold uppercase tracking-[0.16em] text-blue-700 group-hover:hidden group-focus-within:hidden">Live</p>
          <div className="hidden group-hover:block group-focus-within:block animate-in fade-in duration-500 delay-150">
            <p className="text-[10px] uppercase tracking-[0.16em] text-slate-500">Статус</p>
            <p className="mt-1 text-[13px] font-semibold text-slate-900">Системата е активна</p>
            <p className="mt-1 text-xs leading-5 text-slate-500">Картата, полетата и оперативната опашка са синхронизирани.</p>
          </div>
        </div>
      </div>
    </aside>
  )
}