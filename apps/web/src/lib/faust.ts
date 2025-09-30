import { getClient } from '@faustjs/next'

export default getClient({
  wpUrl: process.env.NEXT_PUBLIC_WORDPRESS_URL || 'http://localhost:8080',
  apiClientSecret: process.env.FAUST_SECRET_KEY || 'your-secret-key-here',
})

export { getClient } from '@faustjs/next'