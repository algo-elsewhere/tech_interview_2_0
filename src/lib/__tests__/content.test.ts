import { getAllPosts, getPostBySlug, getAllCourses, getCourseBySlug } from '../content'

describe('Content Management System', () => {
  describe('Posts', () => {
    test('should get all posts for English locale', () => {
      const posts = getAllPosts('en')
      expect(posts).toBeDefined()
      expect(Array.isArray(posts)).toBe(true)
      
      if (posts.length > 0) {
        const post = posts[0]
        expect(post).toHaveProperty('slug')
        expect(post).toHaveProperty('locale')
        expect(post).toHaveProperty('meta')
        expect(post).toHaveProperty('content')
        expect(post.meta).toHaveProperty('title')
        expect(post.meta).toHaveProperty('description')
        expect(post.meta).toHaveProperty('publishedAt')
      }
    })

    test('should get specific post by slug', () => {
      const post = getPostBySlug('binary-search-algorithm', 'en')
      expect(post).toBeDefined()
      
      if (post) {
        expect(post.slug).toBe('binary-search-algorithm')
        expect(post.locale).toBe('en')
        expect(post.meta.title).toContain('Binary Search')
      }
    })

    test('should return null for non-existent post', () => {
      const post = getPostBySlug('non-existent-post', 'en')
      expect(post).toBeNull()
    })

    test('should return empty array for invalid locale', () => {
      const posts = getAllPosts('invalid-locale')
      expect(posts).toEqual([])
    })
  })

  describe('Courses', () => {
    test('should get all courses for English locale', () => {
      const courses = getAllCourses('en')
      expect(courses).toBeDefined()
      expect(Array.isArray(courses)).toBe(true)
    })

    test('should get specific course by slug', () => {
      const course = getCourseBySlug('system-design-fundamentals', 'en')
      expect(course).toBeDefined()
      
      if (course) {
        expect(course.slug).toBe('system-design-fundamentals')
        expect(course.locale).toBe('en')
        expect(course.meta.title).toContain('System Design')
      }
    })

    test('should return null for non-existent course', () => {
      const course = getCourseBySlug('non-existent-course', 'en')
      expect(course).toBeNull()
    })
  })

  describe('Content Structure', () => {
    test('should have proper content structure', () => {
      const posts = getAllPosts('en')
      const courses = getAllCourses('en')

      // Test posts structure
      posts.forEach(post => {
        expect(post.meta).toHaveProperty('category')
        expect(post.meta).toHaveProperty('tags')
        expect(Array.isArray(post.meta.tags)).toBe(true)
        expect(typeof post.meta.publishedAt).toBe('string')
      })

      // Test courses structure  
      courses.forEach(course => {
        expect(course.meta).toHaveProperty('category')
        expect(course.meta).toHaveProperty('tags')
        expect(Array.isArray(course.meta.tags)).toBe(true)
      })
    })
  })
})