export function getSupabaseEnv() {
  return {
    url: import.meta.env.VITE_SUPABASE_URL,
    anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY,
  }
}

export function hasSupabaseEnv() {
  const { url, anonKey } = getSupabaseEnv()

  return Boolean(url && anonKey)
}