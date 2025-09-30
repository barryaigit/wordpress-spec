import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { graphqlClient } from '@/lib/graphql/client'
import { GET_POST_BY_SLUG, GET_POSTS } from '@/lib/graphql/queries'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'

interface PostPageProps {
  params: {
    slug: string
  }
}

async function getPost(slug: string) {
  try {
    const data = await graphqlClient.request(GET_POST_BY_SLUG, { slug })
    return data.post
  } catch (error) {
    console.error('Error fetching post:', error)
    return null
  }
}

async function getAllPosts() {
  try {
    const data = await graphqlClient.request(GET_POSTS, { first: 100 })
    return data.posts.nodes
  } catch (error) {
    console.error('Error fetching posts for static paths:', error)
    return []
  }
}

export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map((post: any) => ({
    slug: post.slug,
  }))
}

export default async function PostPage({ params }: PostPageProps) {
  const post = await getPost(params.slug)

  if (!post) {
    notFound()
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  return (
    <article className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <Button asChild variant="outline" className="mb-6">
          <Link href="/posts">← 返回文章列表</Link>
        </Button>

        {/* Featured Image */}
        {post.featuredImage && (
          <div className="relative w-full h-64 md:h-96 mb-8 rounded-lg overflow-hidden">
            <Image
              src={post.featuredImage.node.sourceUrl}
              alt={post.featuredImage.node.altText || post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Categories */}
        {post.categories.nodes.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {post.categories.nodes.map((category: any) => (
              <Badge key={category.slug} variant="secondary">
                {category.name}
              </Badge>
            ))}
          </div>
        )}

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          {post.title}
        </h1>

        {/* Meta information */}
        <div className="flex items-center text-gray-600 mb-8">
          <span>{formatDate(post.date)}</span>
          <span className="mx-2">•</span>
          <span>作者：{post.author.node.name}</span>
          {post.modified !== post.date && (
            <>
              <span className="mx-2">•</span>
              <span>更新于：{formatDate(post.modified)}</span>
            </>
          )}
        </div>

        {/* Excerpt */}
        {post.excerpt && (
          <Card className="mb-8">
            <CardContent className="pt-6">
              <div
                className="text-lg text-gray-700 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: post.excerpt }}
              />
            </CardContent>
          </Card>
        )}
      </div>

      {/* Content */}
      <div
        className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-blue-600 prose-strong:text-gray-900"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      {/* Tags */}
      {post.tags.nodes.length > 0 && (
        <div className="mt-12 pt-8 border-t">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">标签</h3>
          <div className="flex flex-wrap gap-2">
            {post.tags.nodes.map((tag: any) => (
              <Badge key={tag.slug} variant="outline">
                #{tag.name}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Back to posts */}
      <div className="mt-12 pt-8 border-t text-center">
        <Button asChild>
          <Link href="/posts">查看更多文章</Link>
        </Button>
      </div>
    </article>
  )
}

export const revalidate = 60 // ISR: revalidate every 60 seconds