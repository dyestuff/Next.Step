'use client'

import { useEffect, useState, useCallback } from 'react'
import Link from 'next/link'
import { Plus, Pencil, Trash2, Search } from 'lucide-react'
import { useTranslations } from '@/lib/i18n/useTranslations'

const API = 'https://6a139f366c7db8aac0533714.mockapi.io/api/v1/products'

interface Product {
  id: string; name: string; price: string; brand: string; category: string; image?: string
}

export default function AdminProductsPage() {
  const { t } = useTranslations()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [deleting, setDeleting] = useState<string | null>(null)

  const load = useCallback(() => {
    setLoading(true)
    fetch(API)
      .then(r => r.json())
      .then(setProducts)
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => { load() }, [load])

  const handleDelete = async (id: string) => {
    if (!confirm(t('admin.products.deleteConfirm'))) return
    setDeleting(id)
    await fetch(`${API}/${id}`, { method: 'DELETE' })
    setDeleting(null)
    load()
  }

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.brand.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="p-4 md:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl md:text-3xl font-bold">{t('admin.products.title')}</h1>
        <Link
          href="/admin/products/new"
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-xl text-sm font-bold transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          <Plus className="w-4 h-4" /> {t('admin.products.add')}
        </Link>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
        <input
          type="text"
          placeholder={t('admin.products.search')}
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full bg-white/10 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-gray-500 outline-none focus:border-blue-500 transition-colors"
        />
      </div>

      {loading ? (
        <p className="text-gray-500">{t('admin.products.loading')}</p>
      ) : filtered.length === 0 ? (
        <p className="text-gray-500">{search ? t('admin.products.noMatches') : t('admin.products.noProducts')}</p>
      ) : (
        <div className="overflow-x-auto border border-white/10 rounded-2xl">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-white/5 text-gray-400 uppercase tracking-wider text-xs">
                <th className="text-left px-4 py-3 font-medium">{t('admin.products.name')}</th>
                <th className="text-left px-4 py-3 font-medium">{t('admin.products.brand')}</th>
                <th className="text-left px-4 py-3 font-medium">{t('admin.products.category')}</th>
                <th className="text-right px-4 py-3 font-medium">{t('admin.products.price')}</th>
                <th className="text-right px-4 py-3 font-medium w-24">{t('admin.products.actions')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filtered.map(p => (
                <tr key={p.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-4 py-3 font-medium">{p.name}</td>
                  <td className="px-4 py-3 text-gray-400">{p.brand}</td>
                  <td className="px-4 py-3">
                    <span className="bg-white/10 px-2.5 py-0.5 rounded-full text-xs">
                      {p.category}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right font-bold">${p.price}</td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Link
                        href={`/admin/products/${p.id}/edit`}
                        className="p-2 hover:bg-white/10 rounded-lg text-gray-400 hover:text-blue-400 transition-colors"
                      >
                        <Pencil className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => handleDelete(p.id)}
                        disabled={deleting === p.id}
                        className="p-2 hover:bg-red-500/10 rounded-lg text-gray-400 hover:text-red-400 transition-colors disabled:opacity-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
