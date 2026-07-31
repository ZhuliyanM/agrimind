import { BadgeCheck, DatabaseZap, ShieldAlert, UserRound } from 'lucide-react'
import { getSupabaseEnvIssue, hasSupabaseEnv } from '@/app/config/env.ts'
import { useAuth } from '@/features/auth/model/use-auth.ts'

type AuthStatusCardProps = {
  email?: string
}

const statusCopy = {
  authenticated: 'Има активна Supabase сесия в приложението.',
  anonymous: 'Няма активна потребителска сесия. Защитените маршрути пренасочват към /auth.',
  'env-missing': 'Supabase ключовете не са конфигурирани. Входът е подготвен, но неактивен.',
  loading: 'Приложението проверява текущата сесия преди достъп до защитените маршрути.',
}

export function AuthStatusCard({ email }: AuthStatusCardProps) {
  const { status } = useAuth()

  return (
    <article className="rounded-[1.5rem] border border-emerald-300/20 bg-emerald-300/10 p-4 backdrop-blur-2xl sm:p-5">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-[11px] uppercase tracking-[0.26em] text-emerald-200/70">Сигурност и достъп</p>
          <h2 className="mt-2 text-lg font-semibold text-white">{status === 'authenticated' ? 'Сесия активна' : 'Входът е подготвен'}</h2>
        </div>
        <div className="inline-flex rounded-xl bg-white/10 p-2.5 text-emerald-200">
          {status === 'authenticated' ? <BadgeCheck className="h-5 w-5" /> : <ShieldAlert className="h-5 w-5" />}
        </div>
      </div>

      <div className="mt-4 space-y-2.5 text-sm leading-6 text-stone-300">
        <p>{statusCopy[status]}</p>
        <div className="flex items-center gap-2 text-stone-200">
          <DatabaseZap className="h-4 w-4 text-emerald-200" />
          <span>{hasSupabaseEnv() ? 'Supabase средата е налична' : getSupabaseEnvIssue() ?? 'Липсва Supabase среда'}</span>
        </div>
        <div className="flex items-center gap-2 text-stone-200">
          <UserRound className="h-4 w-4 text-emerald-200" />
          <span>{email ?? 'Няма вписан потребител'}</span>
        </div>
      </div>
    </article>
  )
}