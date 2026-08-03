import { Outlet } from 'react-router-dom'

export function AppShellLayout() {
  return (
    <div className="relative h-screen overflow-hidden bg-transparent text-slate-900">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(59,130,246,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(59,130,246,0.04)_1px,transparent_1px)] bg-[size:24px_24px] opacity-40" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.16),_transparent_70%)]" />
      <main className="h-full w-full">
        <Outlet />
      </main>
    </div>
  )
}