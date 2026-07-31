import { createClient } from '@supabase/supabase-js'
import { getSupabaseEnv, hasSupabaseEnv } from './env.ts'

let supabaseClient: ReturnType<typeof createClient> | null = null

export function getSupabaseBrowserClient() {
  if (!hasSupabaseEnv()) {
    throw new Error('Supabase environment variables are missing. Copy .env.example into .env.local and fill them in.')
  }

  if (!supabaseClient) {
    const { url, anonKey } = getSupabaseEnv()
    supabaseClient = createClient(url, anonKey)
  }

  return supabaseClient
}