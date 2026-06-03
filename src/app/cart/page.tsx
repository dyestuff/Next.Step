'use client'

'use client'

import { useState, useMemo } from 'react'
import { useCartStore } from '@/app/lib/store/cart'
import Image from 'next/image'
import Link from 'next/link'
import {
  Trash2, Minus, Plus, ArrowRight, ArrowLeft,
  ShoppingCart, Tag, Ticket, Truck, ShieldCheck, Gift
} from 'lucide-react'
import { useTranslations } from '@/lib/i18n/useTranslations'

const FREE_SHIPPING_MIN = 100
const PROMO_CODES: Record<string, number> = {
  SAVE10: 10,
  SAVE20: 20,
}

export default function CartPage() {
  const { t, locale } = useTranslations()
  const items = useCartStore(state => state.items)
  const removeItem = useCartStore(state => state.removeItem)
  const updateQuantity = useCartStore(state => state.updateQuantity)
  const getTotalPrice = useCartStore(state => state.getTotalPrice)
  const clearCart = useCartStore(state => state.clearCart)

  const [promoInput, setPromoInput] = useState('')
  const [promoStatus, setPromoStatus] = useState<'idle' | 'applied' | 'invalid'>('idle')

  const total = getTotalPrice()
  const itemCount = items.reduce((acc, i) => acc + i.quantity, 0)
  const discountPct = promoStatus === 'applied' ? PROMO_CODES[promoInput.toUpperCase()] || 10 : 0
  const discount = total * (discountPct / 100)
  const finalTotal = Math.max(0, total - discount)
  const remainingToFree = Math.max(0, FREE_SHIPPING_MIN - total)
  const shippingProgress = Math.min(total / FREE_SHIPPING_MIN, 1)

  const deliveryDate = useMemo(() => {
    const d = new Date()
    d.setDate(d.getDate() + 5)
    return d.toLocaleDateString(locale === 'ru' ? 'ru-RU' : 'en-US', {
      weekday: 'short', month: 'long', day: 'numeric',
    })
  }, [locale])

  const applyPromo = () => {
    const code = promoInput.trim().toUpperCase()
    if (PROMO_CODES[code]) {
      setPromoStatus('applied')
    } else {
      setPromoStatus('invalid')
    }
  }

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white flex items-center justify-center px-4">
        <div className="text-center">
          <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingCart className="w-10 h-10 text-gray-500" />
          </div>
          <h2 className="text-2xl font-bold mb-2">{t('cart.empty')}</h2>
          <p className="text-gray-400 mb-8">{t('cart.emptyDesc')}</p>
          <Link
            href="/catalog"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl font-semibold transition-all hover:scale-105 shadow-lg shadow-blue-600/20"
          >
            {t('cart.goToCatalog')} <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white py-12">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl md:text-4xl font-bold">
            {t('cart.title')} <span className="text-gray-500 text-2xl font-normal">({itemCount})</span>
          </h1>
          <button onClick={clearCart} className="text-sm text-gray-400 hover:text-red-400 underline transition-colors">
            {t('cart.clear')}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div key={`${item.id}-${item.size}`} className="flex gap-4 bg-white/5 p-4 rounded-xl border border-white/10 hover:border-white/20 transition-colors">
                <div className="relative w-24 h-24 bg-white rounded-lg overflow-hidden flex-shrink-0">
                  <Image src={item.image} alt={item.name} fill className="object-cover" />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-lg leading-tight">{item.name}</h3>
                    <p className="text-sm text-gray-400 mt-1">{item.brand} &middot; {t('cart.size')} {item.size}</p>
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-3 bg-white/10 rounded-lg p-1">
                      <button
                        onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                        className="p-1.5 hover:bg-white/20 rounded-md transition-colors disabled:opacity-30"
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-6 text-center font-semibold text-sm">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                        className="p-1.5 hover:bg-white/20 rounded-md transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="font-bold text-lg">${(parseFloat(item.price) * item.quantity).toFixed(2)}</span>
                      <button
                        onClick={() => removeItem(item.id, item.size)}
                        className="text-gray-500 hover:text-red-400 transition-colors p-1"
                        aria-label={t('cart.remove')}
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div className="pt-4">
              <Link
                href="/catalog"
                className="inline-flex items-center gap-2 text-gray-400 hover:text-blue-400 transition-colors text-sm font-medium"
              >
                <ArrowLeft className="w-4 h-4" /> {t('cart.continueShopping')}
              </Link>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white/5 p-6 rounded-xl border border-white/10 sticky top-24 space-y-5">
              <h2 className="text-xl font-bold">{t('cart.summary')}</h2>
              <div className="space-y-3 text-gray-300 text-sm">
                <div className="flex justify-between">
                  <span>{t('cart.title')} ({itemCount} {t('cart.items')})</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>{t('cart.delivery')}</span>
                  <span className="text-green-400 flex items-center gap-1"><Tag className="w-3 h-3" /> {t('cart.free')}</span>
                </div>
              </div>

              {total < FREE_SHIPPING_MIN && (
                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-gray-400">
                    <span>{t('cart.freeShipping')}</span>
                    <span>${remainingToFree.toFixed(2)}</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
                    <div
                      className="bg-blue-500 h-full rounded-full transition-all duration-500"
                      style={{ width: `${shippingProgress * 100}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-500">
                    {t('cart.freeShippingProgress').replace('{{remaining}}', remainingToFree.toFixed(2))}
                  </p>
                </div>
              )}

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-xs text-gray-400 font-medium">
                  <Ticket className="w-3.5 h-3.5" /> {t('cart.promo')}
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={promoInput}
                    onChange={e => { setPromoInput(e.target.value); if (promoStatus !== 'idle') setPromoStatus('idle') }}
                    placeholder={t('cart.promoPlaceholder')}
                    className="flex-1 bg-white/10 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 outline-none focus:border-blue-500 transition-colors"
                  />
                  <button
                    onClick={applyPromo}
                    disabled={!promoInput.trim()}
                    className="bg-blue-600 hover:bg-blue-700 disabled:opacity-30 disabled:cursor-not-allowed px-4 py-2 rounded-lg text-sm font-semibold transition-all"
                  >
                    {t('cart.promoApply')}
                  </button>
                </div>
                {promoStatus === 'idle' && (
                  <p className="text-xs text-gray-500 italic">{t('cart.promoSuggest')}</p>
                )}
                {promoStatus === 'invalid' && (
                  <p className="text-xs text-red-400 flex items-center gap-1">
                    {t('cart.promoInvalid')}
                  </p>
                )}
                {promoStatus === 'applied' && (
                  <p className="text-xs text-green-400 flex items-center gap-1">
                    {t('cart.promoApplied')}
                  </p>
                )}
              </div>

              {discount > 0 && (
                <div className="space-y-2 pb-2 border-b border-white/10">
                  <div className="flex justify-between text-sm text-green-400">
                    <span className="flex items-center gap-1"><Gift className="w-3.5 h-3.5" /> {t('cart.discount')} ({discountPct}%)</span>
                    <span>-${discount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-green-400">
                    <span className="flex items-center gap-1"><Gift className="w-3.5 h-3.5" /> {t('cart.savings')}</span>
                    <span>${discount.toFixed(2)}</span>
                  </div>
                </div>
              )}

              <div className="border-t border-white/10 pt-4">
                <div className="flex justify-between text-2xl font-bold">
                  <span>{t('cart.total')}</span>
                  <span>${finalTotal.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-end mt-1">
                    <span className="text-xs text-gray-500 line-through">${total.toFixed(2)}</span>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2 text-xs text-gray-400">
                <Truck className="w-3.5 h-3.5 shrink-0" />
                <span>{t('cart.deliveryEstimate')} <span className="text-white font-medium">{deliveryDate}</span></span>
              </div>

              <Link
                href="/checkout"
                className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 px-4 rounded-xl transition-all shadow-lg hover:shadow-blue-600/30 hover:scale-[1.02] active:scale-[0.98] text-center"
              >
                {t('cart.checkout')}
              </Link>
              <p className="text-xs text-gray-500 text-center">
                {t('cart.payment')}
              </p>
              <div className="flex items-center justify-center gap-4 pt-1 text-xs text-gray-500">
                <span className="flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5" /> {t('cart.securePayment')}</span>
                <span className="flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5" /> {t('cart.guarantee')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}