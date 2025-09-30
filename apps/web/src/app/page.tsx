import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Headless WordPress + Next.js
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Modern headless CMS solution powered by WordPress GraphQL and Next.js
          </p>
          <div className="grid md:grid-cols-2 gap-8 mt-12">
            <Card>
              <CardHeader>
                <CardTitle>WordPress Backend</CardTitle>
                <CardDescription>
                  Powerful content management with WPGraphQL API
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild>
                  <a
                    href="http://localhost:8080/wp-admin"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Admin Dashboard
                  </a>
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>GraphQL API</CardTitle>
                <CardDescription>
                  Query your content with GraphQL
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild variant="secondary">
                  <a
                    href="http://localhost:8080/graphql"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GraphQL Endpoint
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
          <div className="mt-12 text-center">
            <Button asChild size="lg">
              <Link href="/posts">查看博客文章</Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
}