import { setConfig } from '@faustjs/next'

export default setConfig({
  wpUrl: process.env.NEXT_PUBLIC_WORDPRESS_URL || 'http://localhost:8080',
  apiClientSecret: process.env.FAUST_SECRET_KEY || 'your-secret-key-here',

  // Preview configuration
  previewApiSecret: process.env.FAUST_SECRET_KEY || 'your-secret-key-here',

  // Template mapping for different post types
  templates: {
    post: {
      path: '/posts/[slug]',
    },
    page: {
      path: '/[slug]',
    },
    category: {
      path: '/category/[slug]',
    },
    tag: {
      path: '/tag/[slug]',
    },
  },

  // Enable experimental features
  experimentalAllowedHosts: ['localhost:8080'],

  // Custom post types
  postTypes: ['post', 'page'],

  // GraphQL introspection for development
  introspection: process.env.NODE_ENV === 'development',

  // Authentication
  auth: {
    loginPagePath: '/login',
    logoutPagePath: '/logout',
  },
})