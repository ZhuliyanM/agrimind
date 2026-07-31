import { parcelOutlines } from '@/modules/field-intelligence/model/shumen-region.ts'

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

export function getFieldKpis() {
  const averageNdvi =
    parcelOutlines.reduce((sum, parcel) => sum + (ndviByParcel[parcel.id] ?? 0.6), 0) /
    Math.max(parcelOutlines.length, 1)

  return [
    {
      label: 'Active fields',
      value: String(parcelOutlines.length),
    },
    {
      label: 'Average NDVI',
      value: averageNdvi.toFixed(2),
    },
    {
      label: 'Selected region',
      value: 'Shumen',
    },
  ]
}

export function getParcelNdvi(parcelId: string | null) {
  if (!parcelId) {
    return null
  }

  return ndviByParcel[parcelId] ?? null
}
