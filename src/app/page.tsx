import type { Metadata } from "next";
import { Playfair_Display } from "next/font/google";
import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/types/product";
import ProductCard from "@/components/ProductCard";
import { Truck, Shield, RotateCcw, ArrowRight } from "lucide-react";

const playfair = Playfair_Display({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "Next Step Shop Main page",
}

export default async function Page() {
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
              Искусство ходьбы начинается с кроссовок.
            </p>
            <p className="text-gray-300 text-lg mb-10 max-w-lg mx-auto lg:mx-0">
              Премиальное качество. Бесплатная доставка.
            </p>
            <Link
              href="/catalog"
              className="inline-block px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl text-lg"
            >
              Перейти в каталог
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
              <h3 className="text-white font-semibold text-lg mb-2">Бесплатная доставка</h3>
              <p className="text-gray-400">Доставляем по всей России за 1-3 дня. Бесплатно при заказе от 5 000 ₽</p>
            </div>
            <div className="text-center p-6">
              <Shield className="w-10 h-10 text-blue-400 mx-auto mb-4" />
              <h3 className="text-white font-semibold text-lg mb-2">100% Оригинал</h3>
              <p className="text-gray-400">Работаем напрямую с брендами. Гарантия подлинности каждой пары</p>
            </div>
            <div className="text-center p-6">
              <RotateCcw className="w-10 h-10 text-blue-400 mx-auto mb-4" />
              <h3 className="text-white font-semibold text-lg mb-2">Лёгкий возврат</h3>
              <p className="text-gray-400">14 дней на возврат без вопросов. Примерьте дома в спокойной обстановке</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
            Новинки коллекции
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
              Смотреть все <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Готов сделать шаг?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Открой для себя идеальную пару кроссовок. Тысячи моделей от ведущих мировых брендов
            </p>
            <Link
              href="/catalog"
              className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-3 rounded-xl font-bold hover:bg-gray-100 transition-colors text-lg"
            >
              Перейти в каталог <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

