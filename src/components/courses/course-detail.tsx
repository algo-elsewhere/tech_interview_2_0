import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/routing'
import { Course } from '@/lib/content'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { MDXContent } from '@/components/mdx/mdx-content'
import { 
  Calendar, 
  Clock, 
  User, 
  ArrowLeft, 
  BookOpen, 
  DollarSign,
  Star,
  CheckCircle,
  Users,
  Award
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface CourseDetailProps {
  course: Course
}

export function CourseDetail({ course }: CourseDetailProps) {
  const t = useTranslations('courses')
  
  const levelColor = {
    beginner: 'bg-green-100 text-green-800',
    intermediate: 'bg-yellow-100 text-yellow-800',
    advanced: 'bg-red-100 text-red-800',
  }

  const formatPrice = (price?: number) => {
    if (price === undefined || price === 0) return t('free')
    return `$${price}`
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Navigation */}
      <div className="mb-8">
        <Link href="/courses">
          <Button variant="ghost" size="sm" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            {t('backToCourses')}
          </Button>
        </Link>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Course Header */}
          <header className="space-y-6">
            {/* Categories and Level */}
            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant="secondary">
                {course.meta.category}
              </Badge>
              {course.meta.level && (
                <Badge 
                  variant="outline" 
                  className={cn(levelColor[course.meta.level as keyof typeof levelColor])}
                >
                  {t(`level.${course.meta.level}`)}
                </Badge>
              )}
              {course.meta.featured && (
                <Badge variant="default" className="gap-1">
                  <Star className="h-3 w-3 fill-current" />
                  {t('featured')}
                </Badge>
              )}
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              {course.meta.title}
            </h1>

            {/* Description */}
            <p className="text-xl text-muted-foreground leading-relaxed">
              {course.meta.description}
            </p>

            {/* Meta Information */}
            <div className="flex items-center gap-6 text-sm text-muted-foreground flex-wrap">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>{course.meta.author}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <time dateTime={course.meta.publishedAt}>
                  {new Date(course.meta.publishedAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </time>
              </div>
              
              {course.meta.duration && (
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{course.meta.duration}</span>
                </div>
              )}

              {course.meta.lessons && (
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  <span>{course.meta.lessons} {t('lessons')}</span>
                </div>
              )}
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {course.meta.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  #{tag}
                </Badge>
              ))}
            </div>
          </header>

          {/* Course Content */}
          <div className="prose prose-gray dark:prose-invert max-w-none">
            <MDXContent content={course.content} />
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Enrollment Card */}
          <Card className="sticky top-8">
            <CardHeader className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <DollarSign className="h-6 w-6" />
                <span className="text-3xl font-bold">
                  {formatPrice(course.meta.price)}
                </span>
              </div>
              <CardTitle className="text-lg">
                {course.meta.price ? t('enrollToday') : t('startLearning')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button size="lg" className="w-full">
                {course.meta.price ? t('enrollNow') : t('startFree')}
              </Button>
              
              {course.meta.price && (
                <p className="text-center text-sm text-muted-foreground">
                  {t('moneyBackGuarantee')}
                </p>
              )}
            </CardContent>
          </Card>

          {/* Course Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">{t('courseIncludes')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {course.meta.duration && (
                <div className="flex items-center gap-3">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{course.meta.duration} {t('ofContent')}</span>
                </div>
              )}
              
              {course.meta.lessons && (
                <div className="flex items-center gap-3">
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{course.meta.lessons} {t('lessons')}</span>
                </div>
              )}
              
              <div className="flex items-center gap-3">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{t('communityAccess')}</span>
              </div>
              
              <div className="flex items-center gap-3">
                <Award className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{t('certificateCompletion')}</span>
              </div>
              
              <div className="flex items-center gap-3">
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{t('lifetimeAccess')}</span>
              </div>
            </CardContent>
          </Card>

          {/* Prerequisites */}
          {course.meta.difficulty && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">{t('prerequisites')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground">
                  {course.meta.difficulty === 'beginner' && t('prerequisiteBeginner')}
                  {course.meta.difficulty === 'intermediate' && t('prerequisiteIntermediate')}
                  {course.meta.difficulty === 'advanced' && t('prerequisiteAdvanced')}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}