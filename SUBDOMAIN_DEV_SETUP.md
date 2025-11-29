# Subdomain Development Setup

This guide will help you set up local development with subdomain routing to replicate the production environment.

## Overview

In production:
- Main blog: `codybontecou.com`
- Admin app: `admin.codybontecou.com`
- Courses app: `courses.codybontecou.com`

This setup allows you to develop locally using the same subdomain structure.

## Prerequisites

- Node.js and pnpm installed
- Administrator/sudo access (required for port 80)

## Quick Start

### 1. Configure Local DNS

Add these entries to your `/etc/hosts` file:

```bash
sudo nano /etc/hosts
```

Add these lines:

```
127.0.0.1 codybontecou.com
127.0.0.1 admin.codybontecou.com
127.0.0.1 courses.codybontecou.com
```

Save and exit (Ctrl+X, then Y, then Enter)

### 2. Start Development Servers

Run a single command to start all apps with subdomain routing:

```bash
pnpm dev:subdomains
```

This will:
- Start the main blog (VitePress) on port 5173
- Start the admin app (Nuxt) on port 3001
- Start the courses app (Nuxt) on port 3002
- Start the reverse proxy on port 80

### 3. Access Your Apps

Open your browser and visit:
- Main blog: `http://codybontecou.com`
- Admin: `http://admin.codybontecou.com`
- Courses: `http://courses.codybontecou.com`

## How It Works

### Reverse Proxy

The `scripts/dev-proxy.ts` file creates a reverse proxy server that:
1. Listens on port 80 (requires sudo)
2. Routes requests based on subdomain:
   - `codybontecou.com` → `localhost:5173` (VitePress)
   - `admin.codybontecou.com` → `localhost:3001` (Admin Nuxt)
   - `courses.codybontecou.com` → `localhost:3002` (Courses Nuxt)
3. Handles WebSocket connections for hot-reload

### Environment Variable

The `USE_SUBDOMAIN_ROUTING=true` environment variable tells the Nuxt apps to:
- Use `/` as the baseURL instead of `/admin/` or `/courses/`
- This ensures assets and navigation work correctly with subdomain routing

### Configuration

Both Nuxt apps (`apps/admin/nuxt.config.ts` and `apps/courses/nuxt.config.ts`) have been updated to support both modes:

```typescript
app: {
  // Use subdomain routing in dev, path-based in production
  baseURL: process.env.USE_SUBDOMAIN_ROUTING === 'true' ? '/' : '/admin/',
  // ...
}
```

## Troubleshooting

### Port 80 Already in Use

If you get an error that port 80 is already in use:

```bash
# Check what's using port 80
sudo lsof -i :80

# Kill the process if needed
sudo kill -9 <PID>
```

### Sudo Password Prompt

The proxy server requires sudo to bind to port 80. You'll be prompted for your password when running `pnpm dev:subdomains`.

To avoid the password prompt, you can:
1. Use a different port (like 8080) and update the proxy script
2. Add a sudo rule for the specific command (advanced)

### DNS Not Resolving

If the domains don't resolve:
1. Verify entries in `/etc/hosts`
2. Clear DNS cache:
   ```bash
   # macOS
   sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder

   # Linux
   sudo systemd-resolve --flush-caches
   ```
3. Try accessing via `http://` (not `https://`)

### Hot Reload Not Working

If hot-reload stops working:
1. Check that WebSocket connections are established in browser DevTools
2. Restart the dev servers with `Ctrl+C` and run `pnpm dev:subdomains` again

## Alternative Development Modes

### Path-Based Routing (Legacy)

If you prefer the old path-based routing:

```bash
# Start individual apps
pnpm dev:blog      # localhost:5173
pnpm dev:admin     # localhost:3001/admin/
pnpm dev:courses   # localhost:3002/courses/
```

Or all at once (without proxy):

```bash
pnpm dev
```

### Running Individual Apps

```bash
# Blog only
pnpm dev:blog

# Admin only
USE_SUBDOMAIN_ROUTING=true pnpm dev:admin

# Courses only
USE_SUBDOMAIN_ROUTING=true pnpm dev:courses

# Proxy only (requires other apps running)
pnpm dev:proxy
```

## Production Build

For production, the apps will use path-based routing (`/admin/` and `/courses/`) unless you deploy them to actual subdomains.

No changes are needed for production builds:

```bash
pnpm build
```

## Technical Details

### Port Configuration

- VitePress (Blog): 5173 (default)
- Admin (Nuxt): 3001
- Courses (Nuxt): 3002
- Reverse Proxy: 80

### Environment Variables

| Variable | Purpose | Values |
|----------|---------|--------|
| `USE_SUBDOMAIN_ROUTING` | Controls baseURL in Nuxt apps | `true` or `false` |

### Scripts

| Script | Description |
|--------|-------------|
| `dev:subdomains` | Start all apps with subdomain routing |
| `dev:proxy` | Start only the reverse proxy |
| `dev:blog` | Start only the blog |
| `dev:admin` | Start only the admin app |
| `dev:courses` | Start only the courses app |
| `dev` | Start all apps without proxy (legacy) |

## Tips

1. **Bookmark your local URLs** for quick access
2. **Use the browser's network tab** to verify requests are routing correctly
3. **Check the proxy logs** in the terminal for debugging
4. **Restart all services** if you encounter routing issues

## Next Steps

After setting up subdomain routing, you can:
1. Test cross-app navigation
2. Test authentication flows between apps
3. Verify shared resources (Supabase, Stripe) work correctly
4. Test API endpoints that might be shared between apps

## Questions?

If you encounter issues not covered here, check:
- Browser console for errors
- Terminal logs for proxy errors
- Network tab for failed requests
