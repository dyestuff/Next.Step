'use client'

import Link from 'next/link'
import { FileQuestion, Home } from 'lucide-react'
import { useTranslations } from '@/lib/i18n/useTranslations'

export default function NotFound() {
  const { t } = useTranslations()

  return (
    <main className="flex-1 flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white px-4">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 bg-orange-600/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <FileQuestion className="w-8 h-8 text-orange-400" />
        </div>
        <h1 className="text-6xl font-bold mb-2">404</h1>
        <h2 className="text-2xl font-bold mb-3">{t('notFound.title')}</h2>
        <p className="text-gray-400 mb-8">{t('notFound.desc')}</p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl font-bold transition-all hover:scale-[1.02]"
        >
          <Home className="w-4 h-4" /> {t('notFound.back')}
        </Link>
      </div>
    </main>
  )
}
