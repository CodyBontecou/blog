---
title: Nuxt Content and Obsidian Links
draft: false
ignore: false
topics:
  - nuxt
  - obsidian
  - blogging
date: 2024-12-13T13:38
created_at: 2024-12-13T13:38
last_modified: 2024-12-13T16:45
---

This blog is managed using Obsidian, giving me the ability to link between files using the double bracket syntax. 

This is not a supported linking structure by default in Nuxt Content. Instead, it requires using the `content:file:beforeParse` hook.

Nuxt Content exposes a few [hooks](https://content.nuxt.com/recipes/hooks) to modify your content before and/or after it is parsed.

## Nitro Plugin

If you do not have have a server and/or plugins directory, create them. 

Create a file in your `server/plugins` directory that will have the markdown parsing logic. I'm calling my file `obsidian-links.ts` 

In it, place this code:

```ts
// server/plugins/obsidian-links.ts
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
```

This code is using the built-in `content:file:beforeParse` hook to iterate over every file in your Nuxt Content project, and using regex to find text that contain the Obsidian double bracket linking structure.

It then splits on `|` in case you are using the Obsidian link alt text syntax, double brackets with `|` between the two phrases, which I've begun using a lot to make reading a bit easier, and generates a traditional markdown link using the `[]()` syntax.

## Conclusion

> And there you have it! 

We can now comfortably link within our markdown files using the native Obsidian syntax while simultaneously keeping links organized when building our site using Nuxt Content.

This is personally a big win. Being able to reference and navigate through posts within Obsidian is a major benefit of this software.