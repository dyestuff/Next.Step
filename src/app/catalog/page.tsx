import { Bebas_Neue } from 'next/font/google'
import ProductCard from "@/components/ProductCard"
import Link from "next/link"
import { getServerTranslations } from "@/lib/i18n/server"

const bebas = Bebas_Neue({ subsets: ['latin'], weight: ['400'] })

const MAIN_BRANDS = ['Nike', 'Adidas', 'New Balance']

export default async function Page({ searchParams }: { searchParams: Promise<{ [key: string]: string }> }) {
  const { t } = await getServerTranslations()
  const res = await fetch('https://6a139f366c7db8aac0533714.mockapi.io/api/v1/products')

  if (!res.ok) {
    throw new Error(`Failed to fetch products: ${res.status}`)
  }

  const products = await res.json()
  const params = await searchParams

  const brand = params.brand
  const category = params.category
  const collection = params.collection

  let filtered: any[] = products

  if (brand === 'other') {
    filtered = filtered.filter((p: any) => !MAIN_BRANDS.includes(p.brand))
  } else if (brand) {
    filtered = filtered.filter((p: any) => p.brand === brand)
  }
  if (category) {
    filtered = filtered.filter((p: any) => p.category === category)
  }
  if (collection === "bestsellers") {
    filtered = filtered.filter((p: any) => p.isBestseller)
  }
  if (collection === "new") {
    filtered = filtered.filter((p: any) => p.isNew)
  }

  const categories = [
    { value: 'running', label: t('catalog.filter.category.running') },
    { value: 'basketball', label: t('catalog.filter.category.basketball') },
    { value: 'training', label: t('catalog.filter.category.training') },
    { value: 'casual', label: t('catalog.filter.category.casual') },
  ]

  const brands = [
    { value: 'Nike', label: 'Nike' },
    { value: 'Adidas', label: 'Adidas' },
    { value: 'New Balance', label: 'New Balance' },
    { value: 'other', label: t('catalog.filter.brand.other') },
  ]

  const collections = [
    { value: 'new', label: t('catalog.filter.collection.new') },
    { value: 'bestsellers', label: t('catalog.filter.collection.bestsellers') },
  ]

  const activeFiltersCount = [brand, category, collection].filter(Boolean).length

  return (
    <main className="flex flex-col min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <div className="container mx-auto px-4 py-12">
        <h1 className={`${bebas.className} text-5xl md:text-7xl font-bold text-white mb-8`}>
          {t('catalog.title')}
        </h1>

        {activeFiltersCount > 0 && (
          <div className="mb-6 flex items-center gap-4">
            <span className="text-gray-400 text-sm">
              {t('catalog.filter.active')} {activeFiltersCount}
            </span>
            <Link
              href="/catalog"
              className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors"
            >
              {t('catalog.filter.reset')}
            </Link>
          </div>
        )}

        <div className="mb-10">
          <h3 className="text-white font-semibold mb-3">{t('catalog.filter.category')}</h3>
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => {
              const isActive = category === cat.value
              const href = isActive ? '/catalog' : `/catalog?category=${cat.value}`
              return (
                <Link
                  key={cat.value}
                  href={href}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                      : 'bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white'
                  }`}
                >
                  {cat.label}
                </Link>
              )
            })}
          </div>
        </div>

        <div className="mb-10">
          <h3 className="text-white font-semibold mb-3">{t('catalog.filter.brand')}</h3>
          <div className="flex flex-wrap gap-2">
            {brands.map(brandItem => {
              const isActive = brand === brandItem.value
              const href = isActive ? '/catalog' : `/catalog?brand=${brandItem.value}`
              return (
                <Link
                  key={brandItem.value}
                  href={href}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                      : 'bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white'
                  }`}
                >
                  {brandItem.label}
                </Link>
              )
            })}
          </div>
        </div>

        <div className="mb-10">
          <h3 className="text-white font-semibold mb-3">{t('catalog.filter.collection')}</h3>
          <div className="flex flex-wrap gap-2">
            {collections.map(coll => {
              const isActive = collection === coll.value
              const href = isActive ? '/catalog' : `/catalog?collection=${coll.value}`
              return (
                <Link
                  key={coll.value}
                  href={href}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                      : 'bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white'
                  }`}
                >
                  {coll.label}
                </Link>
              )
            })}
          </div>
        </div>

        <section className="container mx-auto px-4 py-8">
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filtered.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-gray-400 text-lg mb-4">{t('catalog.empty')}</p>
              <Link
                href="/catalog"
                className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
              >
                {t('catalog.empty.link')}
              </Link>
            </div>
          )}
        </section>
      </div>
    </main>
  )
}