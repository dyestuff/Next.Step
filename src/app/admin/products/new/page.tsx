'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Save } from 'lucide-react'

const API = 'https://6a139f366c7db8aac0533714.mockapi.io/api/v1/products'

const CATEGORIES = ['training', 'running', 'lifestyle', 'basketball', 'soccer']
const SIZES_PRESETS = ['36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46']

export default function AdminNewProductPage() {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({
    name: '', brand: '', price: '', category: 'lifestyle',
    description: '', image: '',
    sizes: '40,41,42,43,44',
  })

  const set = (key: string, value: string) => setForm(prev => ({ ...prev, [key]: value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    const body = {
      ...form,
      price: parseFloat(form.price) || 0,
      sizes: form.sizes.split(',').map(s => parseInt(s.trim())).filter(n => !isNaN(n)),
    }
    await fetch(API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    router.push('/admin/products')
  }

  const toggleSize = (size: string) => {
    const current = form.sizes.split(',').map(s => s.trim())
    const next = current.includes(size)
      ? current.filter(s => s !== size)
      : [...current, size]
    set('sizes', next.join(','))
  }

  const currentSizes = form.sizes.split(',').map(s => s.trim()).filter(Boolean)

  return (
    <div className="p-4 md:p-8 max-w-2xl space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/admin/products" className="p-2 hover:bg-white/10 rounded-lg text-gray-400 transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-2xl md:text-3xl font-bold">New Product</h1>
      </div>

      <form onSubmit={handleSubmit} className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Field label="Name" value={form.name} onChange={v => set('name', v)} required />
          <Field label="Brand" value={form.brand} onChange={v => set('brand', v)} required />
          <Field label="Price ($)" type="number" step="0.01" value={form.price} onChange={v => set('price', v)} required />
          <div>
            <label className="block text-xs text-gray-400 mb-1.5 font-medium">Category</label>
            <select
              value={form.category}
              onChange={e => set('category', e.target.value)}
              className="w-full bg-white/10 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white outline-none focus:border-blue-500 transition-colors"
            >
              {CATEGORIES.map(c => <option key={c} value={c} className="bg-gray-900">{c}</option>)}
            </select>
          </div>
        </div>

        <Field label="Image URL" value={form.image} onChange={v => set('image', v)} placeholder="https://example.com/image.jpg" />

        <div>
          <label className="block text-xs text-gray-400 mb-1.5 font-medium">Description</label>
          <textarea
            value={form.description}
            onChange={e => set('description', e.target.value)}
            rows={3}
            className="w-full bg-white/10 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white placeholder-gray-500 outline-none focus:border-blue-500 transition-colors resize-none"
          />
        </div>

        <div>
          <label className="block text-xs text-gray-400 mb-1.5 font-medium">Sizes</label>
          <div className="flex flex-wrap gap-2">
            {SIZES_PRESETS.map(size => {
              const active = currentSizes.includes(size)
              return (
                <button
                  key={size}
                  type="button"
                  onClick={() => toggleSize(size)}
                  className={`w-10 h-10 rounded-lg text-xs font-bold border transition-all ${
                    active
                      ? 'bg-blue-600 border-blue-500 text-white'
                      : 'bg-white/5 border-white/10 text-gray-400 hover:border-white/30'
                  }`}
                >
                  {size}
                </button>
              )
            })}
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          <Link href="/admin/products" className="text-sm text-gray-400 hover:underline">Cancel</Link>
          <button
            type="submit"
            disabled={saving}
            className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 font-bold px-6 py-2.5 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center gap-2"
          >
            <Save className="w-4 h-4" /> {saving ? 'Saving…' : 'Create Product'}
          </button>
        </div>
      </form>
    </div>
  )
}

function Field({
  label, value, onChange, type = 'text', required, placeholder, step,
}: {
  label: string; value: string; onChange: (v: string) => void; type?: string
  required?: boolean; placeholder?: string; step?: string
}) {
  return (
    <div>
      <label className="block text-xs text-gray-400 mb-1.5 font-medium">
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      <input
        type={type}
        step={step}
        value={value}
        onChange={e => onChange(e.target.value)}
        required={required}
        placeholder={placeholder}
        className="w-full bg-white/10 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white placeholder-gray-500 outline-none focus:border-blue-500 transition-colors"
      />
    </div>
  )
}
