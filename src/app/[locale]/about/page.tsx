import { useTranslations } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import type { Metadata } from 'next'
import Link from 'next/link'
import { generateSEOMetadata } from '@/lib/seo'

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'about' })

  return {
    ...await generateSEOMetadata({
      title: t('meta.title'),
      description: t('meta.description'),
      canonical: `/${locale}/about`,
      locale
    }),
    metadataBase: new URL('http://localhost:3000'), // Use environment-specific base URL
  }
}

export default function AboutPage() {
  const t = useTranslations('about')

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {t('hero.title')}
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                {t('hero.description')}
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
                  {t('hero.experience')}
                </div>
                <div className="bg-secondary/10 text-secondary px-4 py-2 rounded-full text-sm font-medium">
                  {t('hero.companies')}
                </div>
                <div className="bg-accent/10 text-accent-foreground px-4 py-2 rounded-full text-sm font-medium">
                  {t('hero.students')}
                </div>
              </div>
            </div>
            <div className="relative">
              {/* Placeholder for hero image - replace with actual image when available */}
              <div className="w-full h-[400px] bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg shadow-2xl flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mb-4 mx-auto">
                    <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <p className="text-muted-foreground text-sm">{t('hero.imageAlt')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">
              {t('story.title')}
            </h2>
            <div className="prose prose-lg max-w-none text-muted-foreground">
              <p className="text-lg leading-relaxed mb-6">
                {t('story.paragraph1')}
              </p>
              <p className="text-lg leading-relaxed mb-6">
                {t('story.paragraph2')}
              </p>
              <p className="text-lg leading-relaxed">
                {t('story.paragraph3')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Expertise Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">
            {t('expertise.title')}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Algorithms */}
            <div className="bg-background p-6 rounded-lg shadow-sm border">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">{t('expertise.algorithms.title')}</h3>
              <p className="text-muted-foreground">{t('expertise.algorithms.description')}</p>
            </div>

            {/* System Design */}
            <div className="bg-background p-6 rounded-lg shadow-sm border">
              <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">{t('expertise.systemDesign.title')}</h3>
              <p className="text-muted-foreground">{t('expertise.systemDesign.description')}</p>
            </div>

            {/* GenAI */}
            <div className="bg-background p-6 rounded-lg shadow-sm border">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-accent-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">{t('expertise.genai.title')}</h3>
              <p className="text-muted-foreground">{t('expertise.genai.description')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">
            {t('achievements.title')}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">500+</div>
              <p className="text-muted-foreground">{t('achievements.studentsHelped')}</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-secondary mb-2">95%</div>
              <p className="text-muted-foreground">{t('achievements.successRate')}</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">50+</div>
              <p className="text-muted-foreground">{t('achievements.companies')}</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-secondary mb-2">10+</div>
              <p className="text-muted-foreground">{t('achievements.experience')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">
              {t('philosophy.title')}
            </h2>
            <blockquote className="text-2xl font-medium text-muted-foreground italic mb-8">
              &ldquo;{t('philosophy.quote')}&rdquo;
            </blockquote>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {t('philosophy.description')}
            </p>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-primary to-secondary rounded-2xl p-12 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">
              {t('cta.title')}
            </h2>
            <p className="text-xl mb-8 opacity-90">
              {t('cta.description')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/en/contact"
                className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                {t('cta.contactButton')}
              </Link>
              <Link
                href="/en/courses"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary transition-colors"
              >
                {t('cta.coursesButton')}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}