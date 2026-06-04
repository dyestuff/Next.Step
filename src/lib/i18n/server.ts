import { cookies } from 'next/headers'
import { getTranslations, type Locale } from './translations'

export async function getServerLocale(): Promise<Locale> {
  const cookieStore = await cookies()
  const locale = cookieStore.get('locale')?.value
  if (locale === 'en' || locale === 'ru') return locale
  return 'ru'
}

export async function getServerTranslations() {
  const locale = await getServerLocale()
  return { t: getTranslations(locale), locale }
}
