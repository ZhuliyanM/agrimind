import { AuthStatusCard } from '@/features/auth/ui/auth-status-card.tsx'
import { useAuth } from '@/features/auth/model/use-auth.ts'
import { SentinelMapCard } from '@/modules/field-intelligence/index.ts'
import { FieldsCommandPanel } from '@/modules/fields/index.ts'
import { OperationsHubPanel } from '@/modules/operations/index.ts'

const northStarStats = [
  { label: 'Region', value: 'Shumen farmland belt' },
  { label: 'Boundaries', value: 'OSM real parcels' },
  { label: 'Imagery', value: 'Sentinel + NDVI mode' },
  { label: 'Live incidents', value: 'Interactive queue' },
]

export function DashboardPage() {
  const { session } = useAuth()

  return (
    <div className="relative h-full w-full overflow-hidden">
      <SentinelMapCard />

      <div className="pointer-events-none absolute inset-x-3 bottom-3 z-[920] grid gap-3 xl:inset-x-5 xl:bottom-4">
        <div className="pointer-events-auto grid gap-2 rounded-[1.3rem] border border-white/20 bg-stone-950/82 p-3 backdrop-blur-2xl sm:grid-cols-4">
          {northStarStats.map((item) => (
            <div key={item.label} className="rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2.5">
              <p className="text-[10px] uppercase tracking-[0.24em] text-stone-500">{item.label}</p>
              <p className="mt-1 text-sm font-semibold text-white">{item.value}</p>
            </div>
          ))}
        </div>

        <div className="grid gap-3 xl:grid-cols-[1.1fr_1.3fr_0.7fr]">
          <FieldsCommandPanel />
          <OperationsHubPanel />
          <div className="pointer-events-auto">
            <AuthStatusCard email={session?.user.email} />
          </div>
        </div>
      </div>
    </div>
  )
}