import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export interface ContentMeta {
  title: string
  description: string
  publishedAt: string
  updatedAt?: string
  author: string
  tags: string[]
  category: string
  featured?: boolean
  difficulty?: 'beginner' | 'intermediate' | 'advanced'
}

export interface ContentItem {
  slug: string
  locale: string
  meta: ContentMeta
  content: string
  excerpt?: string
}

export interface PostMeta extends ContentMeta {
  readingTime?: number
}

export interface CourseMeta extends ContentMeta {
  price?: number
  currency?: string
  duration?: string
  lessons?: number
  level?: 'beginner' | 'intermediate' | 'advanced'
}

export interface Post extends ContentItem {
  meta: PostMeta
}

export interface Course extends ContentItem {
  meta: CourseMeta
}

const CONTENT_DIR = path.join(process.cwd(), 'content')
const VALID_LOCALES = ['en', 'zh-Hans', 'zh-Hant'] as const
type ValidLocale = typeof VALID_LOCALES[number]

/**
 * Get all content files from a specific directory and locale
 */
function getContentFiles(contentType: 'posts' | 'courses', locale: string): string[] {
  const contentPath = path.join(CONTENT_DIR, contentType, locale)
  
  if (!fs.existsSync(contentPath)) {
    return []
  }
  
  return fs.readdirSync(contentPath)
    .filter(file => file.endsWith('.mdx'))
    .map(file => file.replace(/\.mdx$/, ''))
}

/**
 * Read and parse a content file
 */
function readContentFile(
  contentType: 'posts' | 'courses', 
  locale: string, 
  slug: string
): ContentItem | null {
  const filePath = path.join(CONTENT_DIR, contentType, locale, `${slug}.mdx`)
  
  if (!fs.existsSync(filePath)) {
    return null
  }
  
  try {
    const fileContents = fs.readFileSync(filePath, 'utf8')
    const { data, content } = matter(fileContents)
    
    // Generate excerpt from content (first 160 characters)
    const excerpt = content
      .replace(/^#+\s+.*$/gm, '') // Remove headings
      .replace(/!\[.*?\]\(.*?\)/g, '') // Remove images
      .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1') // Replace links with text
      .trim()
      .substring(0, 160) + '...'
    
    return {
      slug,
      locale,
      meta: data as ContentMeta,
      content,
      excerpt,
    }
  } catch (error) {
    console.error(`Error reading content file: ${filePath}`, error)
    return null
  }
}

/**
 * Get all posts for a specific locale
 */
export function getAllPosts(locale: string): Post[] {
  if (!VALID_LOCALES.includes(locale as ValidLocale)) {
    return []
  }
  
  const slugs = getContentFiles('posts', locale)
  
  return slugs
    .map(slug => readContentFile('posts', locale, slug))
    .filter((post): post is Post => post !== null)
    .sort((a, b) => 
      new Date(b.meta.publishedAt).getTime() - new Date(a.meta.publishedAt).getTime()
    )
}

/**
 * Get a single post by slug and locale
 */
export function getPostBySlug(slug: string, locale: string): Post | null {
  if (!VALID_LOCALES.includes(locale as ValidLocale)) {
    return null
  }
  
  return readContentFile('posts', locale, slug) as Post | null
}

/**
 * Get all courses for a specific locale
 */
export function getAllCourses(locale: string): Course[] {
  if (!VALID_LOCALES.includes(locale as ValidLocale)) {
    return []
  }
  
  const slugs = getContentFiles('courses', locale)
  
  return slugs
    .map(slug => readContentFile('courses', locale, slug))
    .filter((course): course is Course => course !== null)
    .sort((a, b) => 
      new Date(b.meta.publishedAt).getTime() - new Date(a.meta.publishedAt).getTime()
    )
}

/**
 * Get a single course by slug and locale
 */
export function getCourseBySlug(slug: string, locale: string): Course | null {
  if (!VALID_LOCALES.includes(locale as ValidLocale)) {
    return null
  }
  
  return readContentFile('courses', locale, slug) as Course | null
}

/**
 * Get featured content (posts and courses) for a specific locale
 */
export function getFeaturedContent(locale: string): {
  posts: Post[]
  courses: Course[]
} {
  const posts = getAllPosts(locale).filter(post => post.meta.featured)
  const courses = getAllCourses(locale).filter(course => course.meta.featured)
  
  return { posts, courses }
}

/**
 * Get content by category for a specific locale
 */
export function getContentByCategory(
  category: string, 
  locale: string
): {
  posts: Post[]
  courses: Course[]
} {
  const posts = getAllPosts(locale).filter(post => 
    post.meta.category.toLowerCase() === category.toLowerCase()
  )
  const courses = getAllCourses(locale).filter(course => 
    course.meta.category.toLowerCase() === category.toLowerCase()
  )
  
  return { posts, courses }
}

/**
 * Search content by title, description, or tags
 */
export function searchContent(
  query: string, 
  locale: string
): {
  posts: Post[]
  courses: Course[]
} {
  const searchTerm = query.toLowerCase()
  
  const posts = getAllPosts(locale).filter(post => {
    const { title, description, tags } = post.meta
    return (
      title.toLowerCase().includes(searchTerm) ||
      description.toLowerCase().includes(searchTerm) ||
      tags.some(tag => tag.toLowerCase().includes(searchTerm))
    )
  })
  
  const courses = getAllCourses(locale).filter(course => {
    const { title, description, tags } = course.meta
    return (
      title.toLowerCase().includes(searchTerm) ||
      description.toLowerCase().includes(searchTerm) ||
      tags.some(tag => tag.toLowerCase().includes(searchTerm))
    )
  })
  
  return { posts, courses }
}