import type { PropsWithChildren } from 'react'
import { useEffect, useMemo, useState } from 'react'
import type { Session } from '@supabase/supabase-js'
import { hasSupabaseEnv } from '@/app/config/env.ts'
import { AuthContext, type AuthStatus } from '@/features/auth/model/auth-context.ts'
import { getCurrentSession, subscribeToAuthChanges } from '@/integrations/supabase/repositories/index.ts'

type AuthState = {
  session: Session | null
  status: AuthStatus
}

const initialState: AuthState = {
  session: null,
  status: hasSupabaseEnv() ? 'loading' : 'env-missing',
}

export function AuthProvider({ children }: PropsWithChildren) {
  const [authState, setAuthState] = useState<AuthState>(initialState)

  useEffect(() => {
    if (!hasSupabaseEnv()) {
      return
    }

    let isMounted = true

    void getCurrentSession().then((session) => {
      if (!isMounted) {
        return
      }

      setAuthState({
        session,
        status: session ? 'authenticated' : 'anonymous',
      })
    })

    const { unsubscribe } = subscribeToAuthChanges((session) => {
      setAuthState({
        session,
        status: session ? 'authenticated' : 'anonymous',
      })
    })

    return () => {
      isMounted = false
      unsubscribe()
    }
  }, [])

  const value = useMemo(
    () => ({
      session: authState.session,
      status: authState.status,
    }),
    [authState.session, authState.status],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}