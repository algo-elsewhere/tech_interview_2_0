'use client'

import { useTranslations } from 'next-intl'
import { useRouter, usePathname } from '@/i18n/routing'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Search, X } from 'lucide-react'

interface BlogFiltersProps {
  categories: string[]
  currentCategory?: string
  searchQuery: string
  onSearchChange: (query: string) => void
}

export function BlogFilters({
  categories,
  currentCategory,
  searchQuery,
  onSearchChange
}: BlogFiltersProps) {
  const t = useTranslations('blog')
  const router = useRouter()
  const pathname = usePathname()

  const handleCategoryClick = (category: string) => {
    const params = new URLSearchParams()
    if (category !== currentCategory) {
      params.set('category', category)
    }
    
    const queryString = params.toString()
    const newPath = queryString ? `${pathname}?${queryString}` : pathname
    router.push(newPath)
  }

  const clearFilters = () => {
    onSearchChange('')
    router.push(pathname)
  }

  const hasActiveFilters = currentCategory || searchQuery

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder={t('filters.search')}
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-9"
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange('')}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm font-medium text-muted-foreground">
          {t('filters.categories')}:
        </span>
        
        <Button
          variant={!currentCategory ? "default" : "outline"}
          size="sm"
          onClick={() => handleCategoryClick('')}
          className="h-8"
        >
          {t('filters.all')}
        </Button>
        
        {categories.map((category) => (
          <Button
            key={category}
            variant={currentCategory === category ? "default" : "outline"}
            size="sm"
            onClick={() => handleCategoryClick(category)}
            className="h-8 capitalize"
          >
            {category}
          </Button>
        ))}
      </div>

      {/* Active Filters & Clear */}
      {hasActiveFilters && (
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">
            {t('filters.active')}:
          </span>
          
          {currentCategory && (
            <Badge variant="secondary" className="gap-1">
              {currentCategory}
              <button
                onClick={() => handleCategoryClick('')}
                className="ml-1 hover:text-destructive"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          
          {searchQuery && (
            <Badge variant="secondary" className="gap-1">
              &quot;{searchQuery}&quot;
              <button
                onClick={() => onSearchChange('')}
                className="ml-1 hover:text-destructive"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="h-6 px-2 text-xs"
          >
            {t('filters.clear')}
          </Button>
        </div>
      )}
    </div>
  )
}