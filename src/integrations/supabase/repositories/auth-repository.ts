import type { Session } from '@supabase/supabase-js'
import { getSupabaseBrowserClient } from '@/integrations/supabase/client/supabase-browser.ts'

export async function getCurrentSession(): Promise<Session | null> {
  const supabase = getSupabaseBrowserClient()
  const { data, error } = await supabase.auth.getSession()

  if (error) {
    throw error
  }

  return data.session
}

export function subscribeToAuthChanges(callback: (session: Session | null) => void) {
  const supabase = getSupabaseBrowserClient()
  const {
    data: { subscription },
  } = supabase.auth.onAuthStateChange((_event, session) => {
    callback(session)
  })

  return {
    unsubscribe: () => subscription.unsubscribe(),
  }
}

export async function requestMagicLinkSignIn(email: string, emailRedirectTo?: string) {
  const supabase = getSupabaseBrowserClient()
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: emailRedirectTo ? { emailRedirectTo } : undefined,
  })

  if (error) {
    throw error
  }
}

export async function signOutCurrentUser() {
  const supabase = getSupabaseBrowserClient()
  const { error } = await supabase.auth.signOut()

  if (error) {
    throw error
  }
}