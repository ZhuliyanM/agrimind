import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '@/features/auth/model/use-auth.ts'

export function AuthGuard() {
  const location = useLocation()
  const { status } = useAuth()

  if (status === 'loading') {
    return (
      <div className="flex min-h-screen items-center justify-center bg-stone-950 px-6 text-stone-100">
        <div className="rounded-3xl border border-white/10 bg-white/5 px-6 py-5 text-sm text-stone-300">
          Preparing your authenticated workspace...
        </div>
      </div>
    )
  }

  if (status === 'env-missing') {
    return <Outlet />
  }

  if (status !== 'authenticated') {
    return <Navigate to="/auth" replace state={{ from: location }} />
  }

  return <Outlet />
}