'use client'

import { useCartStore } from '@/app/lib/store/cart'
import Image from 'next/image'
import Link from 'next/link'
import { Trash2, Minus, Plus, ArrowRight, ShoppingCart, Tag } from 'lucide-react'

export default function CartPage() {
  const items = useCartStore(state => state.items)
  const removeItem = useCartStore(state => state.removeItem)
  const updateQuantity = useCartStore(state => state.updateQuantity)
  const getTotalPrice = useCartStore(state => state.getTotalPrice)
  const clearCart = useCartStore(state => state.clearCart)

  const total = getTotalPrice()
  const itemCount = items.reduce((acc, i) => acc + i.quantity, 0)

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white flex items-center justify-center px-4">
        <div className="text-center">
          <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingCart className="w-10 h-10 text-gray-500" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Корзина пуста</h2>
          <p className="text-gray-400 mb-8">Добавьте товары из каталога, чтобы оформить заказ</p>
          <Link
            href="/catalog"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl font-semibold transition-all hover:scale-105 shadow-lg shadow-blue-600/20"
          >
            Перейти в каталог <ArrowRight className="w-4 h-4" />
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
            Корзина <span className="text-gray-500 text-2xl font-normal">({itemCount})</span>
          </h1>
          <button onClick={clearCart} className="text-sm text-gray-400 hover:text-red-400 underline transition-colors">
            Очистить всё
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Список товаров */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div key={`${item.id}-${item.size}`} className="flex gap-4 bg-white/5 p-4 rounded-xl border border-white/10 hover:border-white/20 transition-colors">
                <div className="relative w-24 h-24 bg-white rounded-lg overflow-hidden flex-shrink-0">
                  <Image src={item.image} alt={item.name} fill className="object-cover" />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-lg leading-tight">{item.name}</h3>
                    <p className="text-sm text-gray-400 mt-1">{item.brand} · Размер EU: {item.size}</p>
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
                        aria-label="Удалить товар"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white/5 p-6 rounded-xl border border-white/10 sticky top-24">
              <h2 className="text-xl font-bold mb-4">Ваш заказ</h2>
              <div className="space-y-3 mb-6 text-gray-300 text-sm">
                <div className="flex justify-between">
                  <span>Товары ({itemCount} шт.)</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Доставка</span>
                  <span className="text-green-400 flex items-center gap-1"><Tag className="w-3 h-3" /> Бесплатно</span>
                </div>
              </div>
              <div className="border-t border-white/10 pt-4 mb-6">
                <div className="flex justify-between text-2xl font-bold">
                  <span>Итого</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 px-4 rounded-xl transition-all shadow-lg hover:shadow-blue-600/30 hover:scale-[1.02] active:scale-[0.98]">
                Оформить заказ
              </button>
              <p className="text-xs text-gray-500 text-center mt-3">
                Оплата при получении или картой онлайн
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}