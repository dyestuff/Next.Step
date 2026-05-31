import Link from 'next/link';
import { Star, Ruler, HelpCircle, Info } from 'lucide-react';

export default function HelpPage() {
  const reviews = [
    { id: 1, name: 'Алексей', rating: 5, text: 'Отличный магазин! Кроссовки пришли быстро, размерная сетка совпала идеально.' },
    { id: 2, name: 'Мария', rating: 4, text: 'Выбираю здесь уже второй раз. Нравится, что можно почитать про технологии подошвы.' },
    { id: 3, name: 'Дмитрий', rating: 5, text: 'Взял New Balance для бега. Ноги не устают даже после 10 км. Рекомендую!' },
  ];

  return (
    <main className="min-h-screen bg-linear-to-br from-gray-900 via-gray-800 to-black">
      <div className="container mx-auto px-4 py-16">

        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Нужна помощь?</h1>
          <p className="text-gray-400 text-lg">Мы собрали всё, что нужно знать перед покупкой</p>
        </div>

        <nav className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          <Link href="#visual-guide" className="group flex items-center gap-4 p-6 bg-white/5 rounded-xl hover:bg-white/10 transition-colors border border-white/10">
            <HelpCircle className="w-8 h-8 text-blue-500" />
            <span className="text-lg font-medium">Визуальный гид</span>
          </Link>
          <Link href="#running-guide" className="group flex items-center gap-4 p-6 bg-white/5 rounded-xl hover:bg-white/10 transition-colors border border-white/10">
            <Info className="w-8 h-8 text-green-500" />
            <span className="text-lg font-medium">Как выбрать для бега?</span>
          </Link>
          <Link href="#size-guide" className="group flex items-center gap-4 p-6 bg-white/5 rounded-xl hover:bg-white/10 transition-colors border border-white/10">
            <Ruler className="w-8 h-8 text-orange-500" />
            <span className="text-lg font-medium">Размерный помощник</span>
          </Link>
          <Link href="#reviews" className="group flex items-center gap-4 p-6 bg-white/5 rounded-xl hover:bg-white/10 transition-colors border border-white/10">
            <Star className="w-8 h-8 text-yellow-500" />
            <span className="text-lg font-medium">Отзывы и оценки</span>
          </Link>
        </nav>

        <section id="visual-guide" className="mb-24 scroll-mt-24">
          <h2 className="text-3xl font-bold mb-8 border-b border-gray-700 pb-4">Визуальный гид</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-800 p-6 rounded-xl">
              <h3 className="text-xl font-semibold text-blue-400 mb-2">🏃 Беговые (Running)</h3>
              <p className="text-gray-300 mb-4">Лёгкие, с хорошей амортизацией. Подошва часто имеет перепад высоты для толчка.</p>
              <div className="h-32 bg-gray-700 rounded-lg flex items-center justify-center text-gray-500">[Фото беговой подошвы]</div>
            </div>
            <div className="bg-gray-800 p-6 rounded-xl">
              <h3 className="text-xl font-semibold text-orange-400 mb-2">🏋️ Тренировочные (Training)</h3>
              <p className="text-gray-300 mb-4">Плоская, устойчивая подошва. Жёсткая поддержка стопы для подъёма весов.</p>
              <div className="h-32 bg-gray-700 rounded-lg flex items-center justify-center text-gray-500">[Фото тренировочной подошвы]</div>
            </div>
          </div>
        </section>

        <section id="running-guide" className="mb-24 scroll-mt-24">
          <h2 className="text-3xl font-bold mb-8 border-b border-gray-700 pb-4">Как выбрать кроссовки для бега?</h2>
          <div className="space-y-6 text-gray-300">
            <div>
              <h3 className="text-xl text-white font-semibold mb-2">1. Определите тип пронации</h3>
              <p>Посмотрите на свою старую обувь. Если подошва стёрта по внутреннему краю — у вас гиперпронация (нужна поддержка). Если равномерно — нейтральная.</p>
            </div>
            <div>
              <h3 className="text-xl text-white font-semibold mb-2">2. Выберите покрытие</h3>
              <p>Для асфальта нужны модели с мягкой пеной (Boost, ZoomX). Для грунта (трейл) — с агрессивным протектором.</p>
            </div>
            <div className="p-4 bg-blue-900/30 border border-blue-500/30 rounded-lg">
              <p className="text-blue-200">💡 <strong>Совет:</strong> Для марафонов берите модели на полразмера больше, так как нога отекает на дистанции.</p>
            </div>
          </div>
        </section>

        <section id="size-guide" className="mb-24 scroll-mt-24">
          <h2 className="text-3xl font-bold mb-8 border-b border-gray-700 pb-4">Размерная сетка</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-800 text-gray-400 uppercase text-sm">
                  <th className="p-4 border-b border-gray-700">EU (Европа)</th>
                  <th className="p-4 border-b border-gray-700">US (США)</th>
                  <th className="p-4 border-b border-gray-700">UK (Британия)</th>
                  <th className="p-4 border-b border-gray-700">CM (Длина стопы)</th>
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
          <p className="mt-4 text-sm text-gray-400 italic">* Измерьте стопу линейкой от пятки до кончика большого пальца и выберите ближайший размер.</p>
        </section>

        <section id="reviews" className="mb-12 scroll-mt-24">
          <h2 className="text-3xl font-bold mb-8 border-b border-gray-700 pb-4">Отзывы покупателей</h2>
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
                <p className="text-gray-300 mb-4 italic">"{review.text}"</p>
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


