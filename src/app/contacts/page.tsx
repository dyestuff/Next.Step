'use client'

import { useState } from 'react'
import { useTranslations } from '@/lib/i18n/useTranslations'
import {
  Mail, Phone, MapPin, Clock, Send, CheckCircle
} from 'lucide-react'

export default function ContactsPage() {
  const { t, locale } = useTranslations()

  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) return
    setSent(true)
  }

  const contactCards = [
    {
      icon: Mail,
      title: t('contacts.email.title'),
      value: t('contacts.email.value'),
      href: 'mailto:' + t('contacts.email.value'),
    },
    {
      icon: Phone,
      title: t('contacts.phone.title'),
      value: t('contacts.phone.value'),
      href: 'tel:' + t('contacts.phone.value').replace(/[\s\-()]/g, ''),
    },
    {
      icon: MapPin,
      title: t('contacts.address.title'),
      value: t('contacts.address.value'),
      value2: t('contacts.address.value2'),
      href: null,
    },
  ]

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <section className="pt-28 pb-16 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">{t('contacts.hero.title')}</h1>
        <p className="text-gray-400 text-lg max-w-xl mx-auto">{t('contacts.hero.subtitle')}</p>
      </section>

      <section className="container mx-auto px-4 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 max-w-5xl mx-auto">
          <div className="lg:col-span-3 space-y-6">
            {contactCards.map((card, i) => (
              <div
                key={i}
                className="bg-white/5 p-5 rounded-xl border border-white/10 hover:border-white/20 transition-colors flex items-start gap-4"
              >
                <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center shrink-0">
                  <card.icon className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-0.5">{card.title}</p>
                  {card.href ? (
                    <a
                      href={card.href}
                      className="text-white hover:text-blue-400 transition-colors font-medium"
                    >
                      {card.value}
                    </a>
                  ) : (
                    <>
                      <p className="text-white font-medium">{card.value}</p>
                      <p className="text-gray-400 text-sm">{card.value2}</p>
                    </>
                  )}
                </div>
              </div>
            ))}

            <div className="bg-white/5 p-5 rounded-xl border border-white/10">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-0.5">{t('contacts.workHours')}</p>
                  <p className="text-white font-medium">{t('contacts.workHours.value')}</p>
                </div>
              </div>
            </div>

            <div className="bg-white/5 p-5 rounded-xl border border-white/10">
              <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-3">{t('contacts.social')}</p>
              <div className="flex items-center gap-3">
                {[
                  { label: 'TG', href: '#' },
                  { label: 'VK', href: '#' },
                  { label: 'IG', href: '#' },
                ].map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    className="w-10 h-10 rounded-full bg-white/10 hover:bg-blue-600/30 flex items-center justify-center text-xs font-bold text-gray-300 hover:text-blue-400 transition-all hover:scale-110"
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-white/5 p-6 rounded-xl border border-white/10 sticky top-24">
              {sent ? (
                <div className="text-center py-8">
                  <div className="w-14 h-14 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-7 h-7 text-green-400" />
                  </div>
                  <h3 className="text-lg font-bold mb-1">{t('contacts.form.success')}</h3>
                  <p className="text-sm text-gray-400">{t('contacts.form.successDesc')}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h2 className="text-lg font-bold mb-1">{t('contacts.form.title')}</h2>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1.5 font-medium">{t('contacts.form.name')}</label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                      placeholder={t('contacts.form.namePlaceholder')}
                      className="w-full bg-white/10 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white placeholder-gray-500 outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1.5 font-medium">{t('contacts.form.email')}</label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                      placeholder={t('contacts.form.emailPlaceholder')}
                      className="w-full bg-white/10 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white placeholder-gray-500 outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1.5 font-medium">{t('contacts.form.message')}</label>
                    <textarea
                      value={form.message}
                      onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                      placeholder={t('contacts.form.messagePlaceholder')}
                      rows={4}
                      className="w-full bg-white/10 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white placeholder-gray-500 outline-none focus:border-blue-500 transition-colors resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-xl transition-all shadow-lg hover:shadow-blue-600/30 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" /> {t('contacts.form.submit')}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
