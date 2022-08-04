require('dotenv').config()

import fg from 'fast-glob'
import matter from 'gray-matter'

const ignoreList = ['projects', 'store']

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

const files = fg.sync(['**/*.md', '!**/node_modules', '!README.md'])
const sidebarGroupTitles = files
  .map(file => {
    const f = file.substring(4) // Deletes src/ from the beginning of file paths
    const paths = f.split('/')

    if (paths.length > 1 && !ignoreList.includes(paths[0])) {
      return { title: capitalizeFirstLetter(paths[0]), filePath: f }
    }
  })
  .filter(file => {
    if (file !== undefined) {
      return file
    }
  })

const generatedSidebar = sidebarGroupTitles.reduce(
  (acc, { title, filePath }) => {
    const getItem = () => {
      const { data } = matter.read('src/' + filePath)
      return { text: data.title, link: filePath }
    }
    if (!acc.some(el => el.text === title)) {
      acc.push({ text: title, collapsible: true, items: [getItem()] })
    } else {
      acc[acc.indexOf(acc.find(el => el.text === title))].items.push(getItem())
    }
    return acc
  },
  []
)

module.exports = {
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
        async: true,
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
        link: 'projects',
      },
      {
        text: 'Contact',
        link: '/contact',
      },
    ],
    sidebar: generatedSidebar.reverse(),
  },
}
