import { z } from 'zod'

const supabaseEnvSchema = z.object({
  url: z.string().url(),
  anonKey: z.string().min(1),
})

const rawSupabaseEnv = {
  url: import.meta.env.VITE_SUPABASE_URL ?? '',
  anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY ?? '',
}

const parsedSupabaseEnv = supabaseEnvSchema.safeParse(rawSupabaseEnv)

export function hasSupabaseEnv() {
  return parsedSupabaseEnv.success
}

export function getSupabaseEnv() {
  if (!parsedSupabaseEnv.success) {
    return rawSupabaseEnv
  }

  return parsedSupabaseEnv.data
}

export function getSupabaseEnvIssue() {
  if (parsedSupabaseEnv.success) {
    return null
  }

  if (!rawSupabaseEnv.url && !rawSupabaseEnv.anonKey) {
    return 'Supabase environment variables are missing. Copy .env.example into .env.local and fill both values.'
  }

  if (!rawSupabaseEnv.url) {
    return 'VITE_SUPABASE_URL is missing from your environment configuration.'
  }

  if (!rawSupabaseEnv.anonKey) {
    return 'VITE_SUPABASE_ANON_KEY is missing from your environment configuration.'
  }

  return parsedSupabaseEnv.error.issues[0]?.message ?? 'Supabase environment is incomplete.'
}