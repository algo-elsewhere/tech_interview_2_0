import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/routing'
import { Post } from '@/lib/content'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { MDXContent } from '@/components/mdx/mdx-content'
import { Calendar, Clock, User, ArrowLeft, Share2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface BlogPostProps {
  post: Post
}

export function BlogPost({ post }: BlogPostProps) {
  const t = useTranslations('blog')
  
  const difficultyColor = {
    beginner: 'bg-green-100 text-green-800',
    intermediate: 'bg-yellow-100 text-yellow-800',
    advanced: 'bg-red-100 text-red-800',
  }

  return (
    <article className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Back Navigation */}
      <div className="mb-8">
        <Link href="/blog">
          <Button variant="ghost" size="sm" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            {t('backToBlog')}
          </Button>
        </Link>
      </div>

      {/* Article Header */}
      <header className="mb-8 space-y-6">
        {/* Categories and Difficulty */}
        <div className="flex items-center gap-2 flex-wrap">
          <Badge variant="secondary">
            {post.meta.category}
          </Badge>
          {post.meta.difficulty && (
            <Badge 
              variant="outline" 
              className={cn(difficultyColor[post.meta.difficulty])}
            >
              {t(`difficulty.${post.meta.difficulty}`)}
            </Badge>
          )}
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          {post.meta.title}
        </h1>

        {/* Description */}
        <p className="text-xl text-muted-foreground leading-relaxed">
          {post.meta.description}
        </p>

        {/* Meta Information */}
        <div className="flex items-center gap-6 text-sm text-muted-foreground flex-wrap">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span>{post.meta.author}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <time dateTime={post.meta.publishedAt}>
              {new Date(post.meta.publishedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </time>
          </div>
          
          {post.meta.readingTime && (
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>{post.meta.readingTime} min read</span>
            </div>
          )}

          {post.meta.updatedAt && post.meta.updatedAt !== post.meta.publishedAt && (
            <div className="text-xs">
              Updated: {new Date(post.meta.updatedAt).toLocaleDateString()}
            </div>
          )}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {post.meta.tags.map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              #{tag}
            </Badge>
          ))}
        </div>

        {/* Share Button */}
        <div className="flex items-center gap-4 pt-4 border-t">
          <Button variant="outline" size="sm" className="gap-2">
            <Share2 className="h-4 w-4" />
            {t('share')}
          </Button>
        </div>
      </header>

      {/* Article Content */}
      <div className="prose prose-gray dark:prose-invert max-w-none">
        <MDXContent content={post.content} />
      </div>

      {/* Article Footer */}
      <footer className="mt-16 pt-8 border-t">
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            {t('wasHelpful')}
          </div>
          
          <Link href="/blog">
            <Button variant="outline" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              {t('backToBlog')}
            </Button>
          </Link>
        </div>
      </footer>
    </article>
  )
}