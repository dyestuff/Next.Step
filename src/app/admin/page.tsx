'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { Package, ShoppingBag, TrendingUp, ArrowUpRight, ExternalLink, Calendar, DollarSign, Star } from 'lucide-react'
import { useOrderStore } from '@/app/lib/store/orders'
import { useTranslations } from '@/lib/i18n/useTranslations'

const API = 'https://6a139f366c7db8aac0533714.mockapi.io/api/v1/products'

interface Product {
  id: string; name: string; price: string; brand: string; category: string
}

export default function AdminDashboard() {
  const { t } = useTranslations()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const orders = useOrderStore(s => s.orders)

  useEffect(() => {
    fetch(API)
      .then(r => r.json())
      .then(setProducts)
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const analytics = useMemo(() => {
    const now = new Date()
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const weekStart = new Date(todayStart)
    weekStart.setDate(weekStart.getDate() - weekStart.getDay())

    const today = orders.filter(o => new Date(o.createdAt) >= todayStart)
    const thisWeek = orders.filter(o => new Date(o.createdAt) >= weekStart)
    const avgOrder = orders.length > 0
      ? orders.reduce((s, o) => s + o.total, 0) / orders.length
      : 0

    const freq: Record<string, { name: string; count: number; image: string }> = {}
    for (const order of orders) {
      for (const item of order.items) {
        if (!freq[item.id]) freq[item.id] = { name: item.name, count: 0, image: item.image }
        freq[item.id].count += item.quantity
      }
    }
    const popular = Object.values(freq).sort((a, b) => b.count - a.count).slice(0, 5)

    return { today: today.length, thisWeek: thisWeek.length, avgOrder, popular }
  }, [orders])

  const stats = [
    {
      icon: Package, label: t('admin.dashboard.totalProducts'), value: loading ? '…' : products.length,
      color: 'text-blue-400', bg: 'bg-blue-600/10',
      link: '/admin/products'
    },
    {
      icon: ShoppingBag, label: t('admin.dashboard.totalOrders'), value: orders.length,
      color: 'text-emerald-400', bg: 'bg-emerald-600/10',
      link: '/admin/orders'
    },
    {
      icon: TrendingUp, label: t('admin.dashboard.revenue'),
      value: `$${orders.reduce((s, o) => s + o.total, 0).toFixed(2)}`,
      color: 'text-violet-400', bg: 'bg-violet-600/10',
      link: '/admin/orders'
    },
  ]

  const miniStats = [
    { icon: Calendar, label: t('admin.dashboard.today'), value: analytics.today, color: 'text-yellow-400' },
    { icon: Calendar, label: t('admin.dashboard.thisWeek'), value: analytics.thisWeek, color: 'text-orange-400' },
    { icon: DollarSign, label: t('admin.dashboard.avgOrder'), value: `$${analytics.avgOrder.toFixed(2)}`, color: 'text-emerald-400' },
  ]

  return (
    <div className="p-4 md:p-8 space-y-8">
      <h1 className="text-2xl md:text-3xl font-bold">{t('admin.dashboard.title')}</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map(({ icon: Icon, label, value, color, bg, link }) => (
          <Link key={label} href={link}
            className={`${bg} border border-white/10 rounded-2xl p-5 hover:scale-[1.02] active:scale-[0.98] transition-all`}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-10 h-10 ${bg} rounded-xl flex items-center justify-center ${color}`}>
                <Icon className="w-5 h-5" />
              </div>
              <span className="text-xs text-gray-400 uppercase tracking-wider">{label}</span>
            </div>
            <p className="text-2xl font-bold">{value}</p>
          </Link>
        ))}
      </div>

      {orders.length > 0 && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {miniStats.map(({ icon: Icon, label, value, color }) => (
              <div key={label}
                className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center gap-4"
              >
                <div className={`w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center ${color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wider">{label}</p>
                  <p className="text-xl font-bold">{value}</p>
                </div>
              </div>
            ))}
          </div>

          {analytics.popular.length > 0 && (
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <Star className="w-4 h-4 text-yellow-400" />
                <h2 className="font-bold text-lg">{t('admin.dashboard.popular')}</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                {analytics.popular.map((item, i) => (
                  <div key={i} className="bg-white/5 rounded-xl p-3 flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/10 rounded-lg overflow-hidden shrink-0">
                      <img src={item.image} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium truncate">{item.name}</p>
                      <p className="text-xs text-gray-400">{item.count} {t('admin.dashboard.sold')}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-lg">{t('admin.dashboard.recentOrders')}</h2>
            <Link href="/admin/orders" className="text-blue-400 text-xs hover:underline flex items-center gap-1">
              {t('admin.dashboard.viewAll')} <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>
          {orders.length === 0 ? (
            <p className="text-gray-500 text-sm">{t('admin.dashboard.noOrders')}</p>
          ) : (
            <div className="space-y-2">
              {orders.slice(-5).reverse().map(order => (
                <div key={order.id} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                  <div>
                    <p className="font-medium text-sm">{order.id}</p>
                    <p className="text-xs text-gray-400">{order.shipping.firstName} {order.shipping.lastName}</p>
                  </div>
                  <span className="text-sm font-bold">${order.total.toFixed(2)}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-lg">{t('admin.dashboard.products')}</h2>
            <Link href="/admin/products/new" className="text-blue-400 text-xs hover:underline flex items-center gap-1">
              {t('admin.dashboard.addNew')} <ExternalLink className="w-3 h-3" />
            </Link>
          </div>
          {loading ? (
            <p className="text-gray-500 text-sm">{t('admin.dashboard.loading')}</p>
          ) : (
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {products.slice(0, 10).map(p => (
                <Link key={p.id} href={`/admin/products/${p.id}/edit`}
                  className="flex items-center justify-between py-2 border-b border-white/5 last:border-0 hover:bg-white/5 rounded-lg px-2 -mx-2 transition-colors"
                >
                  <p className="text-sm truncate">{p.name}</p>
                  <span className="text-xs text-gray-400 shrink-0 ml-3">${p.price}</span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
