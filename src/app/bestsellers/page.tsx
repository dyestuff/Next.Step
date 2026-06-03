import { Bebas_Neue } from 'next/font/google'
const bebas = Bebas_Neue({ subsets: ['latin'], weight: ['400'] })
import ProductCard from "@/components/ProductCard";


export default async function Page() {
  const res = await fetch('https://6a139f366c7db8aac0533714.mockapi.io/api/v1/products')
  if (!res.ok) {
    throw Error(`Error: ${res.status}`);
  }

  const products = await res.json();

  return (
    <main className="flex flex-col bg-linear-to-br from-gray-900 via-gray-800 to-black">
      <div className="text-center lg:text-left mt-30 container mx-auto px-4">
      <h1 className={`${bebas.className} md:text-7xl lg:text-6xl font-bold text-white mb-6` }>Bestsellers</h1>
      <section>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 py-12">
            {products.map((p: any) => <ProductCard key={p.id} product={p} />)}
          </div>
      </section>
      </div>
      </main>
  )
}