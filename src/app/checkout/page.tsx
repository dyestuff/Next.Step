'use client'

import { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useCartStore } from '@/app/lib/store/cart'
import { useOrderStore } from '@/app/lib/store/orders'
import { useTranslations } from '@/lib/i18n/useTranslations'
import {
  ArrowLeft, ShoppingCart, Truck, ShieldCheck,
  User, Mail, Phone, MapPin, Home, FileText, CheckCircle
} from 'lucide-react'

const COUNTRIES = ['ru', 'us', 'kz', 'by', 'other'] as const

interface FormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  country: string
  city: string
  address: string
  zip: string
  notes: string
}

const initialForm: FormData = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  country: '',
  city: '',
  address: '',
  zip: '',
  notes: '',
}

export default function CheckoutPage() {
  const { t, locale } = useTranslations()
  const router = useRouter()
  const items = useCartStore(state => state.items)
  const getTotalPrice = useCartStore(state => state.getTotalPrice)
  const clearCart = useCartStore(state => state.clearCart)
  const addOrder = useOrderStore(state => state.addOrder)

  const [form, setForm] = useState<FormData>(initialForm)
  const [consent, setConsent] = useState(false)
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, boolean>>>({})
  const [submitted, setSubmitted] = useState(false)
  const [orderId, setOrderId] = useState('')

  const total = getTotalPrice()
  const itemCount = items.reduce((acc, i) => acc + i.quantity, 0)

  const deliveryDate = useMemo(() => {
    const d = new Date()
    d.setDate(d.getDate() + 5)
    return d.toLocaleDateString(locale === 'ru' ? 'ru-RU' : 'en-US', {
      weekday: 'short', month: 'long', day: 'numeric',
    })
  }, [locale])

  const requiredFields: (keyof FormData)[] = [
    'firstName', 'lastName', 'email', 'phone', 'country', 'city', 'address',
  ]

  const updateField = (field: keyof FormData, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: false }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors: Partial<Record<keyof FormData, boolean>> = {}
    for (const field of requiredFields) {
      if (!form[field].trim()) {
        newErrors[field] = true
      }
    }
    if (Object.keys(newErrors).length > 0 || !consent) {
      setErrors(newErrors)
      return
    }
    const id = `NS-${Date.now().toString(36).toUpperCase()}`
    setOrderId(id)
    addOrder({
      id,
      items: items.map(i => ({ id: i.id, name: i.name, price: i.price, quantity: i.quantity, size: i.size, image: i.image })),
      total,
      shipping: { firstName: form.firstName, lastName: form.lastName, email: form.email, phone: form.phone, country: form.country, city: form.city, address: form.address, zip: form.zip, notes: form.notes },
      createdAt: new Date().toISOString(),
    })
    setSubmitted(true)
    clearCart()
  }

  if (items.length === 0 && !submitted) {
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
            {t('cart.goToCatalog')} <ArrowLeft className="w-4 h-4" />
          </Link>
        </div>
      </main>
    )
  }

  if (submitted) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-400" />
          </div>
          <h2 className="text-3xl font-bold mb-2">{t('checkout.success')}</h2>
          <p className="text-gray-400 text-lg mb-1">
            {t('checkout.successDesc')} <span className="text-blue-400 font-bold">{orderId}</span>
          </p>
          <p className="text-gray-500 mb-8">{t('checkout.successMessage')}</p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl font-semibold transition-all hover:scale-105 shadow-lg shadow-blue-600/20"
          >
            {t('checkout.successBack')}
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => router.push('/cart')}
            className="text-gray-400 hover:text-white transition-colors p-1"
            aria-label={t('checkout.backToCart')}
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-3xl md:text-4xl font-bold">{t('checkout.title')}</h1>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            <div className="lg:col-span-3 space-y-6">
              <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <User className="w-5 h-5 text-blue-400" /> {t('checkout.contactInfo')}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-gray-400 mb-1.5 font-medium">
                      {t('checkout.firstName')} <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      value={form.firstName}
                      onChange={e => updateField('firstName', e.target.value)}
                      placeholder={t('checkout.firstNamePlaceholder')}
                      className={`w-full bg-white/10 border rounded-lg px-3 py-2.5 text-sm text-white placeholder-gray-500 outline-none transition-colors ${
                        errors.firstName ? 'border-red-500' : 'border-white/10 focus:border-blue-500'
                      }`}
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1.5 font-medium">
                      {t('checkout.lastName')} <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      value={form.lastName}
                      onChange={e => updateField('lastName', e.target.value)}
                      placeholder={t('checkout.lastNamePlaceholder')}
                      className={`w-full bg-white/10 border rounded-lg px-3 py-2.5 text-sm text-white placeholder-gray-500 outline-none transition-colors ${
                        errors.lastName ? 'border-red-500' : 'border-white/10 focus:border-blue-500'
                      }`}
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1.5 font-medium flex items-center gap-1">
                      <Mail className="w-3.5 h-3.5" /> {t('checkout.email')} <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={e => updateField('email', e.target.value)}
                      placeholder={t('checkout.emailPlaceholder')}
                      className={`w-full bg-white/10 border rounded-lg px-3 py-2.5 text-sm text-white placeholder-gray-500 outline-none transition-colors ${
                        errors.email ? 'border-red-500' : 'border-white/10 focus:border-blue-500'
                      }`}
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1.5 font-medium flex items-center gap-1">
                      <Phone className="w-3.5 h-3.5" /> {t('checkout.phone')} <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={e => updateField('phone', e.target.value)}
                      placeholder={t('checkout.phonePlaceholder')}
                      className={`w-full bg-white/10 border rounded-lg px-3 py-2.5 text-sm text-white placeholder-gray-500 outline-none transition-colors ${
                        errors.phone ? 'border-red-500' : 'border-white/10 focus:border-blue-500'
                      }`}
                    />
                  </div>
                </div>
              </div>

              <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-blue-400" /> {t('checkout.shippingAddress')}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-xs text-gray-400 mb-1.5 font-medium">
                      {t('checkout.country')} <span className="text-red-400">*</span>
                    </label>
                    <select
                      value={form.country}
                      onChange={e => updateField('country', e.target.value)}
                      className={`w-full bg-white/10 border rounded-lg px-3 py-2.5 text-sm text-white outline-none transition-colors appearance-none ${
                        errors.country ? 'border-red-500' : 'border-white/10 focus:border-blue-500'
                      } ${!form.country ? 'text-gray-500' : ''}`}
                    >
                      <option value="" disabled>{t('checkout.country')}...</option>
                      {COUNTRIES.map(c => (
                        <option key={c} value={c} className="bg-gray-800">{t(`checkout.country.${c}`)}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1.5 font-medium">
                      {t('checkout.city')} <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      value={form.city}
                      onChange={e => updateField('city', e.target.value)}
                      placeholder={t('checkout.cityPlaceholder')}
                      className={`w-full bg-white/10 border rounded-lg px-3 py-2.5 text-sm text-white placeholder-gray-500 outline-none transition-colors ${
                        errors.city ? 'border-red-500' : 'border-white/10 focus:border-blue-500'
                      }`}
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1.5 font-medium">
                      {t('checkout.zip')}
                    </label>
                    <input
                      type="text"
                      value={form.zip}
                      onChange={e => updateField('zip', e.target.value)}
                      placeholder={t('checkout.zipPlaceholder')}
                      className="w-full bg-white/10 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white placeholder-gray-500 outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs text-gray-400 mb-1.5 font-medium flex items-center gap-1">
                      <Home className="w-3.5 h-3.5" /> {t('checkout.address')} <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      value={form.address}
                      onChange={e => updateField('address', e.target.value)}
                      placeholder={t('checkout.addressPlaceholder')}
                      className={`w-full bg-white/10 border rounded-lg px-3 py-2.5 text-sm text-white placeholder-gray-500 outline-none transition-colors ${
                        errors.address ? 'border-red-500' : 'border-white/10 focus:border-blue-500'
                      }`}
                    />
                  </div>
                </div>
              </div>

              <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-blue-400" /> {t('checkout.orderNotes')}
                </h2>
                <textarea
                  value={form.notes}
                  onChange={e => updateField('notes', e.target.value)}
                  placeholder={t('checkout.orderNotesPlaceholder')}
                  rows={3}
                  className="w-full bg-white/10 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white placeholder-gray-500 outline-none focus:border-blue-500 transition-colors resize-none"
                />
              </div>

              <label className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={e => setConsent(e.target.checked)}
                  className="mt-0.5 w-4 h-4 rounded border-white/20 bg-white/10 accent-blue-600"
                />
                <span className={`text-sm ${!consent && Object.keys(errors).length > 0 ? 'text-red-400' : 'text-gray-300'} group-hover:text-white transition-colors`}>
                  {t('checkout.consent')} <span className="text-red-400">*</span>
                </span>
              </label>

              {Object.keys(errors).length > 0 && (
                <p className="text-sm text-red-400 flex items-center gap-1">
                  {t('checkout.fillRequired')}
                </p>
              )}
            </div>

            <div className="lg:col-span-2">
              <div className="bg-white/5 p-6 rounded-xl border border-white/10 sticky top-24 space-y-4">
                <h2 className="text-lg font-bold flex items-center gap-2">
                  <ShoppingCart className="w-5 h-5 text-blue-400" /> {t('checkout.yourOrder')}
                </h2>

                <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
                  {items.map((item) => (
                    <div key={`${item.id}-${item.size}`} className="flex gap-3">
                      <div className="relative w-14 h-14 bg-white rounded-lg overflow-hidden flex-shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{item.name}</p>
                        <p className="text-xs text-gray-400">{t('cart.size')} {item.size} &middot; {item.quantity} {t('cart.items')}</p>
                        <p className="text-sm font-semibold mt-0.5">${(parseFloat(item.price) * item.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-white/10 pt-4 space-y-2 text-sm text-gray-300">
                  <div className="flex justify-between">
                    <span>{t('checkout.subtotal')}</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="flex items-center gap-1"><Truck className="w-3.5 h-3.5" /> {t('cart.delivery')}</span>
                    <span className="text-green-400">{t('cart.free')}</span>
                  </div>
                </div>

                <div className="border-t border-white/10 pt-4">
                  <div className="flex justify-between text-xl font-bold">
                    <span>{t('cart.total')}</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-400 mt-2">
                    <Truck className="w-3.5 h-3.5 shrink-0" />
                    <span>{t('cart.deliveryEstimate')} <span className="text-white font-medium">{deliveryDate}</span></span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 px-4 rounded-xl transition-all shadow-lg hover:shadow-blue-600/30 hover:scale-[1.02] active:scale-[0.98]"
                >
                  {t('checkout.placeOrder')}
                </button>

                <div className="flex items-center justify-center gap-4 text-xs text-gray-500 pt-1">
                  <span className="flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5" /> {t('cart.securePayment')}</span>
                  <span className="flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5" /> {t('cart.guarantee')}</span>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </main>
  )
}
