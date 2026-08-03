import 'leaflet/dist/leaflet.css'
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
  if (value >= 0.72) return '#2563eb'
  if (value >= 0.65) return '#0ea5e9'
  if (value >= 0.58) return '#38bdf8'
  return '#93c5fd'
}

export function SentinelMapCard() {
  const mapLayer = useShellStore((state) => state.mapLayer)
  const selectedParcelId = useShellStore((state) => state.selectedParcelId)
  const setSelectedParcelId = useShellStore((state) => state.setSelectedParcelId)
  const selectedParcel = parcelOutlines.find((parcel) => parcel.id === selectedParcelId) ?? parcelOutlines[0]

  return (
    <section className="h-full w-full overflow-hidden bg-white">
      <div className="relative h-full">
        <div className="pointer-events-none absolute left-3 top-3 z-[450] rounded-[1rem] border border-white/55 bg-white/44 px-2.5 py-2 shadow-[0_12px_26px_rgba(59,130,246,0.12)] backdrop-blur-xl">
          <p className="text-[10px] uppercase tracking-[0.14em] text-slate-500">Избран парцел</p>
          <p className="mt-1 text-xs font-semibold text-slate-900">{selectedParcel?.name}</p>
          <p className="mt-0.5 text-[11px] text-slate-500">{selectedParcel?.crop} · {selectedParcel?.area}</p>
          <div className="mt-2 flex items-center gap-2 text-[10px] text-slate-500">
            <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-blue-600" /> Активен</span>
            <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-sky-300" /> Наблюдение</span>
          </div>
        </div>
        <div className="pointer-events-none absolute right-3 top-3 z-[450] rounded-[1rem] border border-white/55 bg-white/44 px-2.5 py-2 text-right shadow-[0_12px_26px_rgba(59,130,246,0.12)] backdrop-blur-xl">
          <p className="text-[10px] uppercase tracking-[0.14em] text-slate-500">Режим</p>
          <p className="mt-1 text-xs font-semibold text-slate-900">{mapLayer === 'ndvi' ? 'NDVI Анализ' : 'Sentinel RGB'}</p>
          <p className="mt-0.5 text-[11px] text-slate-500">Шумен, България</p>
        </div>
        <MapContainer
          center={shumenCenter}
          zoom={11}
          scrollWheelZoom={true}
          className="h-full w-full bg-slate-100"
        >
          <TileLayer attribution={sentinelAttribution} url={sentinelTileUrl} />
          {mapLayer === 'ndvi' ? (
            <TileLayer
              attribution={ndviAttribution}
              url={ndviTileUrl.replace('{time}', ndviDefaultTime)}
              opacity={0.38}
            />
          ) : null}
          <Rectangle bounds={shumenBounds} pathOptions={{ color: '#2563eb', weight: 2, fillOpacity: 0.05 }} />
          {parcelOutlines.map((parcel) => (
            <Polygon
              key={parcel.id}
              positions={parcel.polygon}
              eventHandlers={{ click: () => setSelectedParcelId(parcel.id) }}
              pathOptions={
                mapLayer === 'ndvi'
                  ? {
                      color: selectedParcelId === parcel.id ? '#0f172a' : '#1d4ed8',
                      weight: selectedParcelId === parcel.id ? 3 : 1.6,
                      fillColor: getNdviColor(ndviByParcel[parcel.id] ?? 0.6),
                      fillOpacity: selectedParcelId === parcel.id ? 0.5 : 0.35,
                    }
                  : {
                      color: selectedParcelId === parcel.id ? '#1d4ed8' : '#60a5fa',
                      weight: selectedParcelId === parcel.id ? 3 : 2,
                      fillColor: selectedParcelId === parcel.id ? '#2563eb' : '#93c5fd',
                      fillOpacity: selectedParcelId === parcel.id ? 0.28 : 0.16,
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
              pathOptions={{ color: '#2563eb', fillColor: '#60a5fa', fillOpacity: 0.2, weight: 1 }}
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
      </div>
    </section>
  )
}