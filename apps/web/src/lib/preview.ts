import { NextRequest, NextResponse } from 'next/server'
import { graphqlClient } from './graphql/client'
import { GET_PREVIEW_POST } from './graphql/queries'

export interface PreviewData {
  id: string
  slug: string
  status: string
  type: string
}

export async function handlePreview(request: NextRequest) {
  const { searchParams } = new URL(request.url)

  const secret = searchParams.get('secret')
  const id = searchParams.get('id')
  const slug = searchParams.get('slug')
  const type = searchParams.get('type') || 'post'

  // Check the secret and next parameters
  if (secret !== process.env.FAUST_SECRET_KEY) {
    return NextResponse.json({ message: 'Invalid token' }, { status: 401 })
  }

  if (!id || !slug) {
    return NextResponse.json({ message: 'Missing id or slug' }, { status: 400 })
  }

  try {
    // Fetch the post to check if it exists
    const data = await graphqlClient.request(GET_PREVIEW_POST, {
      id: parseInt(id),
      idType: 'DATABASE_ID',
    })

    if (!data.post) {
      return NextResponse.json({ message: 'Post not found' }, { status: 404 })
    }

    // Enable Preview Mode
    const response = NextResponse.redirect(
      new URL(`/posts/${slug}`, request.url)
    )

    response.cookies.set('__prerender_bypass', '1', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'none',
      maxAge: 60 * 60 * 24, // 24 hours
    })

    response.cookies.set('__next_preview_data', JSON.stringify({
      id,
      slug,
      type,
    }), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'none',
      maxAge: 60 * 60 * 24, // 24 hours
    })

    return response
  } catch (error) {
    console.error('Preview error:', error)
    return NextResponse.json(
      { message: 'Failed to enable preview mode' },
      { status: 500 }
    )
  }
}

export async function exitPreview(request: NextRequest) {
  const response = NextResponse.redirect(new URL('/', request.url))

  response.cookies.delete('__prerender_bypass')
  response.cookies.delete('__next_preview_data')

  return response
}