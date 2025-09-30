// Utility functions for triggering revalidation

interface RevalidateOptions {
  path?: string
  tag?: string
  type?: 'post' | 'page' | 'category' | 'tag'
}

export async function triggerRevalidation(options: RevalidateOptions) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  const secret = process.env.FAUST_SECRET_KEY

  try {
    const response = await fetch(`${baseUrl}/api/revalidate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        secret,
        ...options,
      }),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const result = await response.json()
    console.log('Revalidation triggered:', result)
    return result
  } catch (error) {
    console.error('Failed to trigger revalidation:', error)
    throw error
  }
}

// Helper functions for specific content types
export const revalidatePost = (slug: string) =>
  triggerRevalidation({ path: slug, type: 'post' })

export const revalidatePage = (slug: string) =>
  triggerRevalidation({ path: slug, type: 'page' })

export const revalidateCategory = (slug: string) =>
  triggerRevalidation({ path: `/category/${slug}`, type: 'category' })

export const revalidateTag = (slug: string) =>
  triggerRevalidation({ path: `/tag/${slug}`, type: 'tag' })

export const revalidateHomePage = () =>
  triggerRevalidation({ path: '/' })

export const revalidatePostsIndex = () =>
  triggerRevalidation({ path: '/posts' })

// WordPress webhook handler
export function handleWordPressWebhook(data: any) {
  const { action, post } = data

  switch (action) {
    case 'post_updated':
    case 'post_published':
      if (post?.slug) {
        return revalidatePost(post.slug)
      }
      break
    case 'post_deleted':
      // Revalidate posts index when a post is deleted
      return revalidatePostsIndex()
    default:
      console.log('Unknown webhook action:', action)
  }
}