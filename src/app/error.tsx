'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { AlertTriangle, RefreshCw, Home } from 'lucide-react'
import { useTranslations } from '@/lib/i18n/useTranslations'

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const { t } = useTranslations()

  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <main className="flex-1 flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white px-4">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 bg-red-600/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <AlertTriangle className="w-8 h-8 text-red-400" />
        </div>
        <h1 className="text-3xl font-bold mb-3">{t('error.title')}</h1>
        <p className="text-gray-400 mb-8">{t('error.desc')}</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={reset}
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl font-bold transition-all hover:scale-[1.02]"
          >
            <RefreshCw className="w-4 h-4" /> {t('error.retry')}
          </button>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 px-6 py-3 rounded-xl font-bold transition-all border border-white/20"
          >
            <Home className="w-4 h-4" /> {t('error.back')}
          </Link>
        </div>
      </div>
    </main>
  )
}
