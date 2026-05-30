import { Bebas_Neue } from 'next/font/google'
import ProductCard from "@/components/ProductCard";
const bebas = Bebas_Neue({ subsets: ['latin'], weight: ['400'] })

export default async function Page({ searchParams }: { searchParams: Promise<{ [key: string]: string }> }) {
  const params = await searchParams
  const brand = params.brand
  const category = params.category
  const collection = params.collection

  let filtered = products
  if (brand) {0.
  }

   const res = await fetch('https://6a139f366c7db8aac0533714.mockapi.io/api/v1/products')
  const products = await res.json();

  if (!res.ok) {
    throw Error(`Error: ${res.status}`);
  }

  return (
    <main className="flex flex-col min-h-screen bg-linear-to-br from-gray-900 via-gray-800 to-black">
      <div className="container mx-auto px-4 py-12">
        <h1 className={`${bebas.className} text-5xl md:text-7xl font-bold text-white`}>
          CATALOG
        </h1>
      </div>

      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>
    </main>
  )
}