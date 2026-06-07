import Link from 'next/link'
import Image from 'next/image'
import type { Product } from '@/types/product'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const categoryLabels: Record<string, string> = {
    running: 'Running',
    casual: 'Lifestyle',
    training: 'Training',
    basketball: 'Basketball',
  }

  const categoryText = categoryLabels[product.category] || product.category

  return (
    <Link href={`/sneakers/${product.id}`} className="group block">
      <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
        <div className="relative aspect-[4/3] bg-gray-100">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 50vw, 25vw"
          />

          {product.isNew && (
            <div className="absolute top-3 left-3 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">
              NEW
            </div>
          )}
        </div>

        <div className="p-3 md:p-4">
          <h3 className="text-gray-900 font-bold text-sm md:text-lg leading-tight mb-1 group-hover:text-blue-600 transition-colors line-clamp-2">
            {product.name}
          </h3>

          <p className="text-gray-600 text-xs md:text-sm mb-1 md:mb-2">
            {product.brand}
          </p>

          <p className="text-gray-900 font-semibold text-base md:text-xl">
            ${product.price}
          </p>
        </div>
      </div>
    </Link>
  )
}