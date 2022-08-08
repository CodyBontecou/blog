require('dotenv').config()

import fg from 'fast-glob'
import matter from 'gray-matter'

const ignoreList = [
  'projects',
  'store',
  'index.md',
  'projects.md',
  'contact.md',
]

const dropdownOptions = [
  { text: 'NuxtJS', sortOrder: 1 },
  { text: 'VueJS', sortOrder: 2 },
  { text: 'Electron', sortOrder: 3 },
  { text: 'NodeJS', sortOrder: 4 },
  { text: 'Python', sortOrder: 5 },
  { text: 'Marketing', sortOrder: 6 },
  { text: 'Misc', sortOrder: 7 },
]

const sortMap = new Map(dropdownOptions.map(obj => [obj.text, obj.sortOrder]))

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

const files = fg.sync(['**/*.md', '!**/node_modules', '!README.md'])
const sidebarGroupTitles = files
  .map(file => {
    const f = file.split('/')

    if (f.length === 2 && !ignoreList.some(el => f.indexOf(el) >= 0)) {
      return {
        title: capitalizeFirstLetter(f[1]),
        link: file,
      }
    }
  })
  .filter(file => {
    if (file !== undefined) {
      return file
    }
  })

const getItem = link => {
  const { data } = matter.read(link)
  return { text: data.title, link: link.split('/')[1] }
}
const getDropDown = link => {
  const { data } = matter.read(link)
  return data.dropdown
}

const generatedSidebar = sidebarGroupTitles.reduce((acc, { link }) => {
  const dropdown = getDropDown(link)

  if (!acc.some(el => el.text === dropdown)) {
    acc.push({ text: dropdown, collapsible: true, items: [getItem(link)] })
  } else {
    acc[acc.indexOf(acc.find(el => el.text === dropdown))].items.push(
      getItem(link)
    )
  }
  return acc
}, [])

const sortedSidebar = generatedSidebar
  .slice()
  .sort((a, b) => sortMap.get(a.text) - sortMap.get(b.text))

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
        link: 'projects',
      },
      {
        text: 'Contact',
        link: '/contact',
      },
    ],
    sidebar: sortedSidebar,
  },
}
