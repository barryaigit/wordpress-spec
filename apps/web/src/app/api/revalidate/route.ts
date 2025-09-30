import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath, revalidateTag } from 'next/cache'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { secret, path, tag, type } = body

    // Check for secret to confirm this is a valid request
    if (secret !== process.env.FAUST_SECRET_KEY) {
      return NextResponse.json(
        { message: 'Invalid secret' },
        { status: 401 }
      )
    }

    // Revalidate by path
    if (path) {
      revalidatePath(path)
      console.log(`Revalidated path: ${path}`)
    }

    // Revalidate by tag
    if (tag) {
      revalidateTag(tag)
      console.log(`Revalidated tag: ${tag}`)
    }

    // Handle specific post types
    if (type === 'post' && path) {
      // Revalidate the specific post page
      revalidatePath(`/posts/${path}`)
      // Also revalidate the posts index page
      revalidatePath('/posts')
      console.log(`Revalidated post: ${path}`)
    }

    // If no specific path or tag, revalidate common paths
    if (!path && !tag) {
      revalidatePath('/')
      revalidatePath('/posts')
      console.log('Revalidated home and posts pages')
    }

    return NextResponse.json({
      message: 'Revalidation successful',
      revalidated: true,
      now: Date.now(),
    })
  } catch (error) {
    console.error('Revalidation error:', error)
    return NextResponse.json(
      { message: 'Error revalidating', error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const secret = searchParams.get('secret')
  const path = searchParams.get('path')
  const tag = searchParams.get('tag')

  // Check for secret to confirm this is a valid request
  if (secret !== process.env.FAUST_SECRET_KEY) {
    return NextResponse.json(
      { message: 'Invalid secret' },
      { status: 401 }
    )
  }

  try {
    // Revalidate by path
    if (path) {
      revalidatePath(path)
      console.log(`Revalidated path: ${path}`)
    }

    // Revalidate by tag
    if (tag) {
      revalidateTag(tag)
      console.log(`Revalidated tag: ${tag}`)
    }

    // If no specific path or tag, revalidate home page
    if (!path && !tag) {
      revalidatePath('/')
      console.log('Revalidated home page')
    }

    return NextResponse.json({
      message: 'Revalidation successful',
      revalidated: true,
      now: Date.now(),
    })
  } catch (error) {
    console.error('Revalidation error:', error)
    return NextResponse.json(
      { message: 'Error revalidating', error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}