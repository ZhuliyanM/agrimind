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

export const parcelOutlines = [
  {
    id: 'parcel-a',
    name: 'Shumen North Wheat Block',
    crop: 'Wheat',
    area: '184 ha',
    polygon: [
      [43.325, 26.885],
      [43.337, 26.911],
      [43.322, 26.939],
      [43.299, 26.928],
      [43.303, 26.892],
    ] as [number, number][],
  },
  {
    id: 'parcel-b',
    name: 'East Sunflower Corridor',
    crop: 'Sunflower',
    area: '126 ha',
    polygon: [
      [43.284, 26.989],
      [43.296, 27.026],
      [43.279, 27.051],
      [43.252, 27.028],
      [43.261, 26.994],
    ] as [number, number][],
  },
  {
    id: 'parcel-c',
    name: 'South-west Maize Trial',
    crop: 'Maize',
    area: '92 ha',
    polygon: [
      [43.232, 26.767],
      [43.247, 26.805],
      [43.229, 26.824],
      [43.204, 26.804],
      [43.211, 26.774],
    ] as [number, number][],
  },
]

export const heroSignals = [
  { label: 'Observed territory', value: 'Shumen region' },
  { label: 'Satellite basis', value: 'Sentinel-2 cloudless' },
  { label: 'Design mode', value: 'Map-first SaaS workspace' },
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

export const operationalAlerts = [
  {
    title: 'Scouting queue: east parcels',
    description: 'Set up crop health review cards, pest notes, and field observations against parcel B next.',
    tone: 'attention',
  },
  {
    title: 'Irrigation readiness layer',
    description: 'The layout is ready for pump status, rainfall windows, and moisture warnings beside the map.',
    tone: 'ready',
  },
  {
    title: 'Satellite comparison workflow',
    description: 'Future temporal imagery toggles can live inside this same map frame without redesigning the shell.',
    tone: 'planned',
  },
]

export const morningBrief = [
  {
    label: 'Priority parcels',
    value: '3 active sample blocks',
  },
  {
    label: 'Imagery cadence',
    value: 'Sentinel-led overview',
  },
  {
    label: 'Next module lane',
    value: 'Irrigation control',
  },
]