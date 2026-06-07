'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { signIn } from 'next-auth/react'
import { Lock, ArrowRight } from 'lucide-react'
import { useTranslations } from '@/lib/i18n/useTranslations'

export default function AdminLoginPage() {
  const router = useRouter()
  const { t } = useTranslations()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!username || !password) {
      setError(t('admin.login.error.empty'))
      return
    }

    const result = await signIn('credentials', {
      username,
      password,
      redirect: false,
    })

    if (result?.error) {
      setError(t('admin.login.error.invalid'))
    } else {
      router.push('/admin')
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white flex items-center justify-center px-4 pt-24">
      <div className="w-full max-w-sm">
        <Link href="/" className="block text-center mb-8 text-3xl font-bold">
          <span className="text-white">Next</span>
          <span className="text-blue-400">Step</span>
          <span className="block text-xs text-gray-500 font-normal mt-1">{t('admin.login.panel')}</span>
        </Link>

        <form onSubmit={handleSubmit} className="bg-white/5 p-8 rounded-2xl border border-white/10 space-y-5">
          <div className="flex justify-center mb-2">
            <div className="w-12 h-12 bg-blue-600/20 rounded-xl flex items-center justify-center">
              <Lock className="w-6 h-6 text-blue-400" />
            </div>
          </div>

          <h1 className="text-xl font-bold text-center">{t('admin.login.signIn')}</h1>

          <div>
            <label className="block text-xs text-gray-400 mb-1.5 font-medium">{t('admin.login.username')}</label>
            <input
              type="text"
              value={username}
              onChange={e => { setUsername(e.target.value); setError('') }}
              className="w-full bg-white/10 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white placeholder-gray-500 outline-none focus:border-blue-500 transition-colors"
              placeholder="admin"
            />
          </div>

          <div>
            <label className="block text-xs text-gray-400 mb-1.5 font-medium">{t('admin.login.password')}</label>
            <input
              type="password"
              value={password}
              onChange={e => { setPassword(e.target.value); setError('') }}
              className="w-full bg-white/10 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white placeholder-gray-500 outline-none focus:border-blue-500 transition-colors"
              placeholder="••••••"
            />
          </div>

          {error && (
            <p className="text-red-400 text-xs text-center">{error}</p>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 font-bold py-3 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
          >
            {t('admin.login.signIn')} <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </main>
  )
}
