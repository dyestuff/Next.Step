import type { Metadata } from "next";
import { Inter } from 'next/font/google';
import Link from "next/link";
import Image from "next/image";

export const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "Next Step Shop Main page",
}

export default function Page() {
  return (
    <main className="flex flex-col min-h-screen bg-linear-to-br from-gray-900 via-gray-800 to-black">
      <div className="container mx-auto px-4 flex-1 flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-20">

          {/* Текстовая часть */}
          <div className="text-center lg:text-left">
            <h1 className={`${inter.className} antialiased text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6`}>
              Next Step
            </h1>

            <p className={`${inter.className} antialiased text-emerald-400 text-xl md:text-2xl mb-8`}>
              Искусство ходьбы начинается с кроссовок.
            </p>

            <p className={`${inter.className} antialiased text-gray-300 text-lg mb-10 max-w-lg mx-auto lg:mx-0`}>
              Премиальное качество. Бесплатная доставка.
            </p>

            <Link
              href="/catalog"
              className={`${inter.className} inline-block px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl text-lg`}
            >
              Перейти в каталог
            </Link>
          </div>

          {/* Изображение */}
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
      </div>
    </main>
  );
}