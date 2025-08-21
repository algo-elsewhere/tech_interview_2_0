import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/routing'
import { Course } from '@/lib/content'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Clock, User, BookOpen, DollarSign, Star } from 'lucide-react'
import { cn } from '@/lib/utils'

interface CourseCardProps {
  course: Course
  className?: string
}

export function CourseCard({ course, className }: CourseCardProps) {
  const t = useTranslations('courses')
  
  const levelColor = {
    beginner: 'bg-green-100 text-green-800 hover:bg-green-200',
    intermediate: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200',
    advanced: 'bg-red-100 text-red-800 hover:bg-red-200',
  }

  const formatPrice = (price?: number) => {
    if (price === undefined || price === 0) return t('free')
    return `$${price}`
  }

  return (
    <Card className={cn('h-full transition-all hover:shadow-lg flex flex-col', className)}>
      <CardHeader className="space-y-3">
        <div className="flex items-center justify-between">
          <Badge variant="secondary" className="text-xs">
            {course.meta.category}
          </Badge>
          {course.meta.level && (
            <Badge 
              variant="outline" 
              className={cn('text-xs', levelColor[course.meta.level as keyof typeof levelColor])}
            >
              {t(`level.${course.meta.level}`)}
            </Badge>
          )}
        </div>
        
        <div>
          <h3 className="text-xl font-semibold line-clamp-2 mb-2">
            <Link 
              href={`/courses/${course.slug}`}
              className="hover:text-primary transition-colors"
            >
              {course.meta.title}
            </Link>
          </h3>
          <p className="text-muted-foreground text-sm line-clamp-3">
            {course.excerpt}
          </p>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4 flex-1">
        {/* Course Metadata */}
        <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
          {course.meta.duration && (
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>{course.meta.duration}</span>
            </div>
          )}
          {course.meta.lessons && (
            <div className="flex items-center gap-1">
              <BookOpen className="h-3 w-3" />
              <span>{course.meta.lessons} {t('lessons')}</span>
            </div>
          )}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1">
          {course.meta.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
          {course.meta.tags.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{course.meta.tags.length - 3}
            </Badge>
          )}
        </div>

        {/* Featured Badge */}
        {course.meta.featured && (
          <div className="flex items-center gap-1 text-amber-600">
            <Star className="h-3 w-3 fill-current" />
            <span className="text-xs font-medium">{t('featured')}</span>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="flex flex-col gap-3 pt-0">
        {/* Price and Author */}
        <div className="flex items-center justify-between w-full text-sm">
          <div className="flex items-center gap-1 text-muted-foreground">
            <User className="h-3 w-3" />
            <span>{course.meta.author}</span>
          </div>
          
          <div className="flex items-center gap-1 font-semibold text-lg">
            <DollarSign className="h-4 w-4" />
            <span>{formatPrice(course.meta.price)}</span>
          </div>
        </div>

        {/* CTA Button */}
        <Link href={`/courses/${course.slug}`} className="w-full">
          <Button className="w-full">
            {course.meta.price ? t('enrollNow') : t('startFree')}
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}