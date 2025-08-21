'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { Post } from '@/lib/content'
import { BlogCard } from './blog-card'
import { BlogFilters } from './blog-filters'
import { BlogPagination } from './blog-pagination'

interface BlogListProps {
  posts: Post[]
  currentCategory?: string
  currentPage: number
}

const POSTS_PER_PAGE = 6

export function BlogList({ posts, currentCategory, currentPage }: BlogListProps) {
  const t = useTranslations('blog')
  const [searchQuery, setSearchQuery] = useState('')
  
  // Filter posts by search query
  const filteredPosts = posts.filter(post => {
    if (!searchQuery) return true
    
    const query = searchQuery.toLowerCase()
    return (
      post.meta.title.toLowerCase().includes(query) ||
      post.meta.description.toLowerCase().includes(query) ||
      post.meta.tags.some(tag => tag.toLowerCase().includes(query))
    )
  })
  
  // Calculate pagination
  const totalPosts = filteredPosts.length
  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE)
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE
  const endIndex = startIndex + POSTS_PER_PAGE
  const currentPosts = filteredPosts.slice(startIndex, endIndex)
  
  // Get unique categories for filter
  const categories = Array.from(
    new Set(posts.map(post => post.meta.category))
  ).sort()

  return (
    <div className="space-y-8">
      <BlogFilters
        categories={categories}
        currentCategory={currentCategory}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
      
      {filteredPosts.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-lg font-semibold mb-2">
            {t('noResults.title')}
          </h3>
          <p className="text-muted-foreground">
            {t('noResults.description')}
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentPosts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
          
          {totalPages > 1 && (
            <BlogPagination
              currentPage={currentPage}
              totalPages={totalPages}
              category={currentCategory}
            />
          )}
        </>
      )}
    </div>
  )
}