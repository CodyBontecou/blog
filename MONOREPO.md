# Monorepo Structure

This project is organized as a monorepo with separate apps for different concerns.

## Structure

```
├── apps/
│   ├── admin/          # Nuxt app for course/lesson management
│   ├── blog/           # VitePress blog (content/ and .vitepress/)
│   └── courses/        # Nuxt app for public course viewing
├── packages/
│   └── shared/         # Shared utilities, types, Supabase client
└── package.json        # Root workspace configuration
```

## Apps

### Admin (`apps/admin`)
- **Port**: 3001
- **Purpose**: Course and lesson management interface for admins
- **Routes**:
  - `/` - Courses dashboard
  - `/courses/[id]` - Edit course
  - `/lessons/[courseId]` - Manage lessons for a course
  - `/lessons/[courseId]/[lessonId]` - Edit specific lesson

### Blog (`apps/blog`)
- **Port**: 5173 (dev)
- **Purpose**: VitePress blog with articles and content
- **Location**: Root directory (existing VitePress setup)

### Courses (`apps/courses`)
- **Port**: 3002
- **Purpose**: Public-facing course viewer for students
- **Routes**:
  - `/` - Browse available courses
  - `/[slug]` - View course details and lessons

## Shared Package (`packages/shared`)

Contains code shared between apps:
- Supabase client configuration
- TypeScript types
- Common utilities

## Development

```bash
# Install dependencies
pnpm install

# Run all apps in parallel
pnpm dev

# Run individual apps
pnpm dev:blog      # VitePress blog on :5173
pnpm dev:admin     # Admin app on :3001
pnpm dev:courses   # Courses app on :3002
```

## Building

```bash
# Build all apps
pnpm build

# Build individual apps
pnpm build:blog
pnpm build:admin
pnpm build:courses
```

## Deployment

Each app can be deployed independently:

- **Blog**: Deploy VitePress static site (existing setup)
- **Admin**: Deploy Nuxt app at `/admin` subdirectory or separate domain
- **Courses**: Deploy Nuxt app at `/courses` subdirectory or separate domain

## Benefits

1. **Separation of Concerns**: Each app has its own routing, state, and dependencies
2. **Right Tool for the Job**: VitePress for blog, Nuxt for interactive apps
3. **Code Sharing**: Common code in `packages/shared`
4. **Independent Deployment**: Deploy only what changed
5. **Better DX**: No more fighting VitePress routing for admin/courses

## Next Steps

1. Move admin components from `.vitepress/theme/components` to `apps/admin/components`
2. Move course components to `apps/courses/components`
3. Update imports to use `@blog/shared`
4. Configure deployment (Vercel supports monorepos natively)
