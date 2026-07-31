import { createContext } from 'react'
import type { Session } from '@supabase/supabase-js'

export type AuthStatus = 'loading' | 'anonymous' | 'authenticated' | 'env-missing'

export type AuthContextValue = {
  session: Session | null
  status: AuthStatus
}

export const AuthContext = createContext<AuthContextValue | undefined>(undefined)