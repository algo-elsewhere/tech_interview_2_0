import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getCourseBySlug, getAllCourses } from '@/lib/content'
import { CourseDetail } from '@/components/courses/course-detail'

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

  return {
    title: course.meta.title,
    description: course.meta.description,
    authors: [{ name: course.meta.author }],
    openGraph: {
      title: course.meta.title,
      description: course.meta.description,
      type: 'article',
      publishedTime: course.meta.publishedAt,
      modifiedTime: course.meta.updatedAt,
      authors: [course.meta.author],
      tags: course.meta.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: course.meta.title,
      description: course.meta.description,
    },
    keywords: course.meta.tags,
  }
}

export default async function CourseDetailPage({ params }: CourseDetailPageProps) {
  const { locale, slug } = await params
  const course = getCourseBySlug(slug, locale)

  if (!course) {
    notFound()
  }

  return <CourseDetail course={course} />
}