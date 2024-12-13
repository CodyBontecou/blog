// modules/obsidian-links/index.ts
import { defineNuxtModule, createResolver } from '@nuxt/kit'
import type { ModuleOptions } from '@nuxt/schema'

interface ObsidianLinksOptions {
    baseContentPath?: string
    failOnBrokenLinks?: boolean
}

export default defineNuxtModule<ObsidianLinksOptions>({
    meta: {
        name: 'nuxt-obsidian-links',
        configKey: 'obsidianLinks',
    },
    defaults: {
        baseContentPath: '/',
        failOnBrokenLinks: false,
    },
    setup(options, nuxt) {
        const resolver = createResolver(import.meta.url)

        // Add the content hook using nuxt.hooks
        nuxt.hooks.hook('content:file:beforeParse', file => {
            const wikiLinkRegex = /\[\[(.*?)\]\]/g

            if (file.extension === '.md') {
                file.body = file.body.replace(
                    wikiLinkRegex,
                    (match, linkText) => {
                        const [pageName, altText] = linkText.split('|')
                        const displayText = altText || pageName

                        const slug = pageName
                            .toLowerCase()
                            .trim()
                            .replace(/\s+/g, '-')
                            .replace(/[^\w-]/g, '')

                        const basePath = options.baseContentPath?.replace(
                            /\/$/,
                            ''
                        )
                        const finalPath = `${basePath}/${slug}`.replace(
                            /\/+/g,
                            '/'
                        )

                        return `[${displayText.trim()}](${finalPath})`
                    }
                )
            }
        })
    },
})
