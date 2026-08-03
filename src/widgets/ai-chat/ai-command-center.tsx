import { MessageSquare, Send, Sparkles, X } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { sendChatCommand, type ChatAction } from '@/shared/api/python-chat.ts'
import { useShellStore } from '@/shared/lib/shell-store.ts'

type ChatItem = {
  role: 'assistant' | 'user'
  text: string
}

const starterPrompts = [
  'Покажи всички полета',
  'Отвори операции',
  'Покажи NDVI картата',
  'Избери парцел 234183485',
  'Върни ме на картата',
]

export function AiCommandCenter() {
  const navigate = useNavigate()
  const location = useLocation()
  const setMapLayer = useShellStore((state) => state.setMapLayer)
  const setSelectedParcelId = useShellStore((state) => state.setSelectedParcelId)
  const setSearchQuery = useShellStore((state) => state.setSearchQuery)
  const setActiveDesktopPanel = useShellStore((state) => state.setActiveDesktopPanel)
  const setActiveFieldsSection = useShellStore((state) => state.setActiveFieldsSection)
  const [isOpen, setIsOpen] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [draft, setDraft] = useState('')
  const [items, setItems] = useState<ChatItem[]>([
    {
      role: 'assistant',
      text: 'Напиши команда като „Покажи всички полета“ или „Отвори операции“, и ще управлявам интерфейса вместо менюто.',
    },
  ])

  const sectionLabel = useMemo(() => {
    if (location.pathname.startsWith('/app')) return 'Работен режим'
    if (location.pathname.startsWith('/auth')) return 'Вход'
    return 'Начало'
  }, [location.pathname])

  const applyActions = (actions: ChatAction[]) => {
    for (const action of actions) {
      switch (action.type) {
        case 'navigate':
          navigate(action.path)
          break
        case 'open_panel':
          setActiveDesktopPanel(action.panel)
          break
        case 'close_panels':
          setActiveDesktopPanel(null)
          break
        case 'open_fields_section':
          setActiveFieldsSection(action.section)
          break
        case 'set_map_layer':
          setMapLayer(action.value)
          break
        case 'select_parcel':
          setSelectedParcelId(action.parcelId)
          break
        case 'set_search_query':
          setSearchQuery(action.value)
          break
      }
    }
  }

  const submitMessage = async (message: string) => {
    const trimmed = message.trim()

    if (!trimmed || isSubmitting) {
      return
    }

    setDraft('')
    setItems((current) => [...current, { role: 'user', text: trimmed }])
    setIsSubmitting(true)

    try {
      const reply = await sendChatCommand(trimmed)
      applyActions(reply.actions)
      setItems((current) => [...current, { role: 'assistant', text: reply.message }])
    } catch {
      setItems((current) => [
        ...current,
        {
          role: 'assistant',
          text: 'Не успях да изпълня командата през Python backend. Стартирай API-то и опитай отново.',
        },
      ])
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="pointer-events-none fixed bottom-3 right-3 z-[980] flex max-w-[min(92vw,360px)] flex-col items-end gap-2 [@media(max-height:700px)]:bottom-2 [@media(max-height:700px)]:right-2">
      {isOpen ? (
        <section className="pointer-events-auto w-[min(92vw,360px)] overflow-hidden rounded-[1.3rem] border border-white/55 bg-white/78 shadow-[0_18px_40px_rgba(37,99,235,0.18)] backdrop-blur-xl [@media(max-height:700px)]:w-[min(94vw,320px)]">
          <div className="flex items-center justify-between border-b border-blue-100/70 px-3 py-2.5">
            <div>
              <p className="text-[10px] uppercase tracking-[0.18em] text-blue-700">AI Команден Чат</p>
              <p className="mt-0.5 text-xs text-slate-500">{sectionLabel}</p>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="rounded-full border border-white/60 bg-white/60 p-1.5 text-slate-500 transition hover:text-slate-900"
              aria-label="Скрий AI чата"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="grid gap-2 px-3 py-3">
            <div className="max-h-[260px] space-y-2 overflow-auto pr-1 [@media(max-height:800px)]:max-h-[190px] [@media(max-height:700px)]:max-h-[150px]">
              {items.map((item, index) => (
                <div
                  key={`${item.role}-${index}`}
                  className={[
                    'rounded-[1rem] px-3 py-2 text-sm leading-6',
                    item.role === 'assistant'
                      ? 'bg-blue-50/70 text-slate-700'
                      : 'bg-blue-600 text-white',
                  ].join(' ')}
                >
                  {item.text}
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-1.5 [@media(max-height:700px)]:hidden">
              {starterPrompts.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  onClick={() => submitMessage(prompt)}
                  className="rounded-full border border-white/60 bg-white/64 px-2.5 py-1 text-xs text-slate-600 transition hover:bg-blue-50 hover:text-blue-700"
                >
                  {prompt}
                </button>
              ))}
            </div>

            <form
              onSubmit={(event) => {
                event.preventDefault()
                void submitMessage(draft)
              }}
              className="flex items-center gap-2 rounded-[1rem] border border-white/60 bg-white/60 px-2 py-2"
            >
              <Sparkles className="h-4 w-4 shrink-0 text-blue-600" />
              <input
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                placeholder="Напиши команда..."
                className="min-w-0 flex-1 bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
              />
              <button
                type="submit"
                disabled={isSubmitting || !draft.trim()}
                className="rounded-full bg-blue-600 p-2 text-white transition disabled:cursor-not-allowed disabled:opacity-50"
                aria-label="Изпрати команда"
              >
                <Send className="h-3.5 w-3.5" />
              </button>
            </form>
          </div>
        </section>
      ) : null}

      <button
        type="button"
        onClick={() => setIsOpen((value) => !value)}
        className="pointer-events-auto inline-flex items-center gap-2 rounded-full border border-white/55 bg-white/78 px-3 py-2 text-sm font-medium text-slate-700 shadow-[0_14px_30px_rgba(37,99,235,0.16)] backdrop-blur-xl transition hover:bg-white"
      >
        <MessageSquare className="h-4 w-4 text-blue-600" />
        AI чат
      </button>
    </div>
  )
}
