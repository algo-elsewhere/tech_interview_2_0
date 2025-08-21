import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPostBySlug, getAllPosts } from '@/lib/content'
import { BlogPost } from '@/components/blog/blog-post'
import { BlogPostTracker } from '@/components/blog/blog-post-tracker'
import { StructuredData } from '@/components/seo'
import { generateSEOMetadata, generateArticleSchema, generateBreadcrumbSchema } from '@/lib/seo'

interface BlogPostPageProps {
  params: Promise<{ locale: string; slug: string }>
}

export async function generateStaticParams() {
  const locales = ['en', 'zh-Hans', 'zh-Hant']
  const allParams: { locale: string; slug: string }[] = []
  
  for (const locale of locales) {
    const posts = getAllPosts(locale)
    posts.forEach((post) => {
      allParams.push({
        locale,
        slug: post.slug,
      })
    })
  }
  
  return allParams
}

export async function generateMetadata({
  params
}: BlogPostPageProps): Promise<Metadata> {
  const { locale, slug } = await params
  const post = getPostBySlug(slug, locale)

  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  return generateSEOMetadata({
    title: post.meta.title,
    description: post.meta.description,
    keywords: post.meta.tags,
    canonical: `/${locale}/blog/${slug}`,
    ogType: 'article',
    publishedTime: post.meta.publishedAt,
    modifiedTime: post.meta.updatedAt,
    authors: [post.meta.author],
    category: post.meta.category,
    locale
  })
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { locale, slug } = await params
  const post = getPostBySlug(slug, locale)

  if (!post) {
    notFound()
  }

  const articleSchema = generateArticleSchema({
    title: post.meta.title,
    description: post.meta.description,
    author: post.meta.author,
    publishedTime: post.meta.publishedAt,
    modifiedTime: post.meta.updatedAt,
    url: `/${locale}/blog/${slug}`,
    category: post.meta.category
  })

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: `/${locale}` },
    { name: 'Blog', url: `/${locale}/blog` },
    { name: post.meta.title, url: `/${locale}/blog/${slug}` }
  ])

  return (
    <>
      <StructuredData data={articleSchema} />
      <StructuredData data={breadcrumbSchema} />
      <BlogPostTracker 
        slug={slug}
        locale={locale} 
        category={post.meta.category}
        title={post.meta.title}
      />
      <BlogPost post={post} />
    </>
  )
}