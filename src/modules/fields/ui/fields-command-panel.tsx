import { MapPinned, Sprout, TrendingUp } from 'lucide-react'
import { parcelOutlines } from '@/modules/field-intelligence/model/shumen-region.ts'
import { getFieldKpis, getParcelNdvi } from '@/modules/fields/model/field-kpis.ts'
import { useShellStore } from '@/shared/lib/shell-store.ts'

export function FieldsCommandPanel() {
  const selectedParcelId = useShellStore((state) => state.selectedParcelId)
  const setSelectedParcelId = useShellStore((state) => state.setSelectedParcelId)
  const selectedParcel = parcelOutlines.find((parcel) => parcel.id === selectedParcelId) ?? parcelOutlines[0]
  const selectedNdvi = getParcelNdvi(selectedParcel?.id ?? null)
  const kpis = getFieldKpis()
  const healthBand = (selectedNdvi ?? 0) >= 0.7 ? 'Стабилно' : (selectedNdvi ?? 0) >= 0.6 ? 'Наблюдение' : 'Намеса'

  return (
    <section className="pointer-events-auto flex h-full max-h-[44svh] min-h-[280px] flex-col overflow-hidden rounded-[1rem] border border-white/20 bg-stone-950/84 p-3 backdrop-blur-2xl sm:rounded-[1.2rem] sm:p-3.5 xl:max-h-none xl:min-h-0">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-[11px] uppercase tracking-[0.22em] text-emerald-200/75">Модул Полета</p>
          <h3 className="mt-1 text-sm font-semibold text-white sm:text-base">Табло за парцели</h3>
        </div>
        <MapPinned className="h-4 w-4 text-emerald-200" />
      </div>

      <div className="mt-2.5 grid gap-1.5 sm:grid-cols-3">
        {kpis.map((kpi) => (
          <div key={kpi.label} className="rounded-md border border-white/10 bg-white/[0.03] px-2.5 py-2">
            <p className="text-[10px] uppercase tracking-[0.16em] text-stone-500">{kpi.label}</p>
            <p className="mt-0.5 text-xs font-semibold text-white sm:text-sm">{kpi.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-2.5 grid min-h-0 flex-1 gap-2.5 lg:grid-cols-[1fr_0.9fr]">
        <div className="min-h-0">
          <div className="flex items-center justify-between gap-3">
            <p className="text-xs uppercase tracking-[0.2em] text-stone-500">Списък с полета</p>
            <span className="rounded-full border border-white/10 bg-white/[0.03] px-2 py-1 text-[10px] uppercase tracking-[0.2em] text-stone-400">
              Жива синхр.
            </span>
          </div>
          <div className="mt-2 grid max-h-[22svh] gap-1.5 overflow-auto pr-1 sm:max-h-[24svh] xl:max-h-none xl:flex-1">
            {parcelOutlines.map((parcel) => {
              const isActive = selectedParcel?.id === parcel.id

              return (
                <button
                  type="button"
                  key={parcel.id}
                  onClick={() => setSelectedParcelId(parcel.id)}
                  className={[
                    'rounded-md border px-2.5 py-2 text-left text-xs transition sm:text-sm',
                    isActive
                      ? 'border-emerald-300/60 bg-emerald-300/14 text-white'
                      : 'border-white/10 bg-white/[0.02] text-stone-300 hover:border-white/20 hover:text-white',
                  ].join(' ')}
                >
                  <p className="font-medium">{parcel.name}</p>
                  <p className="mt-1 text-xs text-stone-400">
                    {parcel.crop} · {parcel.area}
                  </p>
                </button>
              )
            })}
          </div>
        </div>

        <article className="rounded-lg border border-white/10 bg-white/[0.03] p-3.5">
          <div className="flex items-center gap-2 text-lime-200">
            <TrendingUp className="h-4 w-4" />
            <p className="text-xs uppercase tracking-[0.2em]">Избрано поле</p>
          </div>
          <p className="mt-1.5 text-sm font-semibold text-white">{selectedParcel?.name}</p>
          <div className="mt-2 space-y-1 text-xs text-stone-300 sm:text-sm">
            <p>
              Култура: <span className="text-white">{selectedParcel?.crop}</span>
            </p>
            <p>
              Площ: <span className="text-white">{selectedParcel?.area}</span>
            </p>
            <p>
              NDVI индекс: <span className="text-white">{selectedNdvi?.toFixed(2) ?? 'няма данни'}</span>
            </p>
            <p>
              Състояние: <span className="text-white">{healthBand}</span>
            </p>
          </div>
          <div className="mt-2 rounded-md border border-lime-300/20 bg-lime-300/10 px-2.5 py-2 text-[11px] leading-5 text-lime-100 sm:text-xs">
            <div className="mb-1 flex items-center gap-1.5">
              <Sprout className="h-3.5 w-3.5" />
              Препоръка
            </div>
            Приоритизирай оглед за полета с NDVI под 0.60 и сравни с поливния график преди изпращане на екип.
          </div>
          <div className="mt-2 rounded-md border border-white/10 bg-white/[0.02] px-2.5 py-2 text-[11px] leading-5 text-stone-300 sm:text-xs">
            SLA: триаж до 45 мин, изпращане на екип до 2 ч, повторна проверка до 24 ч.
          </div>
        </article>
      </div>
    </section>
  )
}
