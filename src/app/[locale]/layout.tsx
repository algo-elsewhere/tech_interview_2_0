import { ReactNode } from 'react'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, getTranslations } from 'next-intl/server'
import { routing } from '@/i18n/routing'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { MainLayout } from '@/components/layout'
import { StructuredData } from '@/components/seo'
import { generateSEOMetadata, generateOrganizationSchema } from '@/lib/seo'

interface LocaleLayoutProps {
  children: ReactNode
  params: Promise<{ locale: string }>
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'meta' })

  return generateSEOMetadata({
    title: t('title'),
    description: t('description'),
    canonical: `/${locale}`,
    locale
  })
}

export default async function LocaleLayout({
  children,
  params
}: LocaleLayoutProps) {
  const { locale } = await params
  
  // Ensure that the incoming locale is valid
  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound()
  }

  const messages = await getMessages()
  const organizationSchema = generateOrganizationSchema()

  return (
    <html lang={locale}>
      <head>
        <StructuredData data={organizationSchema} />
      </head>
      <body>
        <NextIntlClientProvider messages={messages}>
          <MainLayout>
            {children}
          </MainLayout>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}