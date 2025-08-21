import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPostBySlug, getAllPosts } from '@/lib/content'
import { BlogPost } from '@/components/blog/blog-post'

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

  return {
    title: post.meta.title,
    description: post.meta.description,
    authors: [{ name: post.meta.author }],
    openGraph: {
      title: post.meta.title,
      description: post.meta.description,
      type: 'article',
      publishedTime: post.meta.publishedAt,
      modifiedTime: post.meta.updatedAt,
      authors: [post.meta.author],
      tags: post.meta.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.meta.title,
      description: post.meta.description,
    },
    keywords: post.meta.tags,
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { locale, slug } = await params
  const post = getPostBySlug(slug, locale)

  if (!post) {
    notFound()
  }

  return <BlogPost post={post} />
}