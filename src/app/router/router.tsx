import { createBrowserRouter } from 'react-router-dom'
import App from '@/App.tsx'
import { AuthGuard } from '@/app/guards/auth-guard.tsx'
import { AppShellLayout } from '@/app/layouts/app-shell-layout.tsx'
import { DashboardPage } from '@/pages/app/dashboard-page.tsx'
import { AuthPage } from '@/pages/public/auth-page.tsx'
import { LandingPage } from '@/pages/public/landing-page.tsx'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
      {
        path: 'auth',
        element: <AuthPage />,
      },
      {
        path: 'app',
        element: <AuthGuard />,
        children: [
          {
            element: <AppShellLayout />,
            children: [
              {
                index: true,
                element: <DashboardPage />,
              },
            ],
          },
        ],
      },
    ],
  },
])