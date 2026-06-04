'use client'

import { useLocaleStore } from './store'
import { getTranslations } from './translations'

export function useTranslations() {
  const locale = useLocaleStore((state) => state.locale)
  const t = getTranslations(locale)
  return { t, locale }
}

export function getTranslationsForLocale(locale: 'ru' | 'en') {
  return getTranslations(locale)
}
