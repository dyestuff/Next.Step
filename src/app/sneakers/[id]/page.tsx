'use client'

import { useState, useEffect, use } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ShoppingCart, Check, AlertCircle, ChevronDown, ChevronUp, HelpCircle, Ruler, Truck, Shield, RotateCcw } from 'lucide-react'
import { useCartStore } from '@/app/lib/store/cart'
import type { Product } from '@/types/product'

const SIZE_CHART = [
  { eu: 38, us: 6, uk: 5.5, cm: 24.0 },
  { eu: 39, us: 7, uk: 6, cm: 24.5 },
  { eu: 40, us: 7.5, uk: 6.5, cm: 25.0 },
  { eu: 41, us: 8.5, uk: 7.5, cm: 26.0 },
  { eu: 42, us: 9, uk: 8, cm: 26.5 },
  { eu: 43, us: 10, uk: 9, cm: 27.0 },
  { eu: 44, us: 11, uk: 10, cm: 27.5 },
  { eu: 45, us: 12, uk: 11, cm: 28.0 },
]

const CATEGORY_LABELS: Record<string, string> = {
  running: 'Беговые',
  casual: 'Повседневные',
  training: 'Тренировочные',
  basketball: 'Баскетбольные',
}

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedSize, setSelectedSize] = useState<number | null>(null)
  const [showSizeChart, setShowSizeChart] = useState(false)
  const [cartStatus, setCartStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const addItem = useCartStore(state => state.addItem)

  useEffect(() => {
    fetch(`https://6a139f366c7db8aac0533714.mockapi.io/api/v1/products/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('Product not found')
        return res.json()
      })
      .then((data) => {
        setProduct(data)
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
        setProduct(null)
      })
  }, [id])

  const handleAddToCart = () => {
    if (!selectedSize) {
      setCartStatus('error')
      setTimeout(() => setCartStatus('idle'), 2500)
      return
    }

    if (product) {
      addItem({
        id: product.id,
        name: product.name,
        brand: product.brand,
        price: product.price,
        image: product.image,
        size: selectedSize
      })
    }

    setCartStatus('success')
    setTimeout(() => setCartStatus('idle'), 2000)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-3xl font-bold text-white mb-4">Товар не найден</h2>
        <Link href="/catalog" className="text-blue-400 hover:text-blue-300 transition-colors">
          Вернуться в каталог
        </Link>
      </div>
    )
  }

  const categoryText = CATEGORY_LABELS[product.category] || product.category

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        <Link
          href="/catalog"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Назад в каталог
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 mb-16">
          <div className="relative aspect-square bg-white rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover object-center"
              priority
            />
          </div>

          <div className="flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-4">
              {product.isNew && (
                <span className="bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                  NEW
                </span>
              )}
              {product.isBestseller && (
                <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                  ХИТ ПРОДАЖ
                </span>
              )}
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 leading-tight">
              {product.name}
            </h1>
            <p className="text-xl text-gray-400 mb-6">
              {product.brand} · {categoryText}
            </p>

            <div className="text-4xl font-bold text-blue-400 mb-6">
              ${product.price}
            </div>

            <p className="text-gray-300 text-lg mb-8 leading-relaxed max-w-xl">
              {product.description}
            </p>

            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-white font-semibold">Выберите размер:</h3>
                <button
                  onClick={() => setShowSizeChart(!showSizeChart)}
                  className="flex items-center gap-1 text-sm text-blue-400 hover:text-blue-300 transition-colors"
                >
                  <Ruler className="w-4 h-4" />
                  Таблица размеров
                  {showSizeChart ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
              </div>

              <div className="flex flex-wrap gap-3 mb-2">
                {product.sizes?.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-14 h-14 rounded-lg font-semibold transition-all duration-200 border-2 ${
                      selectedSize === size
                        ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-600/30 scale-105'
                        : 'bg-white/10 border-white/20 text-gray-300 hover:bg-white/20 hover:border-white/40'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>

              {cartStatus === 'error' && (
                <p className="text-red-400 text-sm flex items-center gap-2 mt-2 animate-pulse">
                  <AlertCircle className="w-4 h-4" />
                  Пожалуйста, выберите размер
                </p>
              )}
            </div>

            {showSizeChart && (
              <div className="mb-8 bg-white/5 rounded-xl p-4 border border-white/10 animate-fadeIn">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10 text-gray-400">
                      <th className="py-2 text-left">EU</th>
                      <th className="py-2 text-left">US</th>
                      <th className="py-2 text-left">UK</th>
                      <th className="py-2 text-left">CM</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-300">
                    {SIZE_CHART.map((row) => (
                      <tr key={row.eu} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                        <td className="py-2 font-medium">{row.eu}</td>
                        <td className="py-2">{row.us}</td>
                        <td className="py-2">{row.uk}</td>
                        <td className="py-2">{row.cm}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p className="text-xs text-gray-500 mt-3 italic">
                  * Измерьте стопу от пятки до кончика большого пальца. Если значение между размерами, берите больший.
                </p>
              </div>
            )}

            <button
              onClick={handleAddToCart}
              disabled={cartStatus === 'success'}
              className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-3 shadow-lg ${
                cartStatus === 'success'
                  ? 'bg-green-600 hover:bg-green-700 shadow-green-600/30'
                  : 'bg-blue-600 hover:bg-blue-700 hover:shadow-blue-600/30 hover:scale-[1.02]'
              }`}
            >
              {cartStatus === 'success' ? (
                <>
                  <Check className="w-6 h-6" />
                  Добавлено в корзину
                </>
              ) : (
                <>
                  <ShoppingCart className="w-6 h-6" />
                  Добавить в корзину
                </>
              )}
            </button>

            <div className="mt-8 grid grid-cols-3 gap-4">
              <div className="text-center p-3 bg-white/5 rounded-lg border border-white/10">
                <Truck className="w-5 h-5 text-blue-400 mx-auto mb-1" />
                <p className="text-xs text-gray-400">Доставка 1-3 дня</p>
              </div>
              <div className="text-center p-3 bg-white/5 rounded-lg border border-white/10">
                <Shield className="w-5 h-5 text-blue-400 mx-auto mb-1" />
                <p className="text-xs text-gray-400">Оригинал 100%</p>
              </div>
              <div className="text-center p-3 bg-white/5 rounded-lg border border-white/10">
                <RotateCcw className="w-5 h-5 text-blue-400 mx-auto mb-1" />
                <p className="text-xs text-gray-400">Возврат 14 дней</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 mt-8">
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-blue-400" />
            Нужна помощь?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              href="/help#size-guide"
              className="block p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 hover:border-blue-500/50 transition-all group"
            >
              <p className="text-gray-300 group-hover:text-white font-medium">Как определить свой размер?</p>
              <p className="text-sm text-gray-500 mt-1">Подробная инструкция и таблица соответствия</p>
            </Link>
            <Link
              href="/help#running-guide"
              className="block p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 hover:border-blue-500/50 transition-all group"
            >
              <p className="text-gray-300 group-hover:text-white font-medium">Как выбрать кроссовки для бега?</p>
              <p className="text-sm text-gray-500 mt-1">Гид по пронации, покрытию и дистанциям</p>
            </Link>
            <Link
              href="/help"
              className="block p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 hover:border-blue-500/50 transition-all group"
            >
              <p className="text-gray-300 group-hover:text-white font-medium">Все разделы помощи</p>
              <p className="text-sm text-gray-500 mt-1">Визуальный гид, отзывы и поддержка</p>
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}