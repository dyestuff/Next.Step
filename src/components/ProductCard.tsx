import Image from "next/image"
import type { Product } from '@/types/product'

export default function ProductCard({ product } : { product : Product }) {
  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
      <Image
        src={product.image}
        alt={`Изображение кроссовок ${product.name}`}
        width={350}
        height={150}
      />
      <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
      <p className="text-sm text-gray-500">{product.brand}</p>
      <p className="text-xl font-bold text-blue-600">{product.price}</p>
      {/*<p className="text-sm text-gray-700 line-clamp-3">{product.description}</p>*/}
    </div>
  )
}