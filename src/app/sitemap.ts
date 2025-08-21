import { MetadataRoute } from 'next'
import { getAllPosts, getAllCourses } from '@/lib/content'

const baseUrl = 'https://techinterview.dev' // Update with actual domain
const locales = ['en', 'zh-Hans', 'zh-Hant']

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: MetadataRoute.Sitemap = []

  // Static pages for each locale
  const staticPages = ['', '/blog', '/courses', '/about', '/contact']
  
  locales.forEach(locale => {
    staticPages.forEach(page => {
      routes.push({
        url: `${baseUrl}/${locale}${page}`,
        lastModified: new Date(),
        changeFrequency: page === '' ? 'daily' : 'weekly',
        priority: page === '' ? 1 : 0.8,
      })
    })
  })

  // Blog posts for each locale
  locales.forEach(locale => {
    const posts = getAllPosts(locale)
    posts.forEach(post => {
      routes.push({
        url: `${baseUrl}/${locale}/blog/${post.slug}`,
        lastModified: new Date(post.meta.updatedAt || post.meta.publishedAt),
        changeFrequency: 'monthly',
        priority: 0.7,
      })
    })
  })

  // Course pages for each locale
  locales.forEach(locale => {
    const courses = getAllCourses(locale)
    courses.forEach(course => {
      routes.push({
        url: `${baseUrl}/${locale}/courses/${course.slug}`,
        lastModified: new Date(course.meta.updatedAt || course.meta.publishedAt),
        changeFrequency: 'monthly',
        priority: 0.9, // Higher priority for courses as they're main business content
      })
    })
  })

  return routes
}