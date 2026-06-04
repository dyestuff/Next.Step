import Image from 'next/image'
import Link from 'next/link'
import { Target, Award, Users, Globe, TrendingUp, Heart } from 'lucide-react'
import { getServerTranslations } from "@/lib/i18n/server"

export default async function AboutPage() {
  const { t } = await getServerTranslations()

  const stats = [
    { icon: Users, value: '50,000+', label: t('about.stats.clients') },
    { icon: Award, value: '150+', label: t('about.stats.brands') },
    { icon: Globe, value: '25', label: t('about.stats.countries') },
    { icon: TrendingUp, value: '8 лет', label: t('about.stats.years') },
  ]

  const values = [
    {
      icon: Target,
      title: t('about.values.quality.title'),
      description: t('about.values.quality.desc'),
    },
    {
      icon: Heart,
      title: t('about.values.care.title'),
      description: t('about.values.care.desc'),
    },
    {
      icon: Award,
      title: t('about.values.price.title'),
      description: t('about.values.price.desc'),
    },
  ]

  const team = [
    { name: 'Александр Петров', role: t('about.team.ceo'), image: '/team/ceo.jpg' },
    { name: 'Мария Иванова', role: t('about.team.buyer'), image: '/team/buyer.jpg' },
    { name: 'Дмитрий Соколов', role: t('about.team.cto'), image: '/team/cto.jpg' },
  ]

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
            {t('about.hero.title')}
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto mb-8">
            {t('about.hero.subtitle')}
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href="/catalog"
              className="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-xl font-semibold transition-all hover:scale-105 shadow-lg shadow-blue-600/30"
            >
              {t('about.hero.catalog')}
            </Link>
            <Link
              href="/contacts"
              className="bg-white/10 hover:bg-white/20 px-8 py-3 rounded-xl font-semibold transition-all border border-white/20"
            >
              {t('about.hero.contact')}
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white/5 border-y border-white/10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <stat.icon className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                {t('about.story.title')}
              </h2>
              <div className="space-y-4 text-gray-300 text-lg leading-relaxed">
                <p>{t('about.story.p1')}</p>
                <p>{t('about.story.p2')}</p>
                <p>{t('about.story.p3')}</p>
              </div>
            </div>
            <div className="relative aspect-square bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-2xl overflow-hidden">
              <Image
                src="/about-story.jpg"
                alt={t('about.hero.title')}
                fill
                className="object-cover"
              />
            </div>
          </div>

          <div className="mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              {t('about.values.title')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="bg-white/5 p-8 rounded-2xl border border-white/10 hover:border-blue-500/50 transition-all hover:transform hover:scale-105"
                >
                  <value.icon className="w-12 h-12 text-blue-400 mb-4" />
                  <h3 className="text-xl font-bold text-white mb-3">
                    {value.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-blue-900/30 to-purple-900/30">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">{t('about.mission.title')}</h2>
          <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            &ldquo;{t('about.mission.text')}&rdquo;
          </p>
          <div className="mt-8 flex justify-center">
            <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-600 rounded-full" />
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            {t('about.team.title')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="text-center">
                <div className="relative aspect-square bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-2xl overflow-hidden mb-4 mx-auto max-w-xs">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold text-white">{member.name}</h3>
                <p className="text-gray-400">{member.role}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-gray-500 mt-8 text-sm">
            {t('about.team.photoNote')}
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 md:p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {t('about.cta.title')}
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              {t('about.cta.desc')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder={t('about.cta.placeholder')}
                className="flex-1 px-6 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
              <button className="bg-white text-blue-600 px-8 py-3 rounded-xl font-bold hover:bg-gray-100 transition-colors">
                {t('about.cta.subscribe')}
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

