import { Outlet } from 'react-router-dom'
import { Sidebar } from '@/widgets/sidebar/sidebar.tsx'
import { Topbar } from '@/widgets/topbar/topbar.tsx'

export function AppShellLayout() {
  return (
    <div className="relative h-screen overflow-hidden bg-stone-950 text-stone-100">
      <main className="h-full w-full">
        <Outlet />
      </main>
      <Sidebar />
      <Topbar />
    </div>
  )
}