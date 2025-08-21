import { Metadata } from 'next'
import { getLocale } from 'next-intl/server'

export interface SEOConfig {
  title: string
  description: string
  keywords?: string[]
  canonical?: string
  ogImage?: string
  ogType?: 'website' | 'article'
  publishedTime?: string
  modifiedTime?: string
  authors?: string[]
  category?: string
  locale?: string
}

const defaultSEO = {
  siteName: 'Tech Interview Consultant',
  domain: 'https://techinterview.dev', // Update with actual domain
  twitterHandle: '@techinterviewdev',
  defaultImage: '/og-image.jpg',
  defaultKeywords: [
    'tech interview',
    'algorithms',
    'system design',
    'coding interview',
    'software engineer',
    'interview preparation',
    'GenAI interview',
    'technical interview coaching'
  ]
}

export async function generateSEOMetadata(config: SEOConfig): Promise<Metadata> {
  const locale = await getLocale()
  const currentLocale = config.locale || locale
  
  const title = config.title
  const description = config.description
  const canonical = config.canonical ? `${defaultSEO.domain}${config.canonical}` : undefined
  const ogImage = config.ogImage || defaultSEO.defaultImage
  const keywords = [...defaultSEO.defaultKeywords, ...(config.keywords || [])]

  return {
    title,
    description,
    keywords: keywords.join(', '),
    authors: config.authors?.map(name => ({ name })),
    category: config.category,
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: defaultSEO.siteName,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        }
      ],
      locale: currentLocale,
      type: config.ogType || 'website',
      publishedTime: config.publishedTime,
      modifiedTime: config.modifiedTime,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      site: defaultSEO.twitterHandle,
      images: [ogImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    alternates: {
      canonical,
      languages: {
        'en': canonical ? canonical.replace(`/${currentLocale}`, '/en') : undefined,
        'zh-Hans': canonical ? canonical.replace(`/${currentLocale}`, '/zh-Hans') : undefined,
        'zh-Hant': canonical ? canonical.replace(`/${currentLocale}`, '/zh-Hant') : undefined,
      }
    }
  }
}

export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${defaultSEO.domain}${item.url}`
    }))
  }
}

export function generateArticleSchema(article: {
  title: string
  description: string
  author: string
  publishedTime: string
  modifiedTime?: string
  image?: string
  url: string
  category?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    image: article.image || defaultSEO.defaultImage,
    author: {
      '@type': 'Person',
      name: article.author
    },
    publisher: {
      '@type': 'Organization',
      name: defaultSEO.siteName,
      logo: {
        '@type': 'ImageObject',
        url: `${defaultSEO.domain}/logo.png`
      }
    },
    datePublished: article.publishedTime,
    dateModified: article.modifiedTime || article.publishedTime,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${defaultSEO.domain}${article.url}`
    },
    articleSection: article.category,
    url: `${defaultSEO.domain}${article.url}`
  }
}

export function generateCourseSchema(course: {
  title: string
  description: string
  instructor: string
  price?: number
  currency?: string
  image?: string
  url: string
  category?: string
  level?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: course.title,
    description: course.description,
    image: course.image || defaultSEO.defaultImage,
    instructor: {
      '@type': 'Person',
      name: course.instructor
    },
    provider: {
      '@type': 'Organization',
      name: defaultSEO.siteName,
      url: defaultSEO.domain
    },
    offers: course.price ? {
      '@type': 'Offer',
      price: course.price,
      priceCurrency: course.currency || 'USD',
      availability: 'https://schema.org/InStock'
    } : undefined,
    courseCode: course.category,
    educationalLevel: course.level,
    url: `${defaultSEO.domain}${course.url}`
  }
}

export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: defaultSEO.siteName,
    url: defaultSEO.domain,
    logo: `${defaultSEO.domain}/logo.png`,
    description: 'Professional tech interview preparation and coaching services for algorithms, system design, and GenAI interviews.',
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      email: 'hello@techinterview.dev'
    },
    sameAs: [
      defaultSEO.twitterHandle.replace('@', 'https://twitter.com/')
    ]
  }
}