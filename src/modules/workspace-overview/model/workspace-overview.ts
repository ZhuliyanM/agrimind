import { Bot, Database, Droplets, Landmark, Radar, Tractor } from 'lucide-react'
import type { WorkspaceCapability } from '@/modules/workspace-overview/types/workspace-capability.ts'

const workspaceCapabilities: WorkspaceCapability[] = [
  {
    title: 'Geo agronomy intelligence',
    copy: 'Satellite layers, field boundaries, scouting notes, and crop health signals live behind one geospatial module.',
    icon: Radar,
    area: 'agronomy',
    stage: 'Now',
  },
  {
    title: 'Irrigation operations',
    copy: 'Water scheduling, pump status, and rainfall overlays can become a standalone operating module.',
    icon: Droplets,
    area: 'water',
    stage: 'Next',
  },
  {
    title: 'Data and integration fabric',
    copy: 'Supabase, device feeds, ERP connectors, and event streams remain isolated from the UI surface.',
    icon: Database,
    area: 'data',
    stage: 'Now',
  },
  {
    title: 'Machinery and field execution',
    copy: 'Machine tasks, operator workflows, and seasonal checklists can arrive without disturbing the dashboard shell.',
    icon: Tractor,
    area: 'operations',
    stage: 'Later',
  },
  {
    title: 'Financial and subsidy layer',
    copy: 'Budgets, grants, compliance, and acreage-linked finance can sit as a dedicated revenue module.',
    icon: Landmark,
    area: 'finance',
    stage: 'Later',
  },
  {
    title: 'Automation and AI copilots',
    copy: 'Rule engines and agent workflows can automate agronomic alerts and operational responses over time.',
    icon: Bot,
    area: 'automation',
    stage: 'Next',
  },
]

export function getWorkspaceCapabilities(searchQuery: string) {
  const normalizedQuery = searchQuery.trim().toLowerCase()

  if (!normalizedQuery) {
    return workspaceCapabilities
  }

  return workspaceCapabilities.filter((capability) => {
    return [capability.title, capability.copy, capability.area].some((value) =>
      value.toLowerCase().includes(normalizedQuery),
    )
  })
}