/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8080',
        pathname: '/wp-content/uploads/**',
      },
    ],
  },
  env: {
    WORDPRESS_GRAPHQL_ENDPOINT: process.env.WORDPRESS_GRAPHQL_ENDPOINT || 'http://localhost:8080/index.php?graphql=true',
    FAUST_SECRET_KEY: process.env.FAUST_SECRET_KEY || 'your-secret-key',
  },
}

module.exports = nextConfig