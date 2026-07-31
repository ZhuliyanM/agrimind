import { Database, Radar, ShieldEllipsis } from 'lucide-react'
import type { WorkspaceCapability } from '@/modules/workspace-overview/types/workspace-capability.ts'

const workspaceCapabilities: WorkspaceCapability[] = [
  {
    title: 'Modules',
    copy: 'Business capabilities live in isolated module folders with their own UI, model, API, and routes.',
    icon: Radar,
    area: 'modules',
  },
  {
    title: 'State',
    copy: 'TanStack Query owns server state while Zustand keeps shell state local and explicit.',
    icon: ShieldEllipsis,
    area: 'state',
  },
  {
    title: 'Integrations',
    copy: 'Supabase clients and repositories sit behind a single gateway for auth, data, storage, and realtime.',
    icon: Database,
    area: 'integrations',
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