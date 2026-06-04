'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { ShoppingCart, Eye, EyeOff, Languages, Menu, X } from 'lucide-react'
import { useCartStore } from '@/app/lib/store/cart'
import { useLocaleStore, getCookieLocale } from '@/lib/i18n/store'
import { getTranslations, type Locale } from '@/lib/i18n/translations'

interface HeaderProps {
  initialLocale?: Locale
}

function getStoredA11y(): boolean {
  if (typeof window === 'undefined') return false
  try {
    return localStorage.getItem('nextstep-a11y') === 'true'
  } catch {
    return false
  }
}

function setStoredA11y(v: boolean) {
  try {
    localStorage.setItem('nextstep-a11y', String(v))
  } catch {}
}

export default function Header({ initialLocale = 'ru' }: HeaderProps) {
  const pathname = usePathname()
  const itemCount = useCartStore(state => state.getItemCount())
  const [locale, setLocale] = useState(initialLocale)
  const [a11yActive, setA11yActive] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const cookieLocale = getCookieLocale()
    useLocaleStore.getState().setLocale(cookieLocale)
    setLocale(cookieLocale)
  }, [])

  useEffect(() => {
    const stored = getStoredA11y()
    setA11yActive(stored)
    document.documentElement.classList.toggle('accessibility-mode', stored)
  }, [])

  const toggleLocale = useCallback(() => {
    const next = locale === 'ru' ? 'en' : 'ru'
    useLocaleStore.getState().setLocale(next)
    window.location.reload()
  }, [locale])

  const toggleA11y = useCallback(() => {
    setA11yActive(prev => {
      const next = !prev
      setStoredA11y(next)
      document.documentElement.classList.toggle('accessibility-mode', next)
      return next
    })
  }, [])

  const t = getTranslations(locale)

  const navLinks = [
    { href: '/catalog', label: t('nav.catalog') },
    { href: '/bestsellers', label: t('nav.bestsellers') },
    { href: '/about', label: t('nav.about') },
    { href: '/contacts', label: t('nav.contacts') },
    { href: '/help', label: t('nav.help') },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-transparent">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link
          href="/"
          className="flex items-center gap-2 rounded-sm p-2 hover:bg-white/10 transition-colors"
          aria-label={t('nav.home')}
        >
          <Image
            src="/header_logo_muted.png"
            width={120}
            height={40}
            alt={t('nav.logoAlt')}
            className="object-contain"
          />
        </Link>

        <nav className="hidden md:flex">
          <ul className="flex items-center gap-10 text-sm font-medium text-white tracking-widest">
            {navLinks.map((link) => {
              const isActive = pathname === link.href

              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={isActive ? 'page' : undefined}
                    className={`transition-colors ${
                      isActive
                        ? 'text-blue-400 font-semibold'
                        : 'text-white hover:text-blue-400'
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-1">
          <button
            onClick={toggleLocale}
            className="rounded-full p-2 hover:bg-white/10 transition-colors text-white"
            aria-label={t('lang.switch')}
          >
            <Languages className="h-5 w-5" />
            <span className="ml-1 text-xs font-bold uppercase">{locale}</span>
          </button>

          <button
            onClick={toggleA11y}
            className={`rounded-full p-2 transition-colors group ${
              a11yActive
                ? 'bg-yellow-400 text-black hover:bg-yellow-300'
                : 'hover:bg-white/10 text-white'
            }`}
            aria-label={a11yActive ? t('a11y.off') : t('a11y.on')}
          >
            {a11yActive ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden rounded-full p-2 hover:bg-white/10 transition-colors text-white"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>

          <Link
            href="/cart"
            className="relative rounded-full p-2 hover:bg-white/10 transition-colors group"
            aria-label={t('nav.cart')}
          >
            <ShoppingCart className="h-6 w-6 text-white group-hover:text-blue-400 transition-colors" />
            {mounted && itemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full animate-in zoom-in-50 duration-200">
                {itemCount > 9 ? '9+' : itemCount}
              </span>
            )}
          </Link>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-gray-900/95 backdrop-blur-md border-t border-white/10">
          <nav className="container mx-auto px-4 py-4">
            <ul className="flex flex-col gap-2">
              {navLinks.map((link) => {
                const isActive = pathname === link.href
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className={`block px-4 py-3 rounded-xl text-sm font-medium tracking-widest transition-colors ${
                        isActive
                          ? 'text-blue-400 bg-blue-600/10'
                          : 'text-white hover:bg-white/10'
                      }`}
                    >
                      {link.label}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>
        </div>
      )}
    </header>
  )
}