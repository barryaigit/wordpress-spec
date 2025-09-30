import { NextRequest } from 'next/server'
import { exitPreview } from '@/lib/preview'

export async function GET(request: NextRequest) {
  return exitPreview(request)
}