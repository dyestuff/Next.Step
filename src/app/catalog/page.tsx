import { Bebas_Neue } from 'next/font/google'
import ProductCard from "@/components/ProductCard";
import Link from "next/link";
const bebas = Bebas_Neue({ subsets: ['latin'], weight: ['400'] })

export default async function Page({ searchParams }: { searchParams: Promise<{ [key: string]: string }> }) {
  const params = await searchParams
  const brand = params.brand
  const category = params.category
  const collection = params.collection
  const filtered = filter.

  // let filtered = products
  if (brand) filtered = filtered.filter(p => p.brand === brand)
  if (category) filtered = filtered.filter(p => p.category === category)
  if (collection === "bestsellers") filtered = filtered.filter(p => p.isBestseller)
  if (collection === "new") filtered = filtered.filter(p => p.isNew)

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
      {/*{filtered.map(p => <ProductCard key={p.id} product={p} />)}*/}
      <Link href="/catalogs?category=running">Для бега</Link>
      <Link href="/catalogs?category=basketball">Для баскетбола</Link>
      <Link href="/catalogs?category=training">Для тренировок</Link>
      <Link href="/catalogs?category=Повседневные">Повседневные</Link>
      <Link href="/catalogs?brand=Nike">Nike</Link>
      <Link href="/catalogs?brand=Nike">Adidas</Link>
      <Link href="/catalogs?brand=Nike">New Balance</Link>
      <Link href="/catalogs?brand=Nike">Другие</Link>
      <Link href="/catalogs?collection=new">Новинки</Link>
      <Link href="/catalogs?collection=bestsellers">Лидеры продаж</Link>
      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>
    </main>
  )
}