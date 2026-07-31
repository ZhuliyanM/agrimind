import { BadgeCheck, DatabaseZap, ShieldAlert, UserRound } from 'lucide-react'
import { getSupabaseEnvIssue, hasSupabaseEnv } from '@/app/config/env.ts'
import { useAuth } from '@/features/auth/model/use-auth.ts'

type AuthStatusCardProps = {
  email?: string
}

const statusCopy = {
  authenticated: 'An authenticated Supabase session is active in the app shell.',
  anonymous: 'No user session is active yet. Protected routes redirect to /auth.',
  'env-missing': 'Supabase credentials are not configured yet, so auth is scaffolded but inactive.',
  loading: 'The application is checking the current session before unlocking protected routes.',
}

export function AuthStatusCard({ email }: AuthStatusCardProps) {
  const { status } = useAuth()

  return (
    <article className="rounded-[2rem] border border-emerald-300/15 bg-emerald-300/8 p-8">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-emerald-200/70">Auth and data boundary</p>
          <h2 className="mt-4 text-2xl font-semibold text-white">{status === 'authenticated' ? 'Session active' : 'Auth scaffold ready'}</h2>
        </div>
        <div className="inline-flex rounded-2xl bg-white/10 p-3 text-emerald-200">
          {status === 'authenticated' ? <BadgeCheck className="h-6 w-6" /> : <ShieldAlert className="h-6 w-6" />}
        </div>
      </div>

      <div className="mt-6 space-y-3 text-sm leading-7 text-stone-300">
        <p>{statusCopy[status]}</p>
        <div className="flex items-center gap-2 text-stone-200">
          <DatabaseZap className="h-4 w-4 text-emerald-200" />
          <span>{hasSupabaseEnv() ? 'Supabase env detected' : getSupabaseEnvIssue() ?? 'Supabase env missing'}</span>
        </div>
        <div className="flex items-center gap-2 text-stone-200">
          <UserRound className="h-4 w-4 text-emerald-200" />
          <span>{email ?? 'No authenticated user yet'}</span>
        </div>
      </div>
    </article>
  )
}