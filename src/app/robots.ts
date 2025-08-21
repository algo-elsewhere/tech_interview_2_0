import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://techinterview.dev' // Update with actual domain

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/_next/',
          '/admin/',
          '/.well-known/',
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}