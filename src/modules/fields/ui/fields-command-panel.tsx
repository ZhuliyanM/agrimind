import { MapPinned, Sprout, TrendingUp } from 'lucide-react'
import { parcelOutlines } from '@/modules/field-intelligence/model/shumen-region.ts'
import { getFieldKpis, getParcelNdvi } from '@/modules/fields/model/field-kpis.ts'
import { useShellStore } from '@/shared/lib/shell-store.ts'

export function FieldsCommandPanel() {
  const selectedParcelId = useShellStore((state) => state.selectedParcelId)
  const setSelectedParcelId = useShellStore((state) => state.setSelectedParcelId)
  const searchQuery = useShellStore((state) => state.searchQuery)
  const selectedParcel = parcelOutlines.find((parcel) => parcel.id === selectedParcelId) ?? parcelOutlines[0]
  const selectedNdvi = getParcelNdvi(selectedParcel?.id ?? null)
  const kpis = getFieldKpis()
  const healthBand = (selectedNdvi ?? 0) >= 0.7 ? 'Стабилно' : (selectedNdvi ?? 0) >= 0.6 ? 'Наблюдение' : 'Намеса'
  const normalizedQuery = searchQuery.trim().toLowerCase()
  const visibleParcels = normalizedQuery
    ? parcelOutlines.filter((parcel) =>
        [parcel.name, parcel.id, parcel.crop].some((value) => value.toLowerCase().includes(normalizedQuery)),
      )
    : parcelOutlines

  return (
    <section className="pointer-events-auto flex h-full max-h-[clamp(236px,36svh,520px)] min-h-[228px] flex-col overflow-hidden rounded-[1.2rem] border border-white/55 bg-white/56 p-2.5 shadow-[0_14px_32px_rgba(59,130,246,0.12)] backdrop-blur-xl sm:p-3 xl:max-h-[min(66svh,620px)] xl:min-h-[min(300px,40svh)] [@media(max-height:800px)]:max-h-[min(58svh,500px)] [@media(max-height:800px)]:min-h-[220px] [@media(max-height:800px)]:p-2 [@media(max-height:700px)]:max-h-[min(52svh,420px)] [@media(max-height:700px)]:min-h-[200px] [@media(max-height:700px)]:rounded-[1rem] [@media(max-height:700px)]:p-1.5">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-[11px] uppercase tracking-[0.22em] text-blue-700">Модул Полета</p>
          <h3 className="mt-1 text-sm font-semibold text-slate-900">Табло за парцели</h3>
        </div>
        <MapPinned className="h-4 w-4 text-blue-600" />
      </div>

      <div className="mt-2 grid gap-1 sm:grid-cols-3 [@media(max-height:800px)]:hidden">
        {kpis.map((kpi, index) => (
          <div key={kpi.label} className={[
            'rounded-[0.95rem] border px-2 py-1.5',
            index === 0 ? 'border-white/55 bg-blue-50/46' : 'border-white/40 bg-blue-50/28',
          ].join(' ')}>
            <p className="text-[10px] uppercase tracking-[0.16em] text-blue-700">{kpi.label}</p>
            <p className="mt-0.5 text-xs font-semibold text-slate-800 sm:text-sm">{kpi.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-2 grid min-h-0 flex-1 gap-1.5 lg:grid-cols-[1fr_0.9fr] [@media(max-height:800px)]:mt-1.5 [@media(max-height:700px)]:mt-1 [@media(max-height:700px)]:grid-cols-1">
        <div className="min-h-0">
          <div className="flex items-center justify-between gap-3">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Списък с полета</p>
            <span className="rounded-full border border-white/55 bg-blue-50/42 px-2 py-1 text-[10px] uppercase tracking-[0.2em] text-blue-700">
              Жива синхр.
            </span>
          </div>
          <div className="mt-2 grid max-h-[min(17svh,200px)] gap-1 overflow-auto pr-1 sm:max-h-[min(19svh,220px)] xl:max-h-none xl:flex-1 [@media(max-height:800px)]:max-h-[min(16svh,170px)] [@media(max-height:700px)]:max-h-[min(15svh,140px)]">
            {visibleParcels.map((parcel) => {
              const isActive = selectedParcel?.id === parcel.id

              return (
                <button
                  type="button"
                  key={parcel.id}
                  onClick={() => setSelectedParcelId(parcel.id)}
                  className={[
                    'rounded-[0.9rem] border px-2.5 py-1.5 text-left text-xs transition sm:text-sm',
                    isActive
                      ? 'border-blue-300 bg-blue-50/74 text-slate-900'
                      : 'border-white/55 bg-white/45 text-slate-600 hover:border-blue-200 hover:bg-white/62 hover:text-slate-800',
                  ].join(' ')}
                >
                  <p className="font-medium">{parcel.name}</p>
                  <p className="mt-1 text-xs text-slate-500">
                    {parcel.crop} · {parcel.area}
                  </p>
                </button>
              )
            })}
            {visibleParcels.length === 0 ? (
              <div className="rounded-[0.9rem] border border-dashed border-white/55 bg-white/36 px-2.5 py-3 text-xs text-slate-500">
                Няма полета за търсене: {searchQuery}
              </div>
            ) : null}
          </div>
        </div>

        <article className="rounded-[1rem] border border-white/55 bg-blue-50/32 p-2.5 [@media(max-height:800px)]:p-2 [@media(max-height:700px)]:hidden">
          <div className="flex items-center gap-2 text-blue-700">
            <TrendingUp className="h-4 w-4" />
            <p className="text-xs uppercase tracking-[0.2em]">Избрано поле</p>
          </div>
          <p className="mt-1.5 text-sm font-semibold text-slate-900">{selectedParcel?.name}</p>
          <div className="mt-2 space-y-1 text-xs text-slate-600 sm:text-sm">
            <p>
              Култура: <span className="text-slate-900">{selectedParcel?.crop}</span>
            </p>
            <p>
              Площ: <span className="text-slate-900">{selectedParcel?.area}</span>
            </p>
            <p>
              NDVI индекс: <span className="text-slate-900">{selectedNdvi?.toFixed(2) ?? 'няма данни'}</span>
            </p>
            <p>
              Състояние: <span className="text-slate-900">{healthBand}</span>
            </p>
          </div>
          <div className="mt-2 rounded-[0.9rem] border border-white/60 bg-blue-100/48 px-2.5 py-2 text-[11px] leading-5 text-blue-800 sm:text-xs">
            <div className="mb-1 flex items-center gap-1.5">
              <Sprout className="h-3.5 w-3.5" />
              Препоръка
            </div>
            Приоритизирай оглед за полета с NDVI под 0.60 и сравни с поливния график преди изпращане на екип.
          </div>
          <div className="mt-2 rounded-[0.9rem] border border-white/55 bg-white/44 px-2.5 py-2 text-[11px] leading-5 text-slate-600 sm:text-xs">
            SLA: триаж до 45 мин, изпращане на екип до 2 ч, повторна проверка до 24 ч.
          </div>
        </article>
      </div>
    </section>
  )
}
