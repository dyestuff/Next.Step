import type { Metadata } from "next";
import { Playfair_Display } from "next/font/google";
import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/types/product";
import ProductCard from "@/components/ProductCard";
import { Truck, Shield, RotateCcw, ArrowRight } from "lucide-react";
import { getServerTranslations } from "@/lib/i18n/server";

const playfair = Playfair_Display({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "Next Step Shop Main page",
}

export default async function Page() {
  const { t } = await getServerTranslations()

  let featured: Product[] = []
  try {
    const res = await fetch('https://6a139f366c7db8aac0533714.mockapi.io/api/v1/products')
    if (res.ok) {
      const products = await res.json()
      featured = products.slice(0, 4)
    }
  } catch {}

  return (
    <main className="flex flex-col bg-linear-to-br from-gray-900 via-gray-800 to-black">

      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-24 md:py-32">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6">
              Next Step
            </h1>
            <p className={`${playfair.className} text-gray-200 text-xl md:text-2xl mb-8`}>
              {t('hero.tagline')}
            </p>
            <p className="text-gray-300 text-lg mb-10 max-w-lg mx-auto lg:mx-0">
              {t('hero.subtitle')}
            </p>
            <Link
              href="/catalog"
              className="inline-block px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl text-lg"
            >
              {t('hero.cta')}
            </Link>
          </div>
          <div className="relative hidden lg:block">
            <Image
              src="/MainPicture.png"
              width={600}
              height={600}
              alt="Main picture"
              className="object-contain drop-shadow-2xl"
              priority
            />
          </div>
        </div>
      </section>

      <section className="py-16 bg-white/5 border-y border-white/10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <Truck className="w-10 h-10 text-blue-400 mx-auto mb-4" />
              <h3 className="text-white font-semibold text-lg mb-2">{t('adv.delivery.title')}</h3>
              <p className="text-gray-400">{t('adv.delivery.desc')}</p>
            </div>
            <div className="text-center p-6">
              <Shield className="w-10 h-10 text-blue-400 mx-auto mb-4" />
              <h3 className="text-white font-semibold text-lg mb-2">{t('adv.original.title')}</h3>
              <p className="text-gray-400">{t('adv.original.desc')}</p>
            </div>
            <div className="text-center p-6">
              <RotateCcw className="w-10 h-10 text-blue-400 mx-auto mb-4" />
              <h3 className="text-white font-semibold text-lg mb-2">{t('adv.returns.title')}</h3>
              <p className="text-gray-400">{t('adv.returns.desc')}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
            {t('featured.title')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featured.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              href="/catalog"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-xl transition-all hover:scale-105 shadow-lg"
            >
              {t('featured.viewAll')} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}

