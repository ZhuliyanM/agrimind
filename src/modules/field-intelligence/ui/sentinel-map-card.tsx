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
  if (value >= 0.72) return '#16a34a'
  if (value >= 0.65) return '#65a30d'
  if (value >= 0.58) return '#eab308'
  return '#f97316'
}

export function SentinelMapCard() {
  const mapLayer = useShellStore((state) => state.mapLayer)
  const selectedParcelId = useShellStore((state) => state.selectedParcelId)
  const setSelectedParcelId = useShellStore((state) => state.setSelectedParcelId)

  return (
    <section className="h-full w-full overflow-hidden rounded-[0.9rem]">
      <div className="relative h-full">
        <MapContainer
          center={shumenCenter}
          zoom={11}
          scrollWheelZoom={true}
          className="h-full w-full bg-stone-950"
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
      </div>
    </section>
  )
}