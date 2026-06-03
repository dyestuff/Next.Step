'use client'

import Link from 'next/link'
import { useTranslations } from '@/lib/i18n/useTranslations'

export default function Footer() {
  const { t } = useTranslations()

  const navLinks = [
    { href: '/catalog', label: t('footer.navCatalog') },
    { href: '/bestsellers', label: t('footer.navBestsellers') },
    { href: '/about', label: t('footer.navAbout') },
    { href: '/contacts', label: t('footer.navContacts') },
    { href: '/help', label: t('footer.navHelp') },
  ]

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-black border-t border-white/10">
      <div className="container mx-auto px-4 py-16 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-20">
          <div className="flex flex-col items-start gap-6">
            <Link href="/" className="text-4xl md:text-5xl font-bold text-white leading-none hover:opacity-80 transition-opacity">
              <span className="block">Next</span>
              <span className="block text-blue-400">Step</span>
            </Link>
            <Link
              href="/contacts"
              className="inline-block border border-white/30 rounded-full px-6 py-3 text-xs text-white uppercase tracking-wider hover:bg-white/10 transition-all"
            >
              {t('footer.askQuestion')}
            </Link>
          </div>

          <div className="flex flex-col items-start gap-4">
            <span className="text-xs text-gray-400 tracking-widest uppercase font-medium">
              {t('footer.contacts')}
            </span>
            <a
              href="tel:+78004566434"
              className="text-2xl font-bold text-white hover:text-blue-400 transition-colors"
            >
              {t('footer.phone')}
            </a>
          </div>

          <div className="flex flex-col items-start gap-4">
            <Link href="/" className="text-xs text-gray-400 tracking-widest uppercase font-medium hover:text-blue-400 transition-colors">
              {t('footer.navHome')}
            </Link>
            <nav className="flex flex-col items-start gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-xs text-gray-400 uppercase tracking-wider hover:text-blue-400 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10">
          <p className="text-xs text-gray-500 text-center">{t('footer.copyright')}</p>
        </div>
      </div>
    </footer>
  )
}
