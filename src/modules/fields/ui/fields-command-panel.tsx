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
  const healthBand = (selectedNdvi ?? 0) >= 0.7 ? 'Strong' : (selectedNdvi ?? 0) >= 0.6 ? 'Watch' : 'Intervene'

  return (
    <section className="pointer-events-auto rounded-[1.5rem] border border-white/20 bg-stone-950/84 p-4 backdrop-blur-2xl sm:p-5">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-[11px] uppercase tracking-[0.26em] text-emerald-200/75">Fields module</p>
          <h3 className="mt-1 text-lg font-semibold text-white">Parcel dashboard</h3>
        </div>
        <MapPinned className="h-4 w-4 text-emerald-200" />
      </div>

      <div className="mt-4 grid gap-2 sm:grid-cols-3">
        {kpis.map((kpi) => (
          <div key={kpi.label} className="rounded-xl border border-white/10 bg-white/[0.03] px-3 py-3">
            <p className="text-[10px] uppercase tracking-[0.22em] text-stone-500">{kpi.label}</p>
            <p className="mt-1 text-sm font-semibold text-white">{kpi.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <div className="flex items-center justify-between gap-3">
            <p className="text-xs uppercase tracking-[0.24em] text-stone-500">Field list</p>
            <span className="rounded-full border border-white/10 bg-white/[0.03] px-2 py-1 text-[10px] uppercase tracking-[0.2em] text-stone-400">
              Live sync
            </span>
          </div>
          <div className="mt-2 grid max-h-[190px] gap-2 overflow-auto pr-1">
            {parcelOutlines.map((parcel) => {
              const isActive = selectedParcel?.id === parcel.id

              return (
                <button
                  type="button"
                  key={parcel.id}
                  onClick={() => setSelectedParcelId(parcel.id)}
                  className={[
                    'rounded-xl border px-3 py-3 text-left text-sm transition',
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

        <article className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <div className="flex items-center gap-2 text-lime-200">
            <TrendingUp className="h-4 w-4" />
            <p className="text-xs uppercase tracking-[0.24em]">Selected field</p>
          </div>
          <p className="mt-2 text-base font-semibold text-white">{selectedParcel?.name}</p>
          <div className="mt-3 space-y-2 text-sm text-stone-300">
            <p>
              Crop profile: <span className="text-white">{selectedParcel?.crop}</span>
            </p>
            <p>
              Registered area: <span className="text-white">{selectedParcel?.area}</span>
            </p>
            <p>
              NDVI indicator: <span className="text-white">{selectedNdvi?.toFixed(2) ?? 'n/a'}</span>
            </p>
            <p>
              Health band: <span className="text-white">{healthBand}</span>
            </p>
          </div>
          <div className="mt-4 rounded-xl border border-lime-300/20 bg-lime-300/10 px-3 py-3 text-xs leading-5 text-lime-100">
            <div className="mb-1 flex items-center gap-1.5">
              <Sprout className="h-3.5 w-3.5" />
              Recommendation
            </div>
            Prioritize scouting for fields with NDVI below 0.60 and compare with irrigation calendar before dispatch.
          </div>
          <div className="mt-3 rounded-xl border border-white/10 bg-white/[0.02] px-3 py-3 text-xs leading-5 text-stone-300">
            SLA target: triage within 45 min, field dispatch under 2h, follow-up imagery check in 24h.
          </div>
        </article>
      </div>
    </section>
  )
}
