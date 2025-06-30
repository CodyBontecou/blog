---
created_at: 2025-06-26T14:16
last_modified: 2025-06-26T14:35
---
# SEO Canonical URL Fixes

## What Was Fixed

1. **HTML Extension Redirects**: Already configured in `vercel.json` to redirect `.html` URLs to clean URLs
2. **Canonical URL Plugin**: Added client-side plugin to ensure consistent canonical URLs
3. **Route Rules**: Added Nitro route rules to handle .html redirects at build time

## Domain-Level Configuration Needed

Since your domain is purchased on Squarespace, you have a few options:

### Option 1: Squarespace DNS Settings
1. Log into your Squarespace account
2. Go to Settings → Domains → DNS Settings
3. Add a CNAME record:
   - Name: `www`
   - Value: `codybontecou.com`

### Option 2: Vercel Domain Management
1. Go to your Vercel project dashboard
2. Go to Settings → Domains  
3. Add `www.codybontecou.com` as a domain
4. Set it to redirect to `codybontecou.com`
5. Update your Squarespace DNS to point to Vercel's nameservers

### Option 3: Manual Vercel Redirect (If you can't change DNS)
Add this to your `vercel.json` if the above options don't work:

```json
{
  "redirects": [
    {
      "source": "/(.*).html",
      "destination": "/$1", 
      "permanent": true
    },
    {
      "source": "https://www.codybontecou.com/(.*)",
      "destination": "https://codybontecou.com/$1",
      "permanent": true,
      "has": [
        {
          "type": "host",
          "value": "www.codybontecou.com"
        }
      ]
    }
  ]
}
```

## Testing

After deployment, test these URLs:
- `https://www.codybontecou.com` → should redirect to `https://codybontecou.com`
- `https://codybontecou.com/some-post.html` → should redirect to `https://codybontecou.com/some-post`

## Files Modified

- `nuxt.config.ts`: Added route rules for .html redirects
- `vercel.json`: Already had .html redirects, added SEO headers
- `plugins/canonical.client.ts`: New plugin for consistent canonical URLs