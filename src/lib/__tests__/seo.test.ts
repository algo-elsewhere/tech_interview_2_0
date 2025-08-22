import { describe, it, expect, vi } from 'vitest'
import { 
  generateSEOMetadata, 
  generateBreadcrumbSchema, 
  generateArticleSchema, 
  generateCourseSchema,
  generateOrganizationSchema 
} from '../seo'

// Mock getLocale
vi.mock('next-intl/server', () => ({
  getLocale: vi.fn().mockResolvedValue('en'),
}))

describe('SEO Utilities', () => {
  describe('generateSEOMetadata', () => {
    it('should generate basic SEO metadata', async () => {
      const config = {
        title: 'Test Page',
        description: 'Test description',
        keywords: ['test', 'page'],
        canonical: '/test',
        locale: 'en',
      }

      const metadata = await generateSEOMetadata(config)

      expect(metadata.title).toBe('Test Page')
      expect(metadata.description).toBe('Test description')
      expect(metadata.keywords).toBe('tech interview, algorithms, system design, coding interview, software engineer, interview preparation, GenAI interview, technical interview coaching, test, page')
      expect(metadata.openGraph?.title).toBe('Test Page')
      expect(metadata.openGraph?.description).toBe('Test description')
      expect(metadata.openGraph?.url).toBe('https://techinterview.dev/test')
      expect(metadata.twitter?.title).toBe('Test Page')
      expect(metadata.alternates?.canonical).toBe('https://techinterview.dev/test')
    })

    it('should handle article type with published time', async () => {
      const config = {
        title: 'Article Title',
        description: 'Article description',
        ogType: 'article' as const,
        publishedTime: '2024-01-01',
        modifiedTime: '2024-01-02',
        authors: ['John Doe'],
        category: 'tech',
      }

      const metadata = await generateSEOMetadata(config)

      expect((metadata.openGraph as any)?.type).toBe('article')
      expect((metadata.openGraph as any)?.publishedTime).toBe('2024-01-01')
      expect((metadata.openGraph as any)?.modifiedTime).toBe('2024-01-02')
      expect(metadata.authors).toEqual([{ name: 'John Doe' }])
      expect(metadata.category).toBe('tech')
    })

    it('should generate language alternates', async () => {
      const config = {
        title: 'Test Page',
        description: 'Test description',
        canonical: '/en/test',
        locale: 'en',
      }

      const metadata = await generateSEOMetadata(config)

      expect(metadata.alternates?.languages?.en).toBe('https://techinterview.dev/en/test')
      expect(metadata.alternates?.languages?.['zh-Hans']).toBe('https://techinterview.dev/zh-Hans/test')
      expect(metadata.alternates?.languages?.['zh-Hant']).toBe('https://techinterview.dev/zh-Hant/test')
    })
  })

  describe('generateBreadcrumbSchema', () => {
    it('should generate valid breadcrumb schema', () => {
      const items = [
        { name: 'Home', url: '/en' },
        { name: 'Blog', url: '/en/blog' },
        { name: 'Article', url: '/en/blog/article' },
      ]

      const schema = generateBreadcrumbSchema(items)

      expect(schema['@context']).toBe('https://schema.org')
      expect(schema['@type']).toBe('BreadcrumbList')
      expect(schema.itemListElement).toHaveLength(3)
      expect(schema.itemListElement[0]).toEqual({
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://techinterview.dev/en',
      })
      expect(schema.itemListElement[2]).toEqual({
        '@type': 'ListItem',
        position: 3,
        name: 'Article',
        item: 'https://techinterview.dev/en/blog/article',
      })
    })
  })

  describe('generateArticleSchema', () => {
    it('should generate valid article schema', () => {
      const article = {
        title: 'Test Article',
        description: 'Test description',
        author: 'John Doe',
        publishedTime: '2024-01-01',
        modifiedTime: '2024-01-02',
        image: '/test-image.jpg',
        url: '/en/blog/test-article',
        category: 'algorithms',
      }

      const schema = generateArticleSchema(article)

      expect(schema['@context']).toBe('https://schema.org')
      expect(schema['@type']).toBe('Article')
      expect(schema.headline).toBe('Test Article')
      expect(schema.description).toBe('Test description')
      expect(schema.author).toEqual({
        '@type': 'Person',
        name: 'John Doe',
      })
      expect(schema.datePublished).toBe('2024-01-01')
      expect(schema.dateModified).toBe('2024-01-02')
      expect(schema.articleSection).toBe('algorithms')
      expect(schema.url).toBe('https://techinterview.dev/en/blog/test-article')
    })

    it('should use default image when none provided', () => {
      const article = {
        title: 'Test Article',
        description: 'Test description',
        author: 'John Doe',
        publishedTime: '2024-01-01',
        url: '/en/blog/test-article',
      }

      const schema = generateArticleSchema(article)

      expect(schema.image).toBe('/og-image.jpg')
      expect(schema.dateModified).toBe('2024-01-01') // Should fallback to publishedTime
    })
  })

  describe('generateCourseSchema', () => {
    it('should generate valid course schema with pricing', () => {
      const course = {
        title: 'Test Course',
        description: 'Test course description',
        instructor: 'Jane Smith',
        price: 99,
        currency: 'USD',
        image: '/course-image.jpg',
        url: '/en/courses/test-course',
        category: 'system-design',
        level: 'intermediate',
      }

      const schema = generateCourseSchema(course)

      expect(schema['@context']).toBe('https://schema.org')
      expect(schema['@type']).toBe('Course')
      expect(schema.name).toBe('Test Course')
      expect(schema.instructor).toEqual({
        '@type': 'Person',
        name: 'Jane Smith',
      })
      expect(schema.offers).toEqual({
        '@type': 'Offer',
        price: 99,
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
      })
      expect(schema.courseCode).toBe('system-design')
      expect(schema.educationalLevel).toBe('intermediate')
    })

    it('should handle course without pricing', () => {
      const course = {
        title: 'Free Course',
        description: 'Free course description',
        instructor: 'Jane Smith',
        url: '/en/courses/free-course',
      }

      const schema = generateCourseSchema(course)

      expect(schema.offers).toBeUndefined()
      expect(schema.name).toBe('Free Course')
    })
  })

  describe('generateOrganizationSchema', () => {
    it('should generate valid organization schema', () => {
      const schema = generateOrganizationSchema()

      expect(schema['@context']).toBe('https://schema.org')
      expect(schema['@type']).toBe('Organization')
      expect(schema.name).toBe('Tech Interview Consultant')
      expect(schema.url).toBe('https://techinterview.dev')
      expect(schema.contactPoint).toEqual({
        '@type': 'ContactPoint',
        contactType: 'Customer Service',
        email: 'hello@techinterview.dev',
      })
      expect(schema.sameAs).toEqual(['https://twitter.com/techinterviewdev'])
    })
  })
})