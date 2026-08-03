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
    <article className="rounded-[1.2rem] border border-white/55 bg-white/56 p-3 shadow-[0_14px_32px_rgba(59,130,246,0.12)] backdrop-blur-xl sm:p-3.5 xl:max-h-[min(22svh,220px)] [@media(max-height:800px)]:max-h-[150px] [@media(max-height:800px)]:overflow-hidden [@media(max-height:800px)]:p-2.5 [@media(max-height:700px)]:max-h-[116px] [@media(max-height:700px)]:rounded-[1rem] [@media(max-height:700px)]:p-2">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-[11px] uppercase tracking-[0.26em] text-blue-700">Сигурност и достъп</p>
          <h2 className="mt-1 text-sm font-semibold text-slate-900">{status === 'authenticated' ? 'Сесия активна' : 'Входът е подготвен'}</h2>
        </div>
        <div className="inline-flex rounded-[0.95rem] bg-blue-50/55 p-2 text-blue-600">
          {status === 'authenticated' ? <BadgeCheck className="h-5 w-5" /> : <ShieldAlert className="h-5 w-5" />}
        </div>
      </div>

      <div className="mt-2.5 space-y-2 text-xs leading-5 text-slate-600 sm:text-sm">
        <p>{statusCopy[status]}</p>
        <div className="flex items-center gap-2 text-slate-700">
          <DatabaseZap className="h-4 w-4 text-blue-600" />
          <span>{hasSupabaseEnv() ? 'Supabase средата е налична' : getSupabaseEnvIssue() ?? 'Липсва Supabase среда'}</span>
        </div>
        <div className="flex items-center gap-2 text-slate-700">
          <UserRound className="h-4 w-4 text-blue-600" />
          <span>{email ?? 'Няма вписан потребител'}</span>
        </div>
      </div>
    </article>
  )
}