import type { LucideIcon } from 'lucide-react'

export type WorkspaceCapability = {
  title: string
  copy: string
  icon: LucideIcon
  area: 'modules' | 'state' | 'integrations'
}