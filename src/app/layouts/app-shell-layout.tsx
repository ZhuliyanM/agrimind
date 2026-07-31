import { Outlet } from 'react-router-dom'
import { Sidebar } from '@/widgets/sidebar/sidebar.tsx'
import { Topbar } from '@/widgets/topbar/topbar.tsx'

export function AppShellLayout() {
  return (
    <div className="min-h-screen bg-stone-950 text-stone-100">
      <div className="mx-auto grid min-h-screen max-w-[1600px] grid-cols-1 lg:grid-cols-[300px_minmax(0,1fr)]">
        <Sidebar />
        <div className="flex min-h-screen flex-col border-l border-white/10 bg-[radial-gradient(circle_at_top,_rgba(52,211,153,0.08),_transparent_26%)]">
          <Topbar />
          <main className="flex-1 px-6 py-8 lg:px-10 xl:px-12">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  )
}