'use client'

import { useTranslations } from 'next-intl'
import { useRouter, usePathname } from '@/i18n/routing'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Search, X } from 'lucide-react'

interface CourseFiltersProps {
  categories: string[]
  levels: string[]
  currentCategory?: string
  currentLevel?: string
  searchQuery: string
  onSearchChange: (query: string) => void
}

export function CourseFilters({
  categories,
  levels,
  currentCategory,
  currentLevel,
  searchQuery,
  onSearchChange
}: CourseFiltersProps) {
  const t = useTranslations('courses')
  const router = useRouter()
  const pathname = usePathname()

  const handleFilterClick = (type: 'category' | 'level', value: string) => {
    const params = new URLSearchParams()
    
    // Preserve other filters while updating the current one
    if (type === 'category') {
      if (value !== currentCategory) {
        params.set('category', value)
      }
      if (currentLevel) {
        params.set('level', currentLevel)
      }
    } else {
      if (value !== currentLevel) {
        params.set('level', value)
      }
      if (currentCategory) {
        params.set('category', currentCategory)
      }
    }
    
    const queryString = params.toString()
    const newPath = queryString ? `${pathname}?${queryString}` : pathname
    router.push(newPath)
  }

  const clearFilters = () => {
    onSearchChange('')
    router.push(pathname)
  }

  const hasActiveFilters = currentCategory || currentLevel || searchQuery

  return (
    <div className="space-y-6">
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
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-medium text-muted-foreground">
            {t('filters.categories')}:
          </span>
          
          <Button
            variant={!currentCategory ? "default" : "outline"}
            size="sm"
            onClick={() => handleFilterClick('category', '')}
            className="h-8"
          >
            {t('filters.all')}
          </Button>
          
          {categories.map((category) => (
            <Button
              key={category}
              variant={currentCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => handleFilterClick('category', category)}
              className="h-8 capitalize"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Level Filters */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-medium text-muted-foreground">
            {t('filters.levels')}:
          </span>
          
          <Button
            variant={!currentLevel ? "default" : "outline"}
            size="sm"
            onClick={() => handleFilterClick('level', '')}
            className="h-8"
          >
            {t('filters.all')}
          </Button>
          
          {levels.map((level) => (
            <Button
              key={level}
              variant={currentLevel === level ? "default" : "outline"}
              size="sm"
              onClick={() => handleFilterClick('level', level)}
              className="h-8 capitalize"
            >
              {t(`level.${level}`)}
            </Button>
          ))}
        </div>
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
                onClick={() => handleFilterClick('category', '')}
                className="ml-1 hover:text-destructive"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          
          {currentLevel && (
            <Badge variant="secondary" className="gap-1">
              {t(`level.${currentLevel}`)}
              <button
                onClick={() => handleFilterClick('level', '')}
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