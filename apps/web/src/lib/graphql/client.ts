import { GraphQLClient } from 'graphql-request'

const endpoint = process.env.WORDPRESS_GRAPHQL_ENDPOINT || 'http://localhost:8080/graphql'

export const graphqlClient = new GraphQLClient(endpoint, {
  headers: {
    'Content-Type': 'application/json',
  },
})

// For authenticated requests
export const createAuthenticatedClient = (token?: string) => {
  return new GraphQLClient(endpoint, {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  })
}