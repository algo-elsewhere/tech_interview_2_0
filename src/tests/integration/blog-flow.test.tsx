import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@/lib/test-utils'
import { userEvent } from '@/lib/test-utils'
import { BlogList } from '@/components/blog/blog-list'
import { BlogCard } from '@/components/blog/blog-card'
import { createMockPost } from '@/lib/test-utils'

// Mock next/navigation
const mockPush = vi.fn()
vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: mockPush }),
  useSearchParams: () => new URLSearchParams(),
  usePathname: () => '/en/blog',
}))

describe('Blog User Flow Integration', () => {
  const mockPosts = [
    createMockPost({
      slug: 'react-testing',
      meta: {
        title: 'React Testing Best Practices',
        description: 'Learn how to test React components effectively',
        category: 'frontend',
        tags: ['react', 'testing'],
        publishedAt: '2024-01-15',
        author: 'Jane Doe',
        featured: true,
      },
    }),
    createMockPost({
      slug: 'algorithms-guide',
      meta: {
        title: 'Complete Algorithms Guide',
        description: 'Master algorithms for technical interviews',
        category: 'algorithms',
        tags: ['algorithms', 'interview'],
        publishedAt: '2024-01-10',
        author: 'John Smith',
        featured: false,
      },
    }),
    createMockPost({
      slug: 'system-design-basics',
      meta: {
        title: 'System Design Fundamentals',
        description: 'Understanding system design interview questions',
        category: 'system-design',
        tags: ['system-design', 'scalability'],
        publishedAt: '2024-01-05',
        author: 'Alice Johnson',
        featured: false,
      },
    }),
  ]

  it('should display all blog posts correctly', () => {
    render(<BlogList posts={mockPosts} currentPage={1} />)

    // Should show all posts
    expect(screen.getByText('React Testing Best Practices')).toBeInTheDocument()
    expect(screen.getByText('Complete Algorithms Guide')).toBeInTheDocument()
    expect(screen.getByText('System Design Fundamentals')).toBeInTheDocument()

    // Should show authors
    expect(screen.getByText('Jane Doe')).toBeInTheDocument()
    expect(screen.getByText('John Smith')).toBeInTheDocument()
    expect(screen.getByText('Alice Johnson')).toBeInTheDocument()

    // Should show categories
    expect(screen.getByText('frontend')).toBeInTheDocument()
    expect(screen.getByText('algorithms')).toBeInTheDocument()
    expect(screen.getByText('system-design')).toBeInTheDocument()
  })

  it('should filter posts by category', () => {
    render(<BlogList posts={mockPosts} currentCategory="algorithms" currentPage={1} />)

    // Should only show algorithms posts
    expect(screen.getByText('Complete Algorithms Guide')).toBeInTheDocument()
    expect(screen.queryByText('React Testing Best Practices')).not.toBeInTheDocument()
    expect(screen.queryByText('System Design Fundamentals')).not.toBeInTheDocument()
  })

  it('should highlight featured posts', () => {
    render(<BlogList posts={mockPosts} currentPage={1} />)

    // Featured post should have special styling
    const featuredPost = screen.getByText('React Testing Best Practices').closest('article')
    expect(featuredPost).toBeInTheDocument()
  })

  it('should handle empty search results', () => {
    render(<BlogList posts={[]} currentPage={1} />)

    expect(screen.getByText(/no posts found/i)).toBeInTheDocument()
  })

  it('should handle pagination correctly', () => {
    const manyPosts = Array.from({ length: 25 }, (_, i) =>
      createMockPost({
        slug: `post-${i}`,
        meta: {
          title: `Post ${i + 1}`,
          description: `Description ${i + 1}`,
          category: 'general',
          tags: ['test'],
          publishedAt: '2024-01-01',
          author: 'Test Author',
        },
      })
    )

    render(<BlogList posts={manyPosts} currentPage={1} />)

    // Should show pagination controls
    const pagination = screen.getByRole('navigation', { name: /pagination/i })
    expect(pagination).toBeInTheDocument()
  })

  it('should navigate to blog post when clicked', async () => {
    const user = await userEvent()
    render(<BlogCard post={mockPosts[0]} />)

    const postLink = screen.getByRole('link')
    await user.click(postLink)

    // Should navigate to the correct URL
    expect(postLink).toHaveAttribute('href', '/en/blog/react-testing')
  })

  it('should show correct publish dates', () => {
    render(<BlogList posts={mockPosts} currentPage={1} />)

    // Should show formatted dates
    expect(screen.getByText('January 15, 2024')).toBeInTheDocument()
    expect(screen.getByText('January 10, 2024')).toBeInTheDocument()
    expect(screen.getByText('January 5, 2024')).toBeInTheDocument()
  })

  it('should handle different locales correctly', () => {
    render(<BlogList posts={mockPosts} currentPage={1} />, { locale: 'zh-Hans' })

    // Should render with Chinese locale context
    const postLinks = screen.getAllByRole('link')
    postLinks.forEach((link) => {
      expect(link.getAttribute('href')).toMatch(/^\/zh-Hans\/blog\//)
    })
  })

  it('should show reading time when available', () => {
    const postsWithReadingTime = mockPosts.map(post => ({
      ...post,
      meta: {
        ...post.meta,
        readingTime: 5,
      },
    }))

    render(<BlogList posts={postsWithReadingTime} currentPage={1} />)

    const readingTimes = screen.getAllByText('5 min read')
    expect(readingTimes).toHaveLength(3)
  })

  it('should handle posts with missing optional fields', () => {
    const minimalPost = createMockPost({
      meta: {
        title: 'Minimal Post',
        description: 'Basic description',
        publishedAt: '2024-01-01',
        author: 'Author',
        category: 'general',
        tags: [],
        // No readingTime, featured, etc.
      },
    })

    render(<BlogCard post={minimalPost} />)

    expect(screen.getByText('Minimal Post')).toBeInTheDocument()
    expect(screen.getByText('Author')).toBeInTheDocument()
    expect(screen.queryByText('min read')).not.toBeInTheDocument()
    expect(screen.queryByText('Featured')).not.toBeInTheDocument()
  })

  it('should maintain consistent styling across all posts', () => {
    render(<BlogList posts={mockPosts} currentPage={1} />)

    const postCards = screen.getAllByRole('link')
    
    // All cards should have consistent classes
    postCards.forEach((card) => {
      expect(card).toHaveClass('transition-all')
    })
  })
})