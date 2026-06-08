import { useTranslations } from '@/lib/i18n/useTranslations'

export default function Loading() {
  return (
    <main className="flex-1 flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white px-4">
      <div className="text-center">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-gray-400 animate-pulse">Loading…</p>
      </div>
    </main>
  )
}
