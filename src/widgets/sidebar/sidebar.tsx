import { ChartNoAxesCombined, DatabaseZap, LayoutDashboard, Sprout } from 'lucide-react'
import { NavLink } from 'react-router-dom'

const navigationItems = [
  {
    label: 'Overview',
    to: '/app',
    icon: LayoutDashboard,
  },
  {
    label: 'Modules',
    to: '/app',
    icon: Sprout,
  },
  {
    label: 'Data layer',
    to: '/app',
    icon: DatabaseZap,
  },
  {
    label: 'Analytics',
    to: '/app',
    icon: ChartNoAxesCombined,
  },
]

export function Sidebar() {
  return (
    <aside className="border-b border-white/10 bg-stone-950/90 px-5 py-6 lg:border-b-0 lg:px-6 lg:py-8">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-300 text-stone-950">
          <Sprout className="h-5 w-5" />
        </div>
        <div>
          <p className="text-sm uppercase tracking-[0.28em] text-emerald-200/80">AgriMind</p>
          <p className="text-xs text-stone-500">Application architecture shell</p>
        </div>
      </div>

      <nav className="mt-8 grid gap-2">
        {navigationItems.map(({ label, to, icon: Icon }) => (
          <NavLink
            key={label}
            to={to}
            className={({ isActive }) =>
              [
                'flex items-center gap-3 rounded-2xl px-4 py-3 text-sm transition',
                isActive
                  ? 'bg-emerald-300 text-stone-950'
                  : 'text-stone-300 hover:bg-white/5 hover:text-white',
              ].join(' ')
            }
          >
            <Icon className="h-4 w-4" />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}