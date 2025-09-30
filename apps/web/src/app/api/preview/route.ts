import { NextRequest } from 'next/server'
import { handlePreview } from '@/lib/preview'

export async function GET(request: NextRequest) {
  return handlePreview(request)
}