import { Outlet } from 'react-router-dom'
import { Sidebar } from '../../widgets/sidebar/sidebar.tsx'
import { Topbar } from '../../widgets/topbar/topbar.tsx'

export function AppShellLayout() {
  return (
    <div className="min-h-screen bg-stone-950 text-stone-100">
      <div className="mx-auto grid min-h-screen max-w-7xl grid-cols-1 lg:grid-cols-[280px_minmax(0,1fr)]">
        <Sidebar />
        <div className="flex min-h-screen flex-col border-l border-white/10">
          <Topbar />
          <main className="flex-1 px-6 py-8 lg:px-10">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  )
}