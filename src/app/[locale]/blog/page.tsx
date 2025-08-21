import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { getAllPosts } from '@/lib/content'
import { BlogList } from '@/components/blog/blog-list'

interface BlogPageProps {
  params: Promise<{ locale: string }>
  searchParams: Promise<{ category?: string; page?: string }>
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'blog' })

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

export default async function BlogPage({
  params,
  searchParams
}: BlogPageProps) {
  const { locale } = await params
  const { category, page } = await searchParams
  const t = await getTranslations({ locale, namespace: 'blog' })
  
  const allPosts = getAllPosts(locale)
  
  // Filter by category if specified
  const filteredPosts = category
    ? allPosts.filter(post => 
        post.meta.category.toLowerCase() === category.toLowerCase()
      )
    : allPosts

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
      
      <BlogList 
        posts={filteredPosts}
        currentCategory={category}
        currentPage={page ? parseInt(page) : 1}
      />
    </div>
  )
}