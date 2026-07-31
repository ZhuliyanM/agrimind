import { RouterProvider } from 'react-router-dom'
import { router } from './router.tsx'

export function AppRouter() {
  return <RouterProvider router={router} />
}