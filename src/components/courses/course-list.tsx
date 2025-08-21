'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { Course } from '@/lib/content'
import { CourseCard } from './course-card'
import { CourseFilters } from './course-filters'
import { CoursePagination } from './course-pagination'

interface CourseListProps {
  courses: Course[]
  currentCategory?: string
  currentLevel?: string
  currentPage: number
}

const COURSES_PER_PAGE = 6

export function CourseList({ 
  courses, 
  currentCategory, 
  currentLevel,
  currentPage 
}: CourseListProps) {
  const t = useTranslations('courses')
  const [searchQuery, setSearchQuery] = useState('')
  
  // Filter courses by search query
  const filteredCourses = courses.filter(course => {
    if (!searchQuery) return true
    
    const query = searchQuery.toLowerCase()
    return (
      course.meta.title.toLowerCase().includes(query) ||
      course.meta.description.toLowerCase().includes(query) ||
      course.meta.tags.some(tag => tag.toLowerCase().includes(query))
    )
  })
  
  // Calculate pagination
  const totalCourses = filteredCourses.length
  const totalPages = Math.ceil(totalCourses / COURSES_PER_PAGE)
  const startIndex = (currentPage - 1) * COURSES_PER_PAGE
  const endIndex = startIndex + COURSES_PER_PAGE
  const currentCourses = filteredCourses.slice(startIndex, endIndex)
  
  // Get unique categories and levels for filters
  const categories = Array.from(
    new Set(courses.map(course => course.meta.category))
  ).sort()
  
  const levels = Array.from(
    new Set(courses.map(course => course.meta.level).filter(Boolean))
  ).sort() as string[]

  return (
    <div className="space-y-8">
      <CourseFilters
        categories={categories}
        levels={levels}
        currentCategory={currentCategory}
        currentLevel={currentLevel}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
      
      {filteredCourses.length === 0 ? (
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
            {currentCourses.map((course) => (
              <CourseCard key={course.slug} course={course} />
            ))}
          </div>
          
          {totalPages > 1 && (
            <CoursePagination
              currentPage={currentPage}
              totalPages={totalPages}
              category={currentCategory}
              level={currentLevel}
            />
          )}
        </>
      )}
    </div>
  )
}