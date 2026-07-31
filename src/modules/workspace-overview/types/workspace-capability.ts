import type { LucideIcon } from 'lucide-react'

export type WorkspaceCapability = {
  title: string
  copy: string
  icon: LucideIcon
  area: 'agronomy' | 'water' | 'operations' | 'finance' | 'data' | 'automation'
  stage: 'Now' | 'Next' | 'Later'
}