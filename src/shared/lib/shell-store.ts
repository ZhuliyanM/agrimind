import { create } from 'zustand'

export type MapLayerMode = 'sentinel' | 'ndvi'

type ShellState = {
  searchQuery: string
  mapLayer: MapLayerMode
  selectedParcelId: string | null
  setSearchQuery: (value: string) => void
  setMapLayer: (value: MapLayerMode) => void
  setSelectedParcelId: (value: string | null) => void
}

export const useShellStore = create<ShellState>((set) => ({
  searchQuery: '',
  mapLayer: 'sentinel',
  selectedParcelId: null,
  setSearchQuery: (value) => set({ searchQuery: value }),
  setMapLayer: (value) => set({ mapLayer: value }),
  setSelectedParcelId: (value) => set({ selectedParcelId: value }),
}))