import { PostCard } from './post-card'
import { Skeleton } from '@/components/ui/skeleton'

interface PostListProps {
  posts: Array<{
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
  }>
  loading?: boolean
}

export function PostList({ posts, loading = false }: PostListProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="space-y-4">
            <Skeleton className="h-48 w-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (!posts.length) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">暂无文章</h3>
        <p className="text-gray-600">还没有发布任何文章。</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  )
}