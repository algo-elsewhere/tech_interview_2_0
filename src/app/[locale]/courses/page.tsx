import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { getAllCourses } from '@/lib/content'
import { CourseList } from '@/components/courses/course-list'

interface CoursesPageProps {
  params: Promise<{ locale: string }>
  searchParams: Promise<{ category?: string; level?: string; page?: string }>
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'courses' })

  return {
    title: t('meta.title'),
    description: t('meta.description'),
    openGraph: {
      title: t('meta.title'),
      description: t('meta.description'),
      type: 'website',
    },
  }
}

export default async function CoursesPage({
  params,
  searchParams
}: CoursesPageProps) {
  const { locale } = await params
  const { category, level, page } = await searchParams
  const t = await getTranslations({ locale, namespace: 'courses' })
  
  const allCourses = getAllCourses(locale)
  
  // Filter by category if specified
  let filteredCourses = category
    ? allCourses.filter(course => 
        course.meta.category.toLowerCase() === category.toLowerCase()
      )
    : allCourses

  // Filter by level if specified
  if (level) {
    filteredCourses = filteredCourses.filter(course => 
      course.meta.level?.toLowerCase() === level.toLowerCase()
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          {t('title')}
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl">
          {t('subtitle')}
        </p>
      </div>
      
      <CourseList 
        courses={filteredCourses}
        currentCategory={category}
        currentLevel={level}
        currentPage={page ? parseInt(page) : 1}
      />
    </div>
  )
}