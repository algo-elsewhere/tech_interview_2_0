'use client'

import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui'
import { Link } from '@/i18n/routing'
import { ArrowRight, Star, Users, Briefcase, TrendingUp } from 'lucide-react'
import { useTracking } from '@/hooks/use-tracking'

const companies = [
  'Google', 'Meta', 'Amazon', 'Microsoft', 'Apple'
]

export function HeroSection() {
  const t = useTranslations('hero')
  const { trackCTA } = useTracking()

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto px-4 py-16 sm:py-24">
        <div className="mx-auto max-w-4xl text-center">
          {/* Main Heading */}
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
            {t('title')}
          </h1>
          
          {/* Subtitle */}
          <p className="mt-4 text-xl font-medium text-primary sm:text-2xl">
            {t('subtitle')}
          </p>
          
          {/* Description */}
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
            {t('description')}
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button 
              asChild 
              size="lg" 
              className="group"
              onClick={() => trackCTA({
                location: 'hero',
                action: 'get_started',
                label: 'Get Started - Courses'
              })}
            >
              <Link href="/courses">
                {t('getStarted')}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              asChild
              onClick={() => trackCTA({
                location: 'hero',
                action: 'view_courses',
                label: 'View Courses - About'
              })}
            >
              <Link href="/about">
                {t('viewCourses')}
              </Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-3">
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mb-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <div className="text-3xl font-bold text-foreground">
                {t('stats.students')}
              </div>
              <div className="text-sm text-muted-foreground">
                {t('stats.studentsLabel')}
              </div>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mb-4">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <div className="text-3xl font-bold text-foreground">
                {t('stats.successRate')}
              </div>
              <div className="text-sm text-muted-foreground">
                {t('stats.successLabel')}
              </div>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mb-4">
                <Briefcase className="h-6 w-6 text-primary" />
              </div>
              <div className="text-3xl font-bold text-foreground">
                {t('stats.companies')}
              </div>
              <div className="text-sm text-muted-foreground">
                {t('stats.companiesLabel')}
              </div>
            </div>
          </div>

          {/* Trusted By */}
          <div className="mt-16">
            <p className="text-sm font-medium text-muted-foreground mb-8">
              {t('trustedBy')}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-8 opacity-60">
              {companies.map((company) => (
                <div
                  key={company}
                  className="text-xl font-semibold text-foreground"
                >
                  {company}
                </div>
              ))}
            </div>
          </div>

          {/* Social Proof */}
          <div className="mt-12 flex items-center justify-center gap-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <span className="ml-2 text-sm text-muted-foreground">
              Rated 4.9/5 by 2,000+ students
            </span>
          </div>
        </div>
      </div>
      
      {/* Background Decoration */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -right-32 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-40 -left-32 h-80 w-80 rounded-full bg-secondary/10 blur-3xl" />
      </div>
    </section>
  )
}