import { serverQueryContent } from '#content/server'
import { SitemapStream, streamToPromise } from 'sitemap'

export default defineEventHandler(async event => {
    const config = useRuntimeConfig()
    // Fetch all documents
    const docs = await serverQueryContent(event).find()
    const sitemap = new SitemapStream({
        hostname: config.public.siteUrl,
    })

    for (const doc of docs) {
        // Skip draft posts
        if (doc.draft) continue
        
        sitemap.write({
            url: doc._path!,
            changefreq: 'monthly',
            lastmod: doc.updatedAt || doc.date || new Date().toISOString(),
            priority: doc._path === '/' ? 1.0 : doc._path?.startsWith('/blog/') ? 0.8 : 0.6
        })
    }
    sitemap.end()

    return streamToPromise(sitemap)
})
