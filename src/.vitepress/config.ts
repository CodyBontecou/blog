import path from 'path'
import { writeFileSync } from 'fs'
import { Feed } from 'feed'
import { defineConfig, createContentLoader, type SiteConfig } from 'vitepress'
require('dotenv').config()
import { sortedSidebar } from '../../util/generateSidebar'

const hostname: string = 'https://codybontecou.com'

export default defineConfig({
  appearance: 'dark',
  title: 'Cody Bontecou',
  head: [
    [
      'link',
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: '/images/logo.png',
      },
    ],
    ['meta', { name: 'theme-color', content: '#4979ff' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    [
      'meta',
      { name: 'apple-mobile-web-app-status-bar-style', content: 'black' },
    ],
    [
      'meta',
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
    ],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:site', content: '@Codybontecou' }],
    ['meta', { name: 'twitter:creator', content: '@Codybontecou' }],
    ['meta', { property: 'og:site_name', content: 'codybontecou.com' }],
    [
      'script',
      {
        src: 'https://www.googletagmanager.com/gtag/js?id=G-3NM0E524EK',
      },
    ],
    [
      'script',
      {},
      "window.dataLayer = window.dataLayer || [];\nfunction gtag(){dataLayer.push(arguments);}\ngtag('js', new Date());\ngtag('config', 'G-3NM0E524EK');",
    ],
  ],
  themeConfig: {
    repo: '',
    editLinks: false,
    smoothScrolling: true,
    docsDir: '',
    logo: '/images/navLogo.png',
    lastUpdated: 'Last Updated',
    socialLinks: [
      { icon: 'github', link: 'https://github.com/codybontecou' },
      { icon: 'twitter', link: 'https://twitter.com/CodyBontecou' },
      {
        icon: 'youtube',
        link: 'https://www.youtube.com/channel/UCaynjLdmzjkwcsmPN-68iHA',
      },
    ],
    editLink: {
      pattern: 'https://github.com/codybontecou/blog/edit/main/src/:path',
      text: 'Edit this page on GitHub',
    },
    nav: [
      {
        text: 'Home',
        link: '/',
      },
      {
        text: 'Projects',
        link: '/projects/',
      },
      {
        text: 'Conferences',
        link: '/conferences',
      },
      {
        text: 'Contact',
        link: '/contact',
      },
    ],
    sidebar: {
      '/': sortedSidebar,
      '/projects/': [{ text: 'Hotspringers', link: '/projects/hotspringers' }],
    },
    carbonAds: {
      code: 'CWYDCK7J',
      placement: 'codybontecoucom',
    },
    // locales: {
    //   root: {
    //     label: 'English',
    //     lang: 'en',
    //   },
    //   es: {
    //     label: 'Español',
    //     lang: 'es',
    //   },
    // },
  },
  buildEnd: async (config: SiteConfig) => {
    const feed = new Feed({
      title: 'Cody Bontecou',
      description: 'My personal blog',
      id: hostname,
      link: hostname,
      language: 'en',
      image: 'https://codybontecou.com/images/cody-abstract.jpeg',
      favicon: `${hostname}/favicon.ico`,
      copyright: 'Copyright (c) 2023-present, Cody Bontecou',
    })

    const posts = await createContentLoader('*.md', {
      excerpt: true,
      render: true,
    }).load()

    posts
      .filter(post => post.frontmatter.title && post.frontmatter.date)
      .sort((a, b) => {
        return (
          +new Date(b.frontmatter.date as string) -
          +new Date(a.frontmatter.date as string)
        )
      })

    for (const { url, excerpt, frontmatter, html } of posts) {
      const postRenderedHtml = html?.includes('{{ $frontmatter.title }}')
        ? html?.replaceAll('{{ $frontmatter.title }}', frontmatter.title)
        : html

      feed.addItem({
        title: frontmatter.title,
        id: `${hostname}${url}`,
        link: `${hostname}${url}`,
        description: excerpt,
        content: postRenderedHtml,
        author: [
          {
            name: 'Cody Bontecou',
            email: 'codybontecou@gmail.com',
            link: 'https://codybontecou.com',
          },
        ],
        date: frontmatter.date,
      })
    }

    writeFileSync(path.join(config.outDir, 'feed.rss'), feed.rss2())
  },
})
