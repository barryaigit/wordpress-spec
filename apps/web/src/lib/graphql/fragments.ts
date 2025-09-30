import { gql } from 'graphql-request'

export const POST_FRAGMENT = gql`
  fragment PostFragment on Post {
    id
    databaseId
    title
    content
    excerpt
    slug
    date
    modified
    status
    featuredImage {
      node {
        id
        sourceUrl
        altText
        mediaDetails {
          width
          height
        }
      }
    }
    author {
      node {
        id
        name
        slug
        avatar {
          url
        }
      }
    }
    categories {
      nodes {
        id
        name
        slug
      }
    }
    tags {
      nodes {
        id
        name
        slug
      }
    }
  }
`

export const FEATURED_IMAGE_FRAGMENT = gql`
  fragment FeaturedImageFragment on MediaItem {
    id
    sourceUrl
    altText
    mediaDetails {
      width
      height
    }
  }
`

export const AUTHOR_FRAGMENT = gql`
  fragment AuthorFragment on User {
    id
    name
    slug
    avatar {
      url
    }
  }
`

export const CATEGORY_FRAGMENT = gql`
  fragment CategoryFragment on Category {
    id
    name
    slug
    count
    description
  }
`

export const TAG_FRAGMENT = gql`
  fragment TagFragment on Tag {
    id
    name
    slug
    count
    description
  }
`