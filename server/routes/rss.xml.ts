import { serverQueryContent } from '#content/server'
import RSS from 'rss'

export default defineEventHandler(async event => {
    const config = useRuntimeConfig()
    const baseUrl = config.public.siteUrl

    const feed = new RSS({
        title: 'Cody Bontecou',
        site_url: baseUrl,
        feed_url: `${baseUrl}/rss.xml`,
    })

    const docs = await serverQueryContent(event)
        .sort({ created_at: -1 })
        .where({ draft: false })
        .find()

    for (const doc of docs) {
        feed.item({
            title: doc.title ?? '-',
            url: baseUrl + doc._path,
            date: doc.created_at,
            description: doc.description,
        })
    }

    const feedString = feed.xml({ indent: true })

    event.node.res.setHeader('content-type', 'text/xml')
    event.node.res.end(feedString)
})
