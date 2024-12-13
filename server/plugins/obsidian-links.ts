export default defineNitroPlugin(nitroApp => {
    nitroApp.hooks.hook('content:file:beforeParse', file => {
        const wikiLinkRegex = /\[\[(.*?)\]\]/g
        if (file._id.endsWith('.md')) {
            file.body = file.body.replace(wikiLinkRegex, (match, linkText) => {
                const [pageName, altText] = linkText.split('|')
                const displayText = altText || pageName
                const slug = pageName
                    .toLowerCase()
                    .trim()
                    .replace(/\s+/g, '-')
                    .replace(/[^\w-]/g, '')

                return `[${displayText.trim()}](/${slug})`
            })
        }
    })
})
