'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { ShoppingCart } from 'lucide-react'
import { useCartStore } from '@/app/lib/store/cart'

export default function Header() {
  const pathname = usePathname()
  const itemCount = useCartStore(state => state.getItemCount())
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const navLinks = [
    { href: '/catalog', label: 'Catalog' },
    { href: '/bestsellers', label: 'Bestsellers' },
    { href: '/about', label: 'Our Story' },
    { href: '/account', label: 'Personal Account' },
    { href: '/contacts', label: 'Contacts' },
    { href: '/help', label: 'Help' },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-transparent">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link
          href="/"
          className="flex items-center gap-2 rounded-sm p-2 hover:bg-white/10 transition-colors"
          aria-label="На главную"
        >
          <Image
            src="/header_logo_muted.png"
            width={120}
            height={40}
            alt="Логотип NextStep"
            className="object-contain"
          />
        </Link>

        <nav className="hidden md:flex">
          <ul className="flex items-center gap-6 text-sm font-medium text-white">
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

        <Link
          href="/cart"
          className="relative rounded-full p-2 hover:bg-white/10 transition-colors group"
          aria-label="Перейти в корзину"
        >
          <ShoppingCart className="h-6 w-6 text-white group-hover:text-blue-400 transition-colors" />
          {mounted && itemCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full animate-in zoom-in-50 duration-200">
              {itemCount > 9 ? '9+' : itemCount}
            </span>
          )}
        </Link>
      </div>
    </header>
  )
}