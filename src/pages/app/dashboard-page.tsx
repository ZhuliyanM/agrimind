import { PanelLeft, PanelRight } from 'lucide-react'
import { useState } from 'react'
import { AuthStatusCard } from '@/features/auth/ui/auth-status-card.tsx'
import { useAuth } from '@/features/auth/model/use-auth.ts'
import { SentinelMapCard } from '@/modules/field-intelligence/index.ts'
import { FieldsCommandPanel } from '@/modules/fields/index.ts'
import { OperationsHubPanel } from '@/modules/operations/index.ts'
import { useShellStore } from '@/shared/lib/shell-store.ts'

const northStarStats = [
  { label: 'Регион', value: 'Земеделски пояс Шумен' },
  { label: 'Граници', value: 'Реални OSM парцели' },
  { label: 'Изображение', value: 'Sentinel + NDVI режим' },
  { label: 'Сигнали', value: 'Интерактивна опашка' },
]

export function DashboardPage() {
  const { session } = useAuth()
  const mapLayer = useShellStore((state) => state.mapLayer)
  const setMapLayer = useShellStore((state) => state.setMapLayer)
  const [isLeftPanelOpen, setIsLeftPanelOpen] = useState(false)
  const [isRightPanelOpen, setIsRightPanelOpen] = useState(false)

  return (
    <div className="h-full w-full overflow-x-hidden overflow-y-auto px-2 pb-2 pt-[92px] sm:px-3 sm:pb-3 sm:pt-[104px] lg:px-4 lg:pb-4 xl:overflow-hidden">
      <div className="grid min-h-[calc(100svh-102px)] grid-cols-1 grid-rows-[auto_minmax(0,1fr)] gap-2 sm:min-h-[calc(100svh-116px)] sm:gap-2.5 xl:h-[calc(100svh-116px)] xl:min-h-0">
        <div className="grid gap-2 rounded-[0.95rem] border border-white/20 bg-stone-950/82 p-2 backdrop-blur-2xl sm:grid-cols-2 xl:col-span-3 xl:grid-cols-[1fr_auto]">
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
            {northStarStats.map((item) => (
              <div key={item.label} className="rounded-md border border-white/10 bg-white/[0.03] px-2.5 py-2">
                <p className="text-[10px] uppercase tracking-[0.18em] text-stone-500">{item.label}</p>
                <p className="mt-1 text-xs font-semibold text-white sm:text-sm">{item.value}</p>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-1.5 rounded-md border border-white/10 bg-white/[0.03] p-1">
            <button
              type="button"
              onClick={() => setMapLayer('sentinel')}
              className={[
                'rounded-md px-2.5 py-1.5 text-[11px] uppercase tracking-[0.14em] transition',
                mapLayer === 'sentinel'
                  ? 'bg-emerald-300 text-stone-950'
                  : 'text-stone-300 hover:bg-white/10 hover:text-white',
              ].join(' ')}
            >
              Сателит RGB
            </button>
            <button
              type="button"
              onClick={() => setMapLayer('ndvi')}
              className={[
                'rounded-md px-2.5 py-1.5 text-[11px] uppercase tracking-[0.14em] transition',
                mapLayer === 'ndvi'
                  ? 'bg-lime-300 text-stone-950'
                  : 'text-stone-300 hover:bg-white/10 hover:text-white',
              ].join(' ')}
            >
              NDVI
            </button>
          </div>
        </div>

        <div className="relative hidden min-h-0 xl:grid xl:grid-cols-[48px_minmax(0,1fr)_48px] xl:gap-2.5">
          <div className="flex items-center justify-center">
            <button
              type="button"
              onClick={() => setIsLeftPanelOpen((value) => !value)}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/20 bg-stone-950/85 text-stone-200 backdrop-blur transition hover:bg-white/10 hover:text-white"
              aria-expanded={isLeftPanelOpen}
              aria-label="Покажи или скрий панел Полета"
            >
              <PanelLeft className="h-4 w-4" />
            </button>
          </div>

          <div className="min-h-0 overflow-hidden rounded-[1.1rem] border border-white/20 bg-stone-950/72 p-1.5 backdrop-blur">
            <SentinelMapCard />
          </div>

          <div className="flex items-center justify-center">
            <button
              type="button"
              onClick={() => setIsRightPanelOpen((value) => !value)}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/20 bg-stone-950/85 text-stone-200 backdrop-blur transition hover:bg-white/10 hover:text-white"
              aria-expanded={isRightPanelOpen}
              aria-label="Покажи или скрий оперативен панел"
            >
              <PanelRight className="h-4 w-4" />
            </button>
          </div>

          <aside
            className={[
              'pointer-events-auto absolute bottom-0 left-[56px] top-0 z-20 w-[min(31vw,300px)] transition duration-300',
              isLeftPanelOpen ? 'translate-x-0 opacity-100' : '-translate-x-[108%] opacity-0',
            ].join(' ')}
          >
            <FieldsCommandPanel />
          </aside>

          <aside
            className={[
              'pointer-events-auto absolute bottom-0 right-[56px] top-0 z-20 grid w-[min(33vw,320px)] grid-rows-[minmax(0,1fr)_auto] gap-2 transition duration-300',
              isRightPanelOpen ? 'translate-x-0 opacity-100' : 'translate-x-[108%] opacity-0',
            ].join(' ')}
          >
            <OperationsHubPanel />
            <AuthStatusCard email={session?.user.email} />
          </aside>
        </div>

        <div className="h-[50svh] min-h-[300px] overflow-hidden rounded-[0.95rem] border border-white/20 bg-stone-950/72 p-1 backdrop-blur sm:h-[56svh] xl:hidden">
          <SentinelMapCard />
        </div>

        <div className="grid min-h-0 gap-2 xl:hidden">
          <FieldsCommandPanel />
          <OperationsHubPanel />
          <AuthStatusCard email={session?.user.email} />
        </div>
      </div>
    </div>
  )
}