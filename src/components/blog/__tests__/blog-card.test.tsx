import { describe, it, expect } from 'vitest'
import { render, screen } from '@/lib/test-utils'
import { BlogCard } from '../blog-card'
import { createMockPost } from '@/lib/test-utils'

describe('BlogCard', () => {
  const mockPost = createMockPost({
    meta: {
      title: 'Test Blog Post',
      description: 'This is a test blog post description',
      publishedAt: '2024-01-01',
      author: 'John Doe',
      category: 'algorithms',
      tags: ['javascript', 'algorithms'],
      readingTime: 5,
    },
  })

  it('should render post title and description', () => {
    render(<BlogCard post={mockPost} />)

    expect(screen.getByText('Test Blog Post')).toBeInTheDocument()
    expect(screen.getByText('This is a test blog post description')).toBeInTheDocument()
  })

  it('should render author information', () => {
    render(<BlogCard post={mockPost} />)

    expect(screen.getByText('John Doe')).toBeInTheDocument()
  })

  it('should render publication date', () => {
    render(<BlogCard post={mockPost} />)

    expect(screen.getByText('January 1, 2024')).toBeInTheDocument()
  })

  it('should render reading time when provided', () => {
    render(<BlogCard post={mockPost} />)

    expect(screen.getByText('5 min read')).toBeInTheDocument()
  })

  it('should render category badge', () => {
    render(<BlogCard post={mockPost} />)

    expect(screen.getByText('algorithms')).toBeInTheDocument()
  })

  it('should render tags', () => {
    render(<BlogCard post={mockPost} />)

    expect(screen.getByText('javascript')).toBeInTheDocument()
    expect(screen.getByText('algorithms')).toBeInTheDocument()
  })

  it('should have correct link to blog post', () => {
    render(<BlogCard post={mockPost} />)

    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/en/blog/test-post')
  })

  it('should handle post without reading time', () => {
    const postWithoutReadingTime = createMockPost({
      meta: {
        title: 'Test Post',
        description: 'Test description',
        publishedAt: '2024-01-01',
        author: 'John Doe',
        category: 'algorithms',
        tags: ['test'],
        // readingTime is omitted
      },
    })

    render(<BlogCard post={postWithoutReadingTime} />)

    expect(screen.queryByText('min read')).not.toBeInTheDocument()
  })

  it('should apply hover effects', () => {
    render(<BlogCard post={mockPost} />)

    const card = screen.getByRole('link')
    expect(card).toHaveClass('transition-all')
  })

  it('should show featured badge for featured posts', () => {
    const featuredPost = createMockPost({
      meta: {
        title: 'Featured Post',
        description: 'This is a featured post',
        publishedAt: '2024-01-01',
        author: 'John Doe',
        category: 'algorithms',
        tags: ['featured'],
        featured: true,
      },
    })

    render(<BlogCard post={featuredPost} />)

    expect(screen.getByText('Featured')).toBeInTheDocument()
  })

  it('should handle different locales', () => {
    const zhPost = createMockPost({
      locale: 'zh-Hans',
      meta: {
        title: '测试博客文章',
        description: '这是一个测试博客文章',
        publishedAt: '2024-01-01',
        author: '张三',
        category: 'algorithms',
        tags: ['测试'],
      },
    })

    render(<BlogCard post={zhPost} />)

    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/zh-Hans/blog/test-post')
  })

  it('should be accessible', () => {
    render(<BlogCard post={mockPost} />)

    const link = screen.getByRole('link')
    expect(link).toHaveAccessibleName()
  })
})