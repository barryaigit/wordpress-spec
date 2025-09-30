import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface PostCardProps {
  post: {
    id: string
    title: string
    excerpt: string
    slug: string
    date: string
    featuredImage?: {
      node: {
        sourceUrl: string
        altText: string
        mediaDetails: {
          width: number
          height: number
        }
      }
    } | null
    author: {
      node: {
        name: string
        slug: string
      }
    }
    categories: {
      nodes: Array<{
        name: string
        slug: string
      }>
    }
  }
}

export function PostCard({ post }: PostCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  const stripHtml = (html: string) => {
    return html.replace(/<[^>]*>/g, '').substring(0, 150) + '...'
  }

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <Link href={`/posts/${post.slug}`}>
        {post.featuredImage && (
          <div className="relative h-48 w-full">
            <Image
              src={post.featuredImage.node.sourceUrl}
              alt={post.featuredImage.node.altText || post.title}
              fill
              className="object-cover"
            />
          </div>
        )}
        <CardHeader>
          <div className="flex flex-wrap gap-2 mb-2">
            {post.categories.nodes.map((category) => (
              <Badge key={category.slug} variant="secondary">
                {category.name}
              </Badge>
            ))}
          </div>
          <CardTitle className="line-clamp-2 hover:text-primary transition-colors">
            {post.title}
          </CardTitle>
          <CardDescription>
            {formatDate(post.date)} • 作者：{post.author.node.name}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground line-clamp-3">
            {stripHtml(post.excerpt || '')}
          </p>
        </CardContent>
      </Link>
    </Card>
  )
}