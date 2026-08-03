export type ChatAction =
  | { type: 'navigate'; path: string }
  | { type: 'open_panel'; panel: 'left' | 'right' }
  | { type: 'close_panels' }
  | { type: 'open_fields_section'; section: 'overview' | 'journals' | 'boundaries' | 'history' }
  | { type: 'set_map_layer'; value: 'sentinel' | 'ndvi' }
  | { type: 'select_parcel'; parcelId: string }
  | { type: 'set_search_query'; value: string }

export type ChatReply = {
  message: string
  actions: ChatAction[]
}

function getApiBaseUrl() {
  return import.meta.env.VITE_API_BASE_URL?.trim() || 'http://127.0.0.1:8000'
}

export async function sendChatCommand(message: string): Promise<ChatReply> {
  const response = await fetch(`${getApiBaseUrl()}/api/chat`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({ message }),
  })

  if (!response.ok) {
    throw new Error(`Python chat request failed with status ${response.status}`)
  }

  return response.json() as Promise<ChatReply>
}
