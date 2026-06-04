'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Package, ShoppingBag, TrendingUp, ArrowUpRight, ExternalLink } from 'lucide-react'
import { useOrderStore } from '@/app/lib/store/orders'

const API = 'https://6a139f366c7db8aac0533714.mockapi.io/api/v1/products'

interface Product {
  id: string; name: string; price: string; brand: string; category: string
}

export default function AdminDashboard() {
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

  const stats = [
    {
      icon: Package, label: 'Total Products', value: loading ? '…' : products.length,
      color: 'text-blue-400', bg: 'bg-blue-600/10',
      link: '/admin/products'
    },
    {
      icon: ShoppingBag, label: 'Total Orders', value: orders.length,
      color: 'text-emerald-400', bg: 'bg-emerald-600/10',
      link: '/admin/orders'
    },
    {
      icon: TrendingUp, label: 'Revenue',
      value: `$${orders.reduce((s, o) => s + o.total, 0).toFixed(2)}`,
      color: 'text-violet-400', bg: 'bg-violet-600/10',
      link: '/admin/orders'
    },
  ]

  return (
    <div className="p-4 md:p-8 space-y-8">
      <h1 className="text-2xl md:text-3xl font-bold">Dashboard</h1>

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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-lg">Recent Orders</h2>
            <Link href="/admin/orders" className="text-blue-400 text-xs hover:underline flex items-center gap-1">
              View All <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>
          {orders.length === 0 ? (
            <p className="text-gray-500 text-sm">No orders yet.</p>
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

        {/* Products Quick List */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-lg">Products</h2>
            <Link href="/admin/products/new" className="text-blue-400 text-xs hover:underline flex items-center gap-1">
              Add New <ExternalLink className="w-3 h-3" />
            </Link>
          </div>
          {loading ? (
            <p className="text-gray-500 text-sm">Loading…</p>
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
