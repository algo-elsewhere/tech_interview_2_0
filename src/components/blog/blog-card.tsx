import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/routing'
import { Post } from '@/lib/content'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Clock, User, Calendar } from 'lucide-react'
import { cn } from '@/lib/utils'

interface BlogCardProps {
  post: Post
  className?: string
}

export function BlogCard({ post, className }: BlogCardProps) {
  const t = useTranslations('blog')
  
  const difficultyColor = {
    beginner: 'bg-green-100 text-green-800 hover:bg-green-200',
    intermediate: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200',
    advanced: 'bg-red-100 text-red-800 hover:bg-red-200',
  }

  return (
    <Card className={cn('h-full transition-all hover:shadow-lg', className)}>
      <CardHeader className="space-y-3">
        <div className="flex items-center justify-between">
          <Badge variant="secondary" className="text-xs">
            {post.meta.category}
          </Badge>
          {post.meta.difficulty && (
            <Badge 
              variant="outline" 
              className={cn('text-xs', difficultyColor[post.meta.difficulty])}
            >
              {t(`difficulty.${post.meta.difficulty}`)}
            </Badge>
          )}
        </div>
        
        <div>
          <h3 className="text-xl font-semibold line-clamp-2 mb-2">
            <Link 
              href={`/blog/${post.slug}`}
              className="hover:text-primary transition-colors"
            >
              {post.meta.title}
            </Link>
          </h3>
          <p className="text-muted-foreground text-sm line-clamp-3">
            {post.excerpt}
          </p>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-3">
        <div className="flex flex-wrap gap-1">
          {post.meta.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
          {post.meta.tags.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{post.meta.tags.length - 3}
            </Badge>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="flex items-center justify-between text-xs text-muted-foreground pt-0">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <User className="h-3 w-3" />
            <span>{post.meta.author}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            <span>
              {new Date(post.meta.publishedAt).toLocaleDateString()}
            </span>
          </div>
        </div>
        
        {post.meta.readingTime && (
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>{post.meta.readingTime} min</span>
          </div>
        )}
      </CardFooter>
    </Card>
  )
}