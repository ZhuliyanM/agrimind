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
    <aside className="pointer-events-none fixed inset-y-0 left-0 z-[900] flex items-center p-3 sm:p-5">
      <div className="group pointer-events-auto flex h-[min(88svh,860px)] w-[84vw] max-w-[360px] -translate-x-[calc(100%-3.4rem)] flex-col rounded-[2rem] border border-white/20 bg-stone-950/82 p-4 backdrop-blur-2xl transition-all duration-500 hover:translate-x-0 focus-within:translate-x-0 sm:w-[320px]">
        <div className="flex items-center gap-3 border-b border-white/10 pb-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-300 text-stone-950">
            <Sprout className="h-5 w-5" />
          </div>
          <div className="overflow-hidden transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100 sm:opacity-100">
            <p className="text-sm uppercase tracking-[0.28em] text-emerald-200/80">AgriMind</p>
            <p className="text-xs text-stone-500">Fullscreen command rail</p>
          </div>
        </div>

        <div className="mt-5 rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-4">
          <p className="text-xs uppercase tracking-[0.28em] text-stone-500">Demo territory</p>
          <p className="mt-2 text-lg font-semibold text-white">Shumen, Bulgaria</p>
          <p className="mt-2 text-sm leading-6 text-stone-400">
            Hover rail over fullscreen map for quick module access without losing territory context.
          </p>
        </div>

        <nav className="mt-5 grid gap-2">
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
              <Icon className="h-4 w-4 shrink-0" />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="mt-auto rounded-[1.5rem] border border-emerald-300/10 bg-emerald-300/8 p-4 text-left">
          <p className="text-xs uppercase tracking-[0.28em] text-emerald-200/75">Platform posture</p>
          <p className="mt-2 text-sm font-medium text-white">Hover shell keeps map as the first-class workspace.</p>
        </div>
      </div>
    </aside>
  )
}