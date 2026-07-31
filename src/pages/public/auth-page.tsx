import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowRight, LoaderCircle, Mail, ShieldCheck } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, Navigate } from 'react-router-dom'
import { z } from 'zod'
import { getSupabaseEnvIssue, hasSupabaseEnv } from '@/app/config/env.ts'
import { useAuth } from '@/features/auth/model/use-auth.ts'
import { requestMagicLinkSignIn } from '@/integrations/supabase/repositories/index.ts'

const authSchema = z.object({
  email: z.email('Enter a valid email address.'),
})

type AuthFormValues = z.infer<typeof authSchema>

export function AuthPage() {
  const { status } = useAuth()
  const [feedback, setFeedback] = useState<string | null>(null)

  const form = useForm<AuthFormValues>({
    defaultValues: {
      email: '',
    },
    resolver: zodResolver(authSchema),
  })

  if (status === 'authenticated') {
    return <Navigate to="/app" replace />
  }

  const isConfigured = hasSupabaseEnv()

  const onSubmit = form.handleSubmit(async ({ email }) => {
    if (!isConfigured) {
      setFeedback(getSupabaseEnvIssue() ?? 'Configure Supabase credentials before using authentication.')
      return
    }

    setFeedback(null)

    try {
      await requestMagicLinkSignIn(email, `${window.location.origin}/app`)
      setFeedback(`Magic link sent to ${email}. Open the email and continue into AgriMind.`)
      form.reset()
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : 'Authentication request failed.')
    }
  })

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(52,211,153,0.16),_transparent_30%),linear-gradient(180deg,_#0b1120_0%,_#111827_45%,_#020617_100%)] px-6 py-10 text-stone-50 lg:px-10">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <section className="space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-1 text-xs uppercase tracking-[0.3em] text-emerald-200">
            Authentication foundation
          </div>
          <h1 className="max-w-xl text-5xl font-semibold tracking-[-0.06em] text-white sm:text-6xl">
            Access is now routed through a real auth boundary.
          </h1>
          <p className="max-w-xl text-base leading-8 text-stone-300">
            The shell, protected routes, Supabase client, and auth provider are wired. Once you configure the
            environment values, this entry point can send magic links without changing the architecture.
          </p>
          <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-6">
            <div className="flex items-center gap-3">
              <ShieldCheck className="h-5 w-5 text-emerald-200" />
              <p className="text-sm font-medium text-white">Environment status</p>
            </div>
            <p className="mt-3 text-sm leading-7 text-stone-400">
              {isConfigured
                ? 'Supabase environment variables are configured. You can test the auth entry flow now.'
                : getSupabaseEnvIssue() ?? 'Supabase environment variables are missing.'}
            </p>
            {!isConfigured ? (
              <Link
                to="/app"
                className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10"
              >
                Continue in demo mode
              </Link>
            ) : null}
          </div>
        </section>

        <section className="rounded-[2rem] border border-white/10 bg-stone-950/80 p-8 shadow-2xl shadow-emerald-950/20 backdrop-blur">
          <div className="mb-8">
            <p className="text-sm uppercase tracking-[0.3em] text-stone-500">Sign in scaffold</p>
            <h2 className="mt-3 text-3xl font-semibold text-white">Magic link entry</h2>
          </div>

          <form className="space-y-5" onSubmit={onSubmit}>
            <label className="block space-y-2">
              <span className="text-sm text-stone-300">Work email</span>
              <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-stone-200">
                <Mail className="h-4 w-4 text-stone-500" />
                <input
                  {...form.register('email')}
                  type="email"
                  placeholder="you@agrimind.com"
                  className="w-full bg-transparent outline-none placeholder:text-stone-500"
                />
              </div>
              {form.formState.errors.email ? (
                <p className="text-sm text-rose-300">{form.formState.errors.email.message}</p>
              ) : null}
            </label>

            <button
              type="submit"
              disabled={form.formState.isSubmitting}
              className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-300 px-4 py-3 font-medium text-stone-950 transition hover:bg-emerald-200 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {form.formState.isSubmitting ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <ArrowRight className="h-4 w-4" />}
              Send magic link
            </button>

            {feedback ? <p className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-stone-300">{feedback}</p> : null}
          </form>
        </section>
      </div>
    </div>
  )
}