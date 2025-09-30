import { Suspense } from 'react'
import { graphqlClient } from '@/lib/graphql/client'
import { GET_POSTS } from '@/lib/graphql/queries'
import { PostList } from '@/components/blog/post-list'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

async function getPosts() {
  try {
    const data = await graphqlClient.request(GET_POSTS, {
      first: 12,
    })
    return data.posts.nodes
  } catch (error) {
    console.error('Error fetching posts:', error)
    return []
  }
}

export default async function PostsPage() {
  const posts = await getPosts()

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">博客文章</h1>
          <p className="text-gray-600">探索我们的最新内容和见解</p>
        </div>
        <Button asChild>
          <Link href="/">返回首页</Link>
        </Button>
      </div>

      <Suspense fallback={<PostList posts={[]} loading={true} />}>
        <PostList posts={posts} />
      </Suspense>

      {posts.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            暂无文章
          </h3>
          <p className="text-gray-600 mb-4">
            还没有发布任何文章。请先在 WordPress 后台创建一些内容。
          </p>
          <div className="space-x-4">
            <Button asChild variant="outline">
              <Link href="http://localhost:8080/wp-admin" target="_blank">
                WordPress 后台
              </Link>
            </Button>
            <Button asChild>
              <Link href="/">返回首页</Link>
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

export const revalidate = 60 // ISR: revalidate every 60 seconds