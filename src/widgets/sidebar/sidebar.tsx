import { Activity, ChartNoAxesCombined, DatabaseZap, LayoutDashboard, Sprout, Waves } from 'lucide-react'
import { NavLink } from 'react-router-dom'

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
    <aside className="pointer-events-none fixed inset-y-0 left-0 z-[900] hidden items-center p-2 sm:flex sm:p-3">
      <div className="group pointer-events-auto flex h-[min(80svh,680px)] w-[276px] -translate-x-[calc(100%-2.9rem)] flex-col rounded-[1.2rem] border border-white/20 bg-stone-950/86 p-3 backdrop-blur-2xl transition-all duration-500 hover:translate-x-0 focus-within:translate-x-0">
        <div className="flex items-center gap-2.5 border-b border-white/10 pb-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-300 text-stone-950">
            <Sprout className="h-4 w-4" />
          </div>
          <div className="overflow-hidden transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100 sm:opacity-100">
            <p className="text-xs uppercase tracking-[0.22em] text-emerald-200/80">AgriMind</p>
            <p className="text-xs text-stone-500">Навигационен панел</p>
          </div>
        </div>

        <div className="mt-3 rounded-xl border border-white/10 bg-white/[0.03] p-3">
          <p className="text-[10px] uppercase tracking-[0.2em] text-stone-500">Наблюдавана зона</p>
          <p className="mt-1 text-sm font-semibold text-white">Шумен, България</p>
        </div>

        <nav className="mt-3 grid gap-1">
          {navigationItems.map(({ label, to, icon: Icon }) => (
            <NavLink
              key={label}
              to={to}
              className={({ isActive }) =>
                [
                  'flex items-center gap-2.5 rounded-lg px-3 py-2 text-xs transition',
                  isActive
                    ? 'bg-emerald-300 text-stone-950'
                    : 'text-stone-300 hover:bg-white/5 hover:text-white',
                ].join(' ')
              }
            >
              <Icon className="h-3.5 w-3.5 shrink-0" />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="mt-auto rounded-xl border border-emerald-300/10 bg-emerald-300/8 p-3 text-left">
          <p className="text-[10px] uppercase tracking-[0.2em] text-emerald-200/75">Статус</p>
          <p className="mt-1 text-xs font-medium text-white">Картата е основна работна среда.</p>
        </div>
      </div>
    </aside>
  )
}