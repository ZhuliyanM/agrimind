import { create } from 'zustand'

export type MapLayerMode = 'sentinel' | 'ndvi'
export type DesktopPanelMode = 'left' | 'right' | null
export type FieldsSectionMode = 'overview' | 'journals' | 'boundaries' | 'history'

type ShellState = {
  searchQuery: string
  mapLayer: MapLayerMode
  selectedParcelId: string | null
  activeDesktopPanel: DesktopPanelMode
  activeFieldsSection: FieldsSectionMode
  setSearchQuery: (value: string) => void
  setMapLayer: (value: MapLayerMode) => void
  setSelectedParcelId: (value: string | null) => void
  setActiveDesktopPanel: (value: DesktopPanelMode) => void
  setActiveFieldsSection: (value: FieldsSectionMode) => void
}

export const useShellStore = create<ShellState>((set) => ({
  searchQuery: '',
  mapLayer: 'sentinel',
  selectedParcelId: null,
  activeDesktopPanel: null,
  activeFieldsSection: 'overview',
  setSearchQuery: (value) => set({ searchQuery: value }),
  setMapLayer: (value) => set({ mapLayer: value }),
  setSelectedParcelId: (value) => set({ selectedParcelId: value }),
  setActiveDesktopPanel: (value) => set({ activeDesktopPanel: value }),
  setActiveFieldsSection: (value) => set({ activeFieldsSection: value }),
}))