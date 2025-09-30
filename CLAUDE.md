# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a headless WordPress CMS project with a Next.js frontend. The architecture consists of:
- WordPress backend running in Docker containers (cms/wordpress/)
- Next.js frontend application (apps/web/) using App Router
- GraphQL communication between frontend and backend via WPGraphQL

## Essential Commands

### Development Setup
```bash
# 1. Start WordPress backend
cd cms/wordpress && docker compose up -d

# 2. Install WPGraphQL plugin (choose one method):
# Method A: Via WordPress admin at http://localhost:8080/wp-admin
# Method B: Via WP-CLI in container
docker exec -it wordpress-app bash
wp plugin install wp-graphql --activate --allow-root

# 3. Start Next.js frontend
cd apps/web
npm install
npm run dev
```

### Common Development Commands
```bash
# Frontend development (run from apps/web/)
npm run dev              # Start development server
npm run build            # Build for production
npm run start            # Start production server
npm run lint             # Run ESLint
npm run type-check       # TypeScript type checking

# GraphQL code generation
npm run codegen          # Generate TypeScript types from GraphQL schema
npm run codegen:watch    # Watch mode for GraphQL code generation

# Testing
npm run test             # Run Jest tests
npm run test:watch       # Run tests in watch mode

# Performance
npm run lighthouse       # Run Lighthouse CI
```

### Docker Management
```bash
# WordPress containers (run from cms/wordpress/)
docker compose up -d     # Start containers
docker compose down      # Stop containers
docker exec -it wordpress-app bash  # Access WordPress container
```

## Architecture & Key Concepts

### GraphQL Integration
- **Endpoint**: `http://localhost:8080/index.php?graphql=true` (not `/graphql`)
- **Code generation**: Uses GraphQL Code Generator to create TypeScript types
- **Client**: Uses `graphql-request` for GraphQL queries
- **Schema location**: Auto-generated types in `src/gql/`

### Faust.js Headless WordPress Framework
- **Configuration**: `faust.config.js` defines post type templates and routing
- **Preview system**: Handles WordPress preview functionality via `/api/preview`
- **ISR integration**: Incremental Static Regeneration via `/api/revalidate`
- **Authentication**: Configured for WordPress application passwords

### Next.js App Router Structure
- **Route groups**: Uses `(public)` route group for public pages
- **Dynamic routes**: `[slug]` for post/page routes
- **API routes**: Preview, revalidate, and Faust.js integration endpoints
- **Components**: UI components in `src/components/` (shadcn/ui + custom blog components)

### Environment Configuration
Required environment variables in `apps/web/.env.local`:
```
NEXT_PUBLIC_WORDPRESS_URL=http://localhost:8080
WORDPRESS_GRAPHQL_ENDPOINT=http://localhost:8080/index.php?graphql=true
FAUST_SECRET_KEY=your-secret-key-here
WORDPRESS_APPLICATION_PASSWORD=your-application-password
NEXT_PUBLIC_WORDPRESS_APPLICATION_USERNAME=admin
```

### GraphQL Client Architecture
- **Base client**: `src/lib/graphql/client.ts` - GraphQLClient setup
- **Queries**: `src/lib/graphql/queries.ts` - GraphQL query definitions
- **Fragments**: `src/lib/graphql/fragments.ts` - Reusable GraphQL fragments
- **Generated types**: `src/gql/` - Auto-generated from schema

## Important Notes

### WordPress Setup Requirements
- WPGraphQL plugin must be installed and activated
- WordPress and Next.js must use the same `FAUST_SECRET_KEY`
- GraphQL endpoint is `index.php?graphql=true`, not `/graphql`

### Development Workflow
1. Always run `npm run codegen` after GraphQL schema changes
2. Use `npm run type-check` before commits to catch TypeScript errors
3. Preview functionality requires proper secret key configuration
4. ISR revalidation works via webhook calls to `/api/revalidate`

### Technology Stack
- **Frontend**: Next.js 14 with App Router, TypeScript, TailwindCSS
- **UI Components**: shadcn/ui with Radix UI primitives
- **GraphQL**: graphql-request + GraphQL Code Generator
- **Headless CMS**: Faust.js framework for WordPress integration
- **Backend**: WordPress 6.4 with WPGraphQL plugin in Docker

### File Structure Patterns
- **Pages**: `src/app/` - Next.js App Router pages
- **Components**: `src/components/ui/` (shadcn/ui) and `src/components/blog/` (custom)
- **Utilities**: `src/lib/` - Shared utilities and configurations
- **GraphQL**: `src/lib/graphql/` - GraphQL related code
- **Generated**: `src/gql/` - Auto-generated GraphQL types (do not edit manually)