import { create } from 'zustand'

type ShellState = {
  searchQuery: string
  setSearchQuery: (value: string) => void
}

export const useShellStore = create<ShellState>((set) => ({
  searchQuery: '',
  setSearchQuery: (value) => set({ searchQuery: value }),
}))