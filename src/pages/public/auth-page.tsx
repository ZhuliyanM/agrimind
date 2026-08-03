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
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.14),_transparent_34%),linear-gradient(180deg,_#f8fbff_0%,_#eef5ff_55%,_#eaf2ff_100%)] px-6 py-10 text-slate-900 lg:px-10">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <section className="space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs uppercase tracking-[0.3em] text-blue-700">
            Authentication foundation
          </div>
          <h1 className="max-w-xl text-5xl font-semibold tracking-[-0.06em] text-slate-900 sm:text-6xl">
            Access is now routed through a real auth boundary.
          </h1>
          <p className="max-w-xl text-base leading-8 text-slate-600">
            The shell, protected routes, Supabase client, and auth provider are wired. Once you configure the
            environment values, this entry point can send magic links without changing the architecture.
          </p>
          <div className="rounded-[1.75rem] border border-blue-100 bg-white p-6 shadow-[0_10px_24px_rgba(59,130,246,0.08)]">
            <div className="flex items-center gap-3">
              <ShieldCheck className="h-5 w-5 text-blue-700" />
              <p className="text-sm font-medium text-slate-900">Environment status</p>
            </div>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              {isConfigured
                ? 'Supabase environment variables are configured. You can test the auth entry flow now.'
                : getSupabaseEnvIssue() ?? 'Supabase environment variables are missing.'}
            </p>
            {!isConfigured ? (
              <Link
                to="/app"
                className="mt-5 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700 transition hover:bg-blue-100"
              >
                Continue in demo mode
              </Link>
            ) : null}
          </div>
        </section>

        <section className="rounded-[2rem] border border-blue-100 bg-white p-8 shadow-[0_16px_34px_rgba(59,130,246,0.12)] backdrop-blur">
          <div className="mb-8">
            <p className="text-sm uppercase tracking-[0.3em] text-blue-700">Sign in scaffold</p>
            <h2 className="mt-3 text-3xl font-semibold text-slate-900">Magic link entry</h2>
          </div>

          <form className="space-y-5" onSubmit={onSubmit}>
            <label className="block space-y-2">
              <span className="text-sm text-slate-700">Work email</span>
              <div className="flex items-center gap-3 rounded-2xl border border-blue-100 bg-blue-50/40 px-4 py-3 text-slate-700">
                <Mail className="h-4 w-4 text-blue-500" />
                <input
                  {...form.register('email')}
                  type="email"
                  placeholder="you@agrimind.com"
                  className="w-full bg-transparent outline-none placeholder:text-slate-400"
                />
              </div>
              {form.formState.errors.email ? (
                <p className="text-sm text-rose-300">{form.formState.errors.email.message}</p>
              ) : null}
            </label>

            <button
              type="submit"
              disabled={form.formState.isSubmitting}
              className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-blue-600 px-4 py-3 font-medium text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {form.formState.isSubmitting ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <ArrowRight className="h-4 w-4" />}
              Send magic link
            </button>

            {feedback ? <p className="rounded-2xl border border-blue-100 bg-blue-50/45 px-4 py-3 text-sm text-slate-700">{feedback}</p> : null}
          </form>
        </section>
      </div>
    </div>
  )
}