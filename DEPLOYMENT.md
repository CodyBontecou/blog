# Deployment Guide

This monorepo requires **two separate Vercel projects** to deploy both apps with custom domains.

## Architecture

- **Blog**: codybontecou.com (VitePress static site)
- **Admin**: admin.codybontecou.com (Nuxt SSR app)

## Project 1: Blog (codybontecou.com)

### Vercel Configuration

**Your existing Vercel project** - Update these settings in the Vercel dashboard:

1. **Root Directory**: `apps/blog`
2. **Framework Preset**: Other
3. **Build Command**: `pnpm build`
4. **Output Directory**: `.vitepress/dist`
5. **Install Command**: `pnpm install`

Or use the root `vercel.json` which is already configured.

### Environment Variables

```
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_anon_key
RESEND_API_KEY=your_resend_api_key
```

### Deployment

```bash
# From root directory
vercel --prod
```

The root `vercel.json` will handle the build correctly.

---

## Project 2: Admin (admin.codybontecou.com)

### Create New Vercel Project

1. Go to Vercel Dashboard → Add New Project
2. Import the same GitHub repository
3. Configure the project:

**Settings**:
- **Project Name**: `blog-admin` (or your preferred name)
- **Root Directory**: `apps/admin`
- **Framework Preset**: Nuxt.js
- **Build Command**: `pnpm build`
- **Output Directory**: `.output/public`
- **Install Command**: `pnpm install`

### Environment Variables

```
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_anon_key
NUXT_PUBLIC_SUPABASE_URL=your_supabase_url
NUXT_PUBLIC_SUPABASE_KEY=your_supabase_anon_key
```

### Custom Domain

1. In the admin Vercel project, go to Settings → Domains
2. Add domain: `admin.codybontecou.com`
3. Add the required DNS records to your domain provider

---

## DNS Configuration

In your domain provider (Vercel, Cloudflare, etc.), set up:

### For codybontecou.com (Blog)
```
Type: A or CNAME
Name: @ (root)
Value: [Vercel's IP or CNAME]
```

### For admin.codybontecou.com (Admin)
```
Type: CNAME
Name: admin
Value: cname.vercel-dns.com
```

---

## Deployment Workflow

### Automatic Deployments

Both projects can be set to auto-deploy from the same repository:

- **Blog**: Deploys on push to `main` (watches `apps/blog/*`)
- **Admin**: Deploys on push to `main` (watches `apps/admin/*`)

Configure "Ignored Build Step" in Vercel:

#### Blog Project
```bash
# In Vercel project settings → Git → Ignored Build Step
git diff HEAD^ HEAD --quiet . apps/blog
```

#### Admin Project
```bash
# In Vercel project settings → Git → Ignored Build Step
git diff HEAD^ HEAD --quiet . apps/admin
```

This ensures each project only rebuilds when its own files change.

---

## Manual Deployment

### Deploy Blog Only
```bash
vercel --prod
```

### Deploy Admin Only
```bash
cd apps/admin
vercel --prod
```

---

## Verification

After deployment:
- Blog: https://codybontecou.com
- Admin: https://admin.codybontecou.com

Test both apps to ensure:
- ✅ Blog loads and displays content
- ✅ Admin loads and Supabase auth works
- ✅ Custom domains resolve correctly
- ✅ HTTPS is enabled
