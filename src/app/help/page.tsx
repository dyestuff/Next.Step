import Image from 'next/image';
import Link from 'next/link';
import { Star, Ruler, HelpCircle, Info } from 'lucide-react';
import { getServerTranslations } from "@/lib/i18n/server";

export default async function HelpPage() {
  const { t } = await getServerTranslations()

  const reviews = [
    { id: 1, name: 'Алексей', rating: 5, text: 'Отличный магазин! Кроссовки пришли быстро, размерная сетка совпала идеально.' },
    { id: 2, name: 'Мария', rating: 4, text: 'Выбираю здесь уже второй раз. Нравится, что можно почитать про технологии подошвы.' },
    { id: 3, name: 'Дмитрий', rating: 5, text: 'Взял New Balance для бега. Ноги не устают даже после 10 км. Рекомендую!' },
  ];

  return (
    <main className="min-h-screen bg-linear-to-br from-gray-900 via-gray-800 to-black">
      <div className="container mx-auto px-4 py-16">

        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t('help.title')}</h1>
          <p className="text-gray-400 text-lg">{t('help.subtitle')}</p>
        </div>

        <nav className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          <Link href="#visual-guide" className="group flex items-center gap-4 p-6 bg-white/5 rounded-xl hover:bg-white/10 transition-colors border border-white/10">
            <HelpCircle className="w-8 h-8 text-blue-500" />
            <span className="text-lg font-medium">{t('help.nav.visualGuide')}</span>
          </Link>
          <Link href="#running-guide" className="group flex items-center gap-4 p-6 bg-white/5 rounded-xl hover:bg-white/10 transition-colors border border-white/10">
            <Info className="w-8 h-8 text-green-500" />
            <span className="text-lg font-medium">{t('help.nav.running')}</span>
          </Link>
          <Link href="#size-guide" className="group flex items-center gap-4 p-6 bg-white/5 rounded-xl hover:bg-white/10 transition-colors border border-white/10">
            <Ruler className="w-8 h-8 text-orange-500" />
            <span className="text-lg font-medium">{t('help.nav.sizeGuide')}</span>
          </Link>
          <Link href="#reviews" className="group flex items-center gap-4 p-6 bg-white/5 rounded-xl hover:bg-white/10 transition-colors border border-white/10">
            <Star className="w-8 h-8 text-yellow-500" />
            <span className="text-lg font-medium">{t('help.nav.reviews')}</span>
          </Link>
        </nav>

        <section id="visual-guide" className="mb-24 scroll-mt-24">
          <h2 className="text-3xl font-bold mb-8 border-b border-gray-700 pb-4">{t('help.visual.title')}</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-gray-800 p-6 rounded-xl flex flex-col md:flex-row md:items-start md:gap-6">
              <div className="md:w-1/2 mb-4 md:mb-0">
                <h3 className="text-xl font-semibold text-blue-400 mb-2">{t('help.visual.running.title')}</h3>
                <p className="text-gray-300">{t('help.visual.running.desc')}</p>
              </div>
              <div className="relative w-full md:w-1/2 h-56 bg-gray-700 rounded-lg overflow-hidden">
                <Image src="/podoshva.webp" alt="Running shoe sole" fill className="object-contain p-2" />
              </div>
            </div>
            <div className="bg-gray-800 p-6 rounded-xl flex flex-col md:flex-row md:items-start md:gap-6">
              <div className="md:w-1/2 mb-4 md:mb-0">
                <h3 className="text-xl font-semibold text-orange-400 mb-2">{t('help.visual.training.title')}</h3>
                <p className="text-gray-300">{t('help.visual.training.desc')}</p>
              </div>
              <div className="relative w-full md:w-1/2 h-56 bg-gray-700 rounded-lg overflow-hidden">
                <Image src="/training.jpg" alt="Training shoe sole" fill className="object-contain p-2" />
              </div>
            </div>
          </div>
        </section>

        <section id="running-guide" className="mb-24 scroll-mt-24">
          <h2 className="text-3xl font-bold mb-8 border-b border-gray-700 pb-4">{t('help.running.title')}</h2>
          <div className="space-y-6 text-gray-300">
            <div>
              <h3 className="text-xl text-white font-semibold mb-2">{t('help.running.step1.title')}</h3>
              <p>{t('help.running.step1.desc')}</p>
            </div>
            <div>
              <h3 className="text-xl text-white font-semibold mb-2">{t('help.running.step2.title')}</h3>
              <p>{t('help.running.step2.desc')}</p>
            </div>
            <div className="p-4 bg-blue-900/30 border border-blue-500/30 rounded-lg">
              <p className="text-blue-200">{t('help.running.tip')}</p>
            </div>
          </div>
        </section>

        <section id="size-guide" className="mb-24 scroll-mt-24">
          <h2 className="text-3xl font-bold mb-8 border-b border-gray-700 pb-4">{t('help.size.title')}</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-800 text-gray-400 uppercase text-sm">
                  <th className="p-4 border-b border-gray-700">{t('help.size.eu')}</th>
                  <th className="p-4 border-b border-gray-700">{t('help.size.us')}</th>
                  <th className="p-4 border-b border-gray-700">{t('help.size.uk')}</th>
                  <th className="p-4 border-b border-gray-700">{t('help.size.cm')}</th>
                </tr>
              </thead>
              <tbody className="text-gray-300">
                <tr className="border-b border-gray-700 hover:bg-white/5">
                  <td className="p-4 font-bold">38</td><td className="p-4">6</td><td className="p-4">5.5</td><td className="p-4">24.0</td>
                </tr>
                <tr className="border-b border-gray-700 hover:bg-white/5">
                  <td className="p-4 font-bold">39</td><td className="p-4">7</td><td className="p-4">6</td><td className="p-4">24.5</td>
                </tr>
                <tr className="border-b border-gray-700 hover:bg-white/5">
                  <td className="p-4 font-bold">40</td><td className="p-4">7.5</td><td className="p-4">6.5</td><td className="p-4">25.0</td>
                </tr>
                <tr className="border-b border-gray-700 hover:bg-white/5">
                  <td className="p-4 font-bold">41</td><td className="p-4">8.5</td><td className="p-4">7.5</td><td className="p-4">26.0</td>
                </tr>
                <tr className="border-b border-gray-700 hover:bg-white/5">
                  <td className="p-4 font-bold">42</td><td className="p-4">9</td><td className="p-4">8</td><td className="p-4">26.5</td>
                </tr>
                <tr className="border-b border-gray-700 hover:bg-white/5">
                  <td className="p-4 font-bold">43</td><td className="p-4">10</td><td className="p-4">9</td><td className="p-4">27.0</td>
                </tr>
                <tr className="border-b border-gray-700 hover:bg-white/5">
                  <td className="p-4 font-bold">44</td><td className="p-4">11</td><td className="p-4">10</td><td className="p-4">27.5</td>
                </tr>
                <tr className="border-b border-gray-700 hover:bg-white/5">
                  <td className="p-4 font-bold">45</td><td className="p-4">12</td><td className="p-4">11</td><td className="p-4">28.0</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-sm text-gray-400 italic">* {t('help.size.note')}</p>
        </section>

        <section id="reviews" className="mb-12 scroll-mt-24">
          <h2 className="text-3xl font-bold mb-8 border-b border-gray-700 pb-4">{t('help.reviews.title')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((review) => (
              <div key={review.id} className="bg-gray-800 p-6 rounded-xl border border-white/5">
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'fill-current' : 'text-gray-600'}`} />
                    ))}
                  </div>
                  <span className="text-sm text-gray-400">{review.rating}/5</span>
                </div>
                <p className="text-gray-300 mb-4 italic">&ldquo;{review.text}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center font-bold text-sm">
                    {review.name[0]}
                  </div>
                  <span className="font-semibold">{review.name}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </main>
  );
}
