import { createBrowserRouter } from 'react-router-dom'
import App from '../../App.tsx'
import { AppShellLayout } from '../layouts/app-shell-layout.tsx'
import { DashboardPage } from '../../pages/app/dashboard-page.tsx'
import { LandingPage } from '../../pages/public/landing-page.tsx'

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
        path: 'app',
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
])