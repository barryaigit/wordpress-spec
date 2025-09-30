import { gql } from 'graphql-request'
import { POST_FRAGMENT, CATEGORY_FRAGMENT, TAG_FRAGMENT } from './fragments'

export const GET_POSTS = gql`
  ${POST_FRAGMENT}
  query GetPosts($first: Int = 10, $after: String) {
    posts(first: $first, after: $after) {
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      nodes {
        ...PostFragment
      }
    }
  }
`

export const GET_POST_BY_SLUG = gql`
  ${POST_FRAGMENT}
  query GetPostBySlug($slug: ID!) {
    post(id: $slug, idType: SLUG) {
      ...PostFragment
      seo {
        title
        metaDesc
        canonical
        opengraphTitle
        opengraphDescription
        opengraphImage {
          sourceUrl
        }
      }
    }
  }
`

export const GET_PREVIEW_POST = gql`
  ${POST_FRAGMENT}
  query GetPreviewPost($id: ID!, $idType: PostIdType = DATABASE_ID) {
    post(id: $id, idType: $idType) {
      ...PostFragment
      isPreview
      previewRevisionDatabaseId
      isRevision
    }
  }
`

export const GET_CATEGORIES = gql`
  ${CATEGORY_FRAGMENT}
  query GetCategories($first: Int = 100) {
    categories(first: $first) {
      nodes {
        ...CategoryFragment
      }
    }
  }
`

export const GET_TAGS = gql`
  ${TAG_FRAGMENT}
  query GetTags($first: Int = 100) {
    tags(first: $first) {
      nodes {
        ...TagFragment
      }
    }
  }
`