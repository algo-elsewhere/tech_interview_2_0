import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { ContactSection } from '@/components/contact/contact-section'
import { StructuredData } from '@/components/seo'
import { generateSEOMetadata, generateBreadcrumbSchema } from '@/lib/seo'

interface ContactPageProps {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'contact' })

  return generateSEOMetadata({
    title: t('meta.title'),
    description: t('meta.description'),
    canonical: `/${locale}/contact`,
    keywords: ['tech interview contact', 'interview coaching contact', 'consultation booking'],
    locale
  })
}

export default async function ContactPage({ params }: ContactPageProps) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'contact' })

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: `/${locale}` },
    { name: 'Contact', url: `/${locale}/contact` }
  ])

  return (
    <>
      <StructuredData data={breadcrumbSchema} />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold tracking-tight mb-4">
              {t('title')}
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl">
              {t('subtitle')}
            </p>
          </div>
          
          <ContactSection />
        </div>
      </main>
    </>
  )
}