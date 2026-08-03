import { useQuery } from '@tanstack/react-query'
import { AuthStatusCard } from '@/features/auth/ui/auth-status-card.tsx'
import { useAuth } from '@/features/auth/model/use-auth.ts'
import { SentinelMapCard } from '@/modules/field-intelligence/index.ts'
import { FieldsCommandPanel } from '@/modules/fields/index.ts'
import { OperationsHubPanel } from '@/modules/operations/index.ts'
import { fetchPythonOverview } from '@/shared/api/python-overview.ts'
import { useShellStore } from '@/shared/lib/shell-store.ts'

export function DashboardPage() {
  const { session } = useAuth()
  const mapLayer = useShellStore((state) => state.mapLayer)
  const activeDesktopPanel = useShellStore((state) => state.activeDesktopPanel)
  const setActiveDesktopPanel = useShellStore((state) => state.setActiveDesktopPanel)
  const overviewQuery = useQuery({
    queryKey: ['python-overview'],
    queryFn: fetchPythonOverview,
    retry: 1,
  })

  return (
    <div className="h-full w-full overflow-hidden p-0">
      <div className="relative h-[100svh] min-h-0">
        <div className="absolute inset-0 overflow-hidden rounded-none xl:rounded-[2rem]">
          <SentinelMapCard />
        </div>

        <div className="pointer-events-none absolute left-3 top-3 z-[500] max-w-[320px]">
          <div className="pointer-events-auto rounded-[1.25rem] border border-white/55 bg-white/64 px-3 py-2.5 shadow-[0_16px_34px_rgba(59,130,246,0.14)] backdrop-blur-xl">
            <p className="text-[10px] uppercase tracking-[0.18em] text-blue-700">AI управляем режим</p>
            <p className="mt-1 text-sm font-semibold text-slate-900">Картата е основна работна среда</p>
            <p className="mt-1 text-xs leading-6 text-slate-500">
              Управлявай слоеве, полета и операции само през AI чата. {overviewQuery.data?.status ?? 'Python backend активен при стартиране.'}
            </p>
            <p className="mt-2 text-xs text-slate-500">
              {overviewQuery.isSuccess ? `Източник: ${overviewQuery.data.source}` : `Активен слой: ${mapLayer}`}
            </p>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-y-3 left-3 z-[520] hidden xl:flex [@media(max-height:800px)]:inset-y-2 [@media(max-height:800px)]:left-2 [@media(max-height:700px)]:inset-y-1.5 [@media(max-height:700px)]:left-1.5">
          <div
            className="flex items-center"
            onMouseEnter={() => setActiveDesktopPanel('left')}
            onMouseLeave={() => {
              if (activeDesktopPanel === 'left') {
                setActiveDesktopPanel(null)
              }
            }}
          >
            <div
              className={[
                'pointer-events-auto flex h-18 w-9 items-center justify-center rounded-l-[1rem] rounded-r-[0.8rem] border border-white/50 text-[10px] font-semibold uppercase tracking-[0.18em] shadow-[0_14px_34px_rgba(59,130,246,0.14)] backdrop-blur-xl [writing-mode:vertical-rl] [text-orientation:mixed] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] delay-75 [@media(max-height:700px)]:h-16 [@media(max-height:700px)]:w-8 [@media(max-height:700px)]:text-[9px]',
                activeDesktopPanel === 'left'
                  ? 'bg-white/68 text-blue-700'
                  : activeDesktopPanel === 'right'
                    ? 'bg-white/30 text-slate-400 opacity-55'
                    : 'bg-white/54 text-blue-700',
              ].join(' ')}
            >
              Полета
            </div>
            <div
              className={[
                'pointer-events-auto ml-2 w-[272px] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] delay-100 [@media(max-height:800px)]:w-[246px] [@media(max-height:700px)]:ml-1.5 [@media(max-height:700px)]:w-[220px]',
                activeDesktopPanel === 'left'
                  ? 'translate-x-0 opacity-100'
                  : '-translate-x-[calc(100%+1rem)] opacity-0',
              ].join(' ')}
            >
              <FieldsCommandPanel />
            </div>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-y-3 right-3 z-[520] hidden xl:flex [@media(max-height:800px)]:inset-y-2 [@media(max-height:800px)]:right-2 [@media(max-height:700px)]:inset-y-1.5 [@media(max-height:700px)]:right-1.5">
          <div
            className="flex items-center"
            onMouseEnter={() => setActiveDesktopPanel('right')}
            onMouseLeave={() => {
              if (activeDesktopPanel === 'right') {
                setActiveDesktopPanel(null)
              }
            }}
          >
            <div
              className={[
                'pointer-events-auto mr-2 grid w-[272px] grid-rows-[minmax(0,1fr)_auto] gap-2 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] delay-100 [@media(max-height:800px)]:w-[246px] [@media(max-height:700px)]:mr-1.5 [@media(max-height:700px)]:w-[220px] [@media(max-height:700px)]:gap-1.5',
                activeDesktopPanel === 'right'
                  ? 'translate-x-0 opacity-100'
                  : 'translate-x-[calc(100%+1rem)] opacity-0',
              ].join(' ')}
            >
              <OperationsHubPanel />
              <AuthStatusCard email={session?.user.email} />
            </div>
            <div
              className={[
                'pointer-events-auto flex h-18 w-9 items-center justify-center rounded-l-[0.8rem] rounded-r-[1rem] border border-white/50 text-[10px] font-semibold uppercase tracking-[0.18em] shadow-[0_14px_34px_rgba(59,130,246,0.14)] backdrop-blur-xl [writing-mode:vertical-rl] [text-orientation:mixed] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] delay-75 [@media(max-height:700px)]:h-16 [@media(max-height:700px)]:w-8 [@media(max-height:700px)]:text-[9px]',
                activeDesktopPanel === 'right'
                  ? 'bg-white/68 text-blue-700'
                  : activeDesktopPanel === 'left'
                    ? 'bg-white/30 text-slate-400 opacity-55'
                    : 'bg-white/54 text-blue-700',
              ].join(' ')}
            >
              Операции
            </div>
          </div>
        </div>

        <div className="pointer-events-none absolute bottom-3 left-3 z-[500] max-w-[280px] xl:hidden">
          <div className="pointer-events-auto rounded-[1.15rem] border border-white/55 bg-white/62 px-3 py-2.5 shadow-[0_16px_34px_rgba(59,130,246,0.14)] backdrop-blur-xl">
            <p className="text-[10px] uppercase tracking-[0.16em] text-blue-700">AI чат</p>
            <p className="mt-1 text-xs leading-6 text-slate-500">Напиши: „Покажи всички полета“, „Отвори операции“, „Покажи NDVI".</p>
          </div>
        </div>
      </div>
    </div>
  )
}