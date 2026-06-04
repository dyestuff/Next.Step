import { create } from 'zustand'
import type { Locale } from './translations'

function saveLocale(locale: Locale) {
  try {
    if (typeof window !== 'undefined') {
      localStorage.setItem('nextstep-locale', locale)
    }
    document.cookie = `locale=${locale};path=/;max-age=31536000`
  } catch {}
}

export function getCookieLocale(): Locale {
  if (typeof document === 'undefined') return 'ru'
  const match = document.cookie.match(/(?:^|;\s*)locale=([^;]+)/)
  if (match) {
    const val = match[1] as Locale
    if (val === 'en' || val === 'ru') return val
  }
  try {
    const stored = localStorage.getItem('nextstep-locale')
    if (stored === 'en' || stored === 'ru') return stored
  } catch {}
  return 'ru'
}

interface LocaleStore {
  locale: Locale
  setLocale: (locale: Locale) => void
  toggle: () => void
}

export const useLocaleStore = create<LocaleStore>()(
  (set) => ({
    locale: 'ru',
    setLocale: (locale) => {
      saveLocale(locale)
      set({ locale })
    },
    toggle: () => {
      set((state) => {
        const next = state.locale === 'ru' ? 'en' : 'ru'
        saveLocale(next)
        return { locale: next }
      })
    },
  })
)
