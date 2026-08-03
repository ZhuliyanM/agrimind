export type FieldEntry = {
  id: number
  field_id: string
  content: string
  created_at: string
  updated_at: string
}

export type FieldEntriesResponse = {
  items: FieldEntry[]
}

function getApiBaseUrl() {
  return import.meta.env.VITE_API_BASE_URL?.trim() || 'http://127.0.0.1:8000'
}

async function requestJson<T>(input: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${getApiBaseUrl()}${input}`, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...(init?.headers ?? {}),
    },
    ...init,
  })

  if (!response.ok) {
    throw new Error(`Python fields request failed with status ${response.status}`)
  }

  return response.json() as Promise<T>
}

export function fetchFieldJournals(fieldId: string): Promise<FieldEntriesResponse> {
  return requestJson<FieldEntriesResponse>(`/api/fields/${fieldId}/journals`, { method: 'GET' })
}

export function createFieldJournal(fieldId: string, content: string): Promise<FieldEntry> {
  return requestJson<FieldEntry>(`/api/fields/${fieldId}/journals`, {
    method: 'POST',
    body: JSON.stringify({ content }),
  })
}

export function updateFieldJournal(fieldId: string, entryId: number, content: string): Promise<FieldEntry> {
  return requestJson<FieldEntry>(`/api/fields/${fieldId}/journals/${entryId}`, {
    method: 'PUT',
    body: JSON.stringify({ content }),
  })
}

export function deleteFieldJournal(fieldId: string, entryId: number): Promise<{ ok: boolean; id: number }> {
  return requestJson<{ ok: boolean; id: number }>(`/api/fields/${fieldId}/journals/${entryId}`, {
    method: 'DELETE',
  })
}

export function fetchFieldHistory(fieldId: string): Promise<FieldEntriesResponse> {
  return requestJson<FieldEntriesResponse>(`/api/fields/${fieldId}/history`, { method: 'GET' })
}

export function createFieldHistory(fieldId: string, content: string): Promise<FieldEntry> {
  return requestJson<FieldEntry>(`/api/fields/${fieldId}/history`, {
    method: 'POST',
    body: JSON.stringify({ content }),
  })
}

export function updateFieldHistory(fieldId: string, entryId: number, content: string): Promise<FieldEntry> {
  return requestJson<FieldEntry>(`/api/fields/${fieldId}/history/${entryId}`, {
    method: 'PUT',
    body: JSON.stringify({ content }),
  })
}

export function deleteFieldHistory(fieldId: string, entryId: number): Promise<{ ok: boolean; id: number }> {
  return requestJson<{ ok: boolean; id: number }>(`/api/fields/${fieldId}/history/${entryId}`, {
    method: 'DELETE',
  })
}
