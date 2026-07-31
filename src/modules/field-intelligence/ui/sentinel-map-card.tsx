import 'leaflet/dist/leaflet.css'
import { Layers3, MapPinned, Satellite, Sprout, Waypoints } from 'lucide-react'
import { Circle, MapContainer, Polygon, Rectangle, TileLayer, Tooltip } from 'react-leaflet'
import {
  fieldSignals,
  heroSignals,
  parcelOutlines,
  readinessStats,
  sentinelAttribution,
  sentinelTileUrl,
  shumenBounds,
  shumenCenter,
} from '@/modules/field-intelligence/model/shumen-region.ts'

export function SentinelMapCard() {
  return (
    <section className="overflow-hidden rounded-[2rem] border border-white/10 bg-stone-950/70 shadow-2xl shadow-black/20">
      <div className="flex flex-col gap-5 border-b border-white/10 px-6 py-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-emerald-200/75">Field intelligence</p>
          <h2 className="mt-3 text-3xl font-semibold text-white">Sentinel workspace anchored on Shumen</h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-stone-400">
            This is the visual core of the product direction: a large operational map that can accumulate
            agronomic layers, irrigation overlays, machine execution, and AI recommendations around one place.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          {readinessStats.map((item) => (
            <div key={item.label} className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-4">
              <p className="text-[11px] uppercase tracking-[0.28em] text-stone-500">{item.label}</p>
              <p className="mt-2 text-sm font-medium text-white">{item.value}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="relative">
        <MapContainer
          center={shumenCenter}
          zoom={11}
          scrollWheelZoom={true}
          className="h-[72svh] min-h-[640px] w-full bg-stone-950"
        >
          <TileLayer attribution={sentinelAttribution} url={sentinelTileUrl} />
          <Rectangle bounds={shumenBounds} pathOptions={{ color: '#86efac', weight: 2, fillOpacity: 0.06 }} />
          {parcelOutlines.map((parcel) => (
            <Polygon
              key={parcel.id}
              positions={parcel.polygon}
              pathOptions={{ color: '#facc15', weight: 2, fillColor: '#facc15', fillOpacity: 0.14 }}
            >
              <Tooltip direction="center" opacity={1} permanent={false}>
                <div className="space-y-1">
                  <p className="text-sm font-semibold">{parcel.name}</p>
                  <p className="text-xs">{parcel.crop} · {parcel.area}</p>
                </div>
              </Tooltip>
            </Polygon>
          ))}
          {fieldSignals.map((signal) => (
            <Circle
              key={signal.label}
              center={signal.position}
              radius={1400}
              pathOptions={{ color: '#bef264', fillColor: '#4ade80', fillOpacity: 0.24, weight: 1 }}
            >
              <Tooltip direction="top" offset={[0, -8]} opacity={1}>
                <div className="max-w-[220px] space-y-1">
                  <p className="text-sm font-semibold">{signal.label}</p>
                  <p className="text-xs leading-5">{signal.note}</p>
                </div>
              </Tooltip>
            </Circle>
          ))}
        </MapContainer>

        <div className="pointer-events-none absolute inset-x-5 top-5 grid gap-4 lg:left-6 lg:right-6 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="rounded-[2rem] border border-white/10 bg-stone-950/78 px-5 py-5 backdrop-blur">
            <div className="flex items-center gap-2 text-emerald-200">
              <Waypoints className="h-4 w-4" />
              <span className="text-xs uppercase tracking-[0.28em]">Map-first hero</span>
            </div>
            <h3 className="mt-3 max-w-2xl text-3xl font-semibold tracking-[-0.05em] text-white lg:text-4xl">
              Start the product from the land itself: Sentinel imagery, parcels, and actions around Shumen.
            </h3>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-stone-300">
              This interface now opens with the dominant operating surface. Future agronomy, irrigation,
              scouting, and execution modules should plug into this map instead of replacing it.
            </p>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {heroSignals.map((signal) => (
                <div key={signal.label} className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-4">
                  <p className="text-[11px] uppercase tracking-[0.28em] text-stone-500">{signal.label}</p>
                  <p className="mt-2 text-sm font-medium text-white">{signal.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-3 sm:max-w-sm sm:justify-self-end">
            <div className="rounded-2xl border border-white/10 bg-stone-950/80 px-4 py-4 backdrop-blur">
              <div className="flex items-center gap-2 text-emerald-200">
                <MapPinned className="h-4 w-4" />
                <span className="text-xs uppercase tracking-[0.28em]">Demo region</span>
              </div>
              <p className="mt-2 text-lg font-semibold text-white">Shumen, Northeastern Bulgaria</p>
              <p className="mt-2 text-sm leading-6 text-stone-400">
                Positioned as the first operational territory for map-first agronomy, water, and execution modules.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-stone-950/80 px-4 py-4 backdrop-blur">
              <div className="flex items-center gap-2 text-amber-200">
                <Sprout className="h-4 w-4" />
                <span className="text-xs uppercase tracking-[0.28em]">Parcel samples</span>
              </div>
              <p className="mt-2 text-sm font-medium text-white">3 example production blocks</p>
              <p className="mt-2 text-sm leading-6 text-stone-400">
                Wheat, sunflower, and maize parcels are outlined directly on the map to anchor future workflows.
              </p>
            </div>
          </div>
        </div>

        <div className="pointer-events-none absolute left-5 bottom-5 grid gap-3 sm:max-w-sm">
          <div className="rounded-2xl border border-white/10 bg-stone-950/80 px-4 py-4 backdrop-blur">
            <div className="flex items-center gap-2 text-emerald-200">
              <Satellite className="h-4 w-4" />
              <span className="text-xs uppercase tracking-[0.28em]">Live design focus</span>
            </div>
            <p className="mt-2 text-sm font-medium text-white">Keep the map as the opening move.</p>
            <p className="mt-2 text-sm leading-6 text-stone-400">
              Operators should land on territory, parcels, and alerts first, then drill into modules and workflows.
            </p>
          </div>
        </div>

        <div className="pointer-events-none absolute bottom-5 right-5 grid gap-3 sm:max-w-sm">
          <div className="rounded-2xl border border-white/10 bg-stone-950/80 px-4 py-4 backdrop-blur">
            <div className="flex items-center gap-2 text-emerald-200">
              <Layers3 className="h-4 w-4" />
              <span className="text-xs uppercase tracking-[0.28em]">Design intent</span>
            </div>
            <p className="mt-2 text-sm leading-6 text-stone-400">
              Keep the map dominant. Let future modules attach contextual panels, automation, and analytics around it.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}