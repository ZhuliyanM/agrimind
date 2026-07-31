import 'leaflet/dist/leaflet.css'
import { Layers3, MapPinned, Satellite, Sprout } from 'lucide-react'
import { Circle, MapContainer, Polygon, Rectangle, TileLayer, Tooltip } from 'react-leaflet'
import {
  fieldSignals,
  ndviAttribution,
  ndviDefaultTime,
  ndviTileUrl,
  parcelOutlines,
  sentinelAttribution,
  sentinelTileUrl,
  shumenBounds,
  shumenCenter,
} from '@/modules/field-intelligence/model/shumen-region.ts'
import { useShellStore } from '@/shared/lib/shell-store.ts'

const ndviByParcel: Record<string, number> = {
  '234183485': 0.78,
  '234183486': 0.71,
  '258599123': 0.63,
  '313304850': 0.59,
  '313304851': 0.74,
  '314432044': 0.66,
  '315658111': 0.53,
  '316439803': 0.69,
}

function getNdviColor(value: number) {
  if (value >= 0.72) return '#16a34a'
  if (value >= 0.65) return '#65a30d'
  if (value >= 0.58) return '#eab308'
  return '#f97316'
}

export function SentinelMapCard() {
  const mapLayer = useShellStore((state) => state.mapLayer)
  const setMapLayer = useShellStore((state) => state.setMapLayer)
  const selectedParcelId = useShellStore((state) => state.selectedParcelId)
  const setSelectedParcelId = useShellStore((state) => state.setSelectedParcelId)

  return (
    <section className="relative h-full w-full">
      <div className="absolute right-3 top-[124px] z-[800] grid gap-2 sm:right-5">
        <button
          type="button"
          onClick={() => setMapLayer('sentinel')}
          className={[
            'flex items-center gap-2 rounded-full border px-4 py-2 text-xs uppercase tracking-[0.24em] backdrop-blur',
            mapLayer === 'sentinel'
              ? 'border-emerald-300/70 bg-emerald-300/20 text-emerald-100'
              : 'border-white/20 bg-stone-950/70 text-stone-300 hover:text-white',
          ].join(' ')}
        >
          <Satellite className="h-3.5 w-3.5" /> Sentinel RGB
        </button>
        <button
          type="button"
          onClick={() => setMapLayer('ndvi')}
          className={[
            'flex items-center gap-2 rounded-full border px-4 py-2 text-xs uppercase tracking-[0.24em] backdrop-blur',
            mapLayer === 'ndvi'
              ? 'border-lime-300/70 bg-lime-300/20 text-lime-100'
              : 'border-white/20 bg-stone-950/70 text-stone-300 hover:text-white',
          ].join(' ')}
        >
          <Layers3 className="h-3.5 w-3.5" /> NDVI
        </button>
      </div>

      <div className="relative h-full">
        <MapContainer
          center={shumenCenter}
          zoom={11}
          scrollWheelZoom={true}
          className="h-screen w-full bg-stone-950"
        >
          <TileLayer attribution={sentinelAttribution} url={sentinelTileUrl} />
          {mapLayer === 'ndvi' ? (
            <TileLayer
              attribution={ndviAttribution}
              url={ndviTileUrl.replace('{time}', ndviDefaultTime)}
              opacity={0.42}
            />
          ) : null}
          <Rectangle bounds={shumenBounds} pathOptions={{ color: '#86efac', weight: 2, fillOpacity: 0.06 }} />
          {parcelOutlines.map((parcel) => (
            <Polygon
              key={parcel.id}
              positions={parcel.polygon}
              eventHandlers={{ click: () => setSelectedParcelId(parcel.id) }}
              pathOptions={
                mapLayer === 'ndvi'
                  ? {
                      color: selectedParcelId === parcel.id ? '#ffffff' : '#0f172a',
                      weight: selectedParcelId === parcel.id ? 3 : 1.6,
                      fillColor: getNdviColor(ndviByParcel[parcel.id] ?? 0.6),
                      fillOpacity: selectedParcelId === parcel.id ? 0.52 : 0.36,
                    }
                  : {
                      color: selectedParcelId === parcel.id ? '#22c55e' : '#facc15',
                      weight: selectedParcelId === parcel.id ? 3 : 2,
                      fillColor: selectedParcelId === parcel.id ? '#22c55e' : '#facc15',
                      fillOpacity: selectedParcelId === parcel.id ? 0.3 : 0.14,
                    }
              }
            >
              <Tooltip direction="center" opacity={1} permanent={false}>
                <div className="space-y-1">
                  <p className="text-sm font-semibold">{parcel.name}</p>
                  <p className="text-xs">
                    {parcel.crop} · {parcel.area} · NDVI {(ndviByParcel[parcel.id] ?? 0).toFixed(2)}
                  </p>
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

        <div className="pointer-events-none absolute left-3 top-[124px] z-[750] grid gap-3 sm:left-5 sm:max-w-[410px]">
          <div className="rounded-[1.7rem] border border-white/20 bg-stone-950/78 px-5 py-4 backdrop-blur-2xl">
            <div className="flex items-center gap-2 text-emerald-200">
              <MapPinned className="h-4 w-4" />
              <span className="text-xs uppercase tracking-[0.28em]">Shumen geospatial cockpit</span>
            </div>
            <h2 className="mt-2 text-2xl font-semibold text-white">Fullscreen map with hover command surfaces</h2>
            <p className="mt-2 text-sm leading-6 text-stone-300">
              Real OSM farmland boundaries are clickable. Switch to NDVI mode to inspect vegetation vigor by parcel.
            </p>
          </div>
        </div>

        <div className="pointer-events-none absolute bottom-4 right-4 z-[700] rounded-2xl border border-white/20 bg-stone-950/80 px-4 py-3 backdrop-blur">
          <div className="flex items-center gap-2 text-emerald-200">
            <Sprout className="h-4 w-4" />
            <span className="text-xs uppercase tracking-[0.26em]">NDVI mode</span>
          </div>
          <p className="mt-1 text-xs leading-5 text-stone-300">
            NDVI layer source: NASA GIBS MODIS Terra 16-day. Parcel shading is tuned for at-a-glance decision support.
          </p>
        </div>
      </div>
    </section>
  )
}