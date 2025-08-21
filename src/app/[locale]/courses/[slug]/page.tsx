import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getCourseBySlug, getAllCourses } from '@/lib/content'
import { CourseDetail } from '@/components/courses/course-detail'
import { CourseTracker } from '@/components/courses/course-tracker'
import { StructuredData } from '@/components/seo'
import { generateSEOMetadata, generateCourseSchema, generateBreadcrumbSchema } from '@/lib/seo'

interface CourseDetailPageProps {
  params: Promise<{ locale: string; slug: string }>
}

export async function generateStaticParams() {
  const locales = ['en', 'zh-Hans', 'zh-Hant']
  const allParams: { locale: string; slug: string }[] = []
  
  for (const locale of locales) {
    const courses = getAllCourses(locale)
    courses.forEach((course) => {
      allParams.push({
        locale,
        slug: course.slug,
      })
    })
  }
  
  return allParams
}

export async function generateMetadata({
  params
}: CourseDetailPageProps): Promise<Metadata> {
  const { locale, slug } = await params
  const course = getCourseBySlug(slug, locale)

  if (!course) {
    return {
      title: 'Course Not Found',
    }
  }

  return generateSEOMetadata({
    title: course.meta.title,
    description: course.meta.description,
    keywords: course.meta.tags,
    canonical: `/${locale}/courses/${slug}`,
    ogType: 'article',
    publishedTime: course.meta.publishedAt,
    modifiedTime: course.meta.updatedAt,
    authors: [course.meta.author],
    category: course.meta.category,
    locale
  })
}

export default async function CourseDetailPage({ params }: CourseDetailPageProps) {
  const { locale, slug } = await params
  const course = getCourseBySlug(slug, locale)

  if (!course) {
    notFound()
  }

  const courseSchema = generateCourseSchema({
    title: course.meta.title,
    description: course.meta.description,
    instructor: course.meta.author,
    price: course.meta.price,
    currency: course.meta.currency,
    url: `/${locale}/courses/${slug}`,
    category: course.meta.category,
    level: course.meta.level
  })

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: `/${locale}` },
    { name: 'Courses', url: `/${locale}/courses` },
    { name: course.meta.title, url: `/${locale}/courses/${slug}` }
  ])

  return (
    <>
      <StructuredData data={courseSchema} />
      <StructuredData data={breadcrumbSchema} />
      <CourseTracker 
        slug={slug}
        locale={locale} 
        category={course.meta.category}
        title={course.meta.title}
      />
      <CourseDetail course={course} />
    </>
  )
}