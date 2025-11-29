# Blog Monorepo

This is a monorepo containing a VitePress blog and a Nuxt admin dashboard.

## Structure

```
.
├── apps/
│   ├── blog/          # VitePress blog (main website)
│   └── admin/         # Nuxt admin dashboard (content management)
├── packages/
│   └── shared/        # Shared utilities and types
└── pnpm-workspace.yaml
```

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm (for workspace management)

### Installation

```bash
pnpm install
```

### Development

Run both apps in parallel:
```bash
pnpm dev
```

Run individual apps:
```bash
# Blog only (http://localhost:5173)
pnpm dev:blog

# Admin only (http://localhost:3001)
pnpm dev:admin
```

### Building

Build blog for production:
```bash
pnpm build
```

Build admin for production:
```bash
pnpm build:admin
```

Build all apps:
```bash
pnpm build:all
```

### Preview

Preview blog:
```bash
pnpm preview
```

Preview admin:
```bash
pnpm preview:admin
```

## Apps

### Blog (`apps/blog`)

VitePress-based blog with:
- Newsletter integration
- Comments system
- Text-to-speech for articles
- RSS feed
- Sitemap generation

### Admin (`apps/admin`)

Nuxt-based admin dashboard for:
- Content management
- Newsletter management
- Authentication with Supabase
- Article editing and publishing

## Deployment

### Blog (Vercel)

The blog is deployed to Vercel using the root `vercel.json` configuration.

```bash
vercel --prod
```

### Admin (Vercel)

The admin dashboard should be deployed as a separate Vercel project:

1. Create a new Vercel project
2. Set the root directory to `apps/admin`
3. Framework preset: Nuxt.js
4. Build command: `cd ../.. && pnpm install && cd apps/admin && pnpm build`
5. Output directory: `.output/public`

Or use the `apps/admin/vercel.json` configuration.

## Environment Variables

Both apps require:
- `SUPABASE_URL`
- `SUPABASE_KEY`
- `RESEND_API_KEY` (blog only)

Copy `.env.example` to `.env` in each app directory and fill in your values.

## Scripts

Available in `apps/blog`:
- `newsletter` - Send newsletter
- `sync:articles` - Sync articles from Supabase
- `import:articles` - Import articles to Supabase
- `tts:generate` - Generate text-to-speech audio

Run with:
```bash
pnpm --filter @blog/vitepress <script-name>
```
