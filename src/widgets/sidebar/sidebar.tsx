import { Activity, ChartNoAxesCombined, DatabaseZap, LayoutDashboard, Sprout, Waves } from 'lucide-react'
import { NavLink } from 'react-router-dom'

const navigationItems = [
  {
    label: 'Overview',
    to: '/app',
    icon: LayoutDashboard,
  },
  {
    label: 'Geo Intelligence',
    to: '/app',
    icon: Sprout,
  },
  {
    label: 'Water Systems',
    to: '/app',
    icon: Waves,
  },
  {
    label: 'Data Fabric',
    to: '/app',
    icon: DatabaseZap,
  },
  {
    label: 'Operations',
    to: '/app',
    icon: Activity,
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
          <p className="text-xs text-stone-500">New-generation agri SaaS</p>
        </div>
      </div>

      <div className="mt-8 rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-4">
        <p className="text-xs uppercase tracking-[0.28em] text-stone-500">Demo territory</p>
        <p className="mt-2 text-lg font-semibold text-white">Shumen, Bulgaria</p>
        <p className="mt-2 text-sm leading-6 text-stone-400">
          Sentinel-first command layer for crop monitoring, irrigation readiness, and modular farm operations.
        </p>
      </div>

      <nav className="mt-6 grid gap-2">
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

      <div className="mt-8 rounded-[1.75rem] border border-emerald-300/10 bg-emerald-300/8 p-4 text-left">
        <p className="text-xs uppercase tracking-[0.28em] text-emerald-200/75">Platform posture</p>
        <p className="mt-2 text-sm font-medium text-white">Architecture is ready for new modules.</p>
        <p className="mt-2 text-sm leading-6 text-stone-300">
          Add future agronomy, machinery, finance, compliance, and AI layers without collapsing the app shell.
        </p>
      </div>
    </aside>
  )
}