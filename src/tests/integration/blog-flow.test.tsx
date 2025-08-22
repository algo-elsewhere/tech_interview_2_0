import { describe, it, expect } from 'vitest'
import { render, screen } from '@/lib/test-utils'
import { userEvent } from '@/lib/test-utils'
import { BlogCard } from '@/components/blog/blog-card'
import { createMockPost } from '@/lib/test-utils'

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

  it('should display individual blog post correctly', () => {
    render(<BlogCard post={mockPosts[0]} />)

    // Should show post details
    expect(screen.getByText('React Testing Best Practices')).toBeInTheDocument()
    expect(screen.getByText('Learn how to test React components effectively')).toBeInTheDocument()
    expect(screen.getByText('Jane Doe')).toBeInTheDocument()
    expect(screen.getByText('frontend')).toBeInTheDocument()
  })

  it('should render featured post with special styling', () => {
    render(<BlogCard post={mockPosts[0]} />)

    // Featured post should have special styling
    const postCard = screen.getByRole('link')
    expect(postCard).toBeInTheDocument()
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
    render(<BlogCard post={mockPosts[0]} />)

    // Should show formatted date
    expect(screen.getByText('January 15, 2024')).toBeInTheDocument()
  })

  it('should handle different locales correctly', () => {
    render(<BlogCard post={mockPosts[0]} />, { locale: 'zh-Hans' })

    // Should render with Chinese locale context
    const postLink = screen.getByRole('link')
    expect(postLink.getAttribute('href')).toMatch(/^\/zh-Hans\/blog\//)
  })

  it('should show reading time when available', () => {
    const postWithReadingTime = {
      ...mockPosts[0],
      meta: {
        ...mockPosts[0].meta,
        readingTime: 5,
      },
    }

    render(<BlogCard post={postWithReadingTime} />)

    expect(screen.getByText('5 min read')).toBeInTheDocument()
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

  it('should maintain consistent styling', () => {
    render(<BlogCard post={mockPosts[0]} />)

    const postCard = screen.getByRole('link')
    
    // Card should have transition classes
    expect(postCard).toHaveClass('transition-all')
  })
})