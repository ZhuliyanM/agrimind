export const shumenCenter: [number, number] = [43.2713, 26.936]

export const shumenBounds: [[number, number], [number, number]] = [
  [43.182, 26.73],
  [43.382, 27.118],
]

export const sentinelTileUrl = 'https://tiles.maps.eox.at/wmts/1.0.0/s2cloudless-2021_3857/default/g/{z}/{y}/{x}.jpg'

export const sentinelAttribution =
  '&copy; Sentinel-2 cloudless by EOX IT Services GmbH, contains modified Copernicus Sentinel data 2021'

export const fieldSignals = [
  {
    label: 'North cooperative belt',
    position: [43.323, 26.913] as [number, number],
    note: 'Suitable for crop vigor and parcel comparison modules.',
  },
  {
    label: 'Shumen east parcels',
    position: [43.279, 27.032] as [number, number],
    note: 'Good anchor point for irrigation, field notes, and task orchestration.',
  },
  {
    label: 'South-west trial blocks',
    position: [43.223, 26.792] as [number, number],
    note: 'Use for scouting workflows, benchmarking, and AI-assisted recommendations.',
  },
]

export const readinessStats = [
  { label: 'Layer focus', value: 'Sentinel-2 cloudless' },
  { label: 'Demo region', value: 'Shumen agricultural zone' },
  { label: 'Expansion model', value: 'Modular SaaS workspace' },
]

export const readinessModules = [
  {
    title: 'Crop performance lane',
    copy: 'Designed to host NDVI, stress maps, field scouting, and seasonal observations.',
  },
  {
    title: 'Irrigation control lane',
    copy: 'Ready for pump dashboards, water schedules, rainfall overlays, and anomaly warnings.',
  },
  {
    title: 'Operations lane',
    copy: 'Prepared for machinery tasks, labor boards, logistics, and automated alerts.',
  },
]