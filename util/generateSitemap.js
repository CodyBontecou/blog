import fs from 'fs'
import path from 'path'
import fg from 'fast-glob'
import { SitemapStream, streamToPromise } from 'sitemap'
import { fileURLToPath } from 'url'

console.log('Start building sitemap..')

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const linksStream = fg
    .stream(['**/*.md', '!**/node_modules', '!README.md'])
    .map(filePath => ({
        url: filePath.replace('src/', '').replace(/\.md$/, '.html'),
    }))

const sitemapStream = new SitemapStream({
    hostname: 'https://www.codybontecou.com/',
})

// Return a promise that resolves with your XML string
streamToPromise(linksStream.pipe(sitemapStream)).then(sitemap => {
    fs.writeFileSync(
        path.resolve(__dirname, '../src/public/sitemap.xml'),
        sitemap
    )
})
