'use client'

import { useTranslations } from 'next-intl'
import { useRouter, usePathname } from '@/i18n/routing'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface BlogPaginationProps {
  currentPage: number
  totalPages: number
  category?: string
}

export function BlogPagination({
  currentPage,
  totalPages,
  category
}: BlogPaginationProps) {
  const t = useTranslations('blog')
  const router = useRouter()
  const pathname = usePathname()

  const createPageUrl = (page: number) => {
    const params = new URLSearchParams()
    if (category) params.set('category', category)
    if (page > 1) params.set('page', page.toString())
    
    const queryString = params.toString()
    return queryString ? `${pathname}?${queryString}` : pathname
  }

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return
    router.push(createPageUrl(page))
  }

  // Calculate page numbers to show
  const getPageNumbers = () => {
    const delta = 2
    const range = []
    const rangeWithDots = []

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i)
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...')
    } else {
      rangeWithDots.push(1)
    }

    rangeWithDots.push(...range)

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages)
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages)
    }

    return rangeWithDots
  }

  if (totalPages <= 1) return null

  return (
    <div className="flex items-center justify-center space-x-2">
      <Button
        variant="outline"
        size="sm"
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage <= 1}
        className="gap-1"
      >
        <ChevronLeft className="h-4 w-4" />
        {t('pagination.previous')}
      </Button>

      <div className="flex items-center space-x-1">
        {getPageNumbers().map((page, index) => (
          <div key={index}>
            {page === '...' ? (
              <span className="px-3 py-2 text-muted-foreground">…</span>
            ) : (
              <Button
                variant={currentPage === page ? "default" : "outline"}
                size="sm"
                onClick={() => goToPage(page as number)}
                className={cn(
                  "min-w-[2.5rem]",
                  currentPage === page && "pointer-events-none"
                )}
              >
                {page}
              </Button>
            )}
          </div>
        ))}
      </div>

      <Button
        variant="outline"
        size="sm"
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className="gap-1"
      >
        {t('pagination.next')}
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  )
}