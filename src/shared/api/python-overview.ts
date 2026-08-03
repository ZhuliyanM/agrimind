export type OverviewStat = {
  label: string
  value: string
}

export type PythonOverview = {
  source: string
  region: string
  stats: OverviewStat[]
  recommendation: string
  status: string
}

function getApiBaseUrl() {
  return import.meta.env.VITE_API_BASE_URL?.trim() || 'http://127.0.0.1:8000'
}

export async function fetchPythonOverview(): Promise<PythonOverview> {
  const response = await fetch(`${getApiBaseUrl()}/api/overview`, {
    headers: {
      Accept: 'application/json',
    },
  })

  if (!response.ok) {
    throw new Error(`Python API request failed with status ${response.status}`)
  }

  return response.json() as Promise<PythonOverview>
}
