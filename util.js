const { readFile, writeFile, unlink } = require('fs')
const matter = require('gray-matter')
const { stringify } = require('yaml')

const originalConfig = require('./original_config.js')

// Rewrites config.json to the original config.js state

// originalConfig = JSON.stringify(config, null, 2)
// fs.writeFile('config.json', originalConfig, 'utf8', err => {
//   if (err) {
//     console.error(err)
//     return
//   }
// })

// const title = 'Automating the Configuration of VuePress'
const title = 'Document Javascript Code with JSDoc!'
const slug = title.replace(/\s+/g, '-').toLowerCase()
const filePath = `./docs/src/${slug}.md`
const today = new Date()
const todayString = `${today.getFullYear()}-${
  today.getMonth() + 1
}-${today.getDate()}`
const description = title
const tags = []

async function getMatter() {
  const { data: frontMatter, content } = matter(await readFile(filePath))
  return frontMatter
}

/**
 * Initializes a new file at filePath with auto-generated frontmatter
 */
async function initializeFile() {
  await writeFile(
    filePath,
    `---
type: 'post'
title: '${title}'
author: { 'name': 'Cody Bontecou', 'image': '/assets/img/cody.64b57256.jpg' }
date: ${todayString}
description: ${description}
category: tutorials
tags:
${tags.map(tag => {
  return `  - ${tag}`
})}
meta:
  - name: og:title
    content: ${title}
  - name: og:description
    content: ${description}
  - name: og:image
    content: https://codybontecou.com/images/${slug}-meta.png
  - name: og:image:alt
    content: ${description}
  - name: og:title
    content: ${title}
  - name: twitter:title
    content: ${title}
  - name: twitter:text:title
    content: ${title}
canonicalUrl: https://codybontecou.com/${slug}.html
---

![${description}](https://codybontecou.com/images/${slug}-meta.png)

# ${title}
`,
    'utf8',
    err => {
      if (err) {
        console.error(err)
        return
      }
    }
  )
}

/**
 * Parses and adds new sidebar item to config.json
 */
async function addSidebarItem() {
  await readFile('config.json', 'utf8', async (err, data) => {
    const config = JSON.parse(data)

    const sidebarItems = config.themeConfig.sidebar['/'][0].children

    // Checks if sidebar item already exists
    if (!sidebarItems.some(item => item.includes(title))) {
      sidebarItems.unshift([slug.toLowerCase(), title])

      const json = JSON.stringify(config, null, 2)
      await writeFile('config.json', json, 'utf8', err => {
        if (err) {
          console.error(err)
          return
        }
      })
    }
  })
}

/**
 * Deletes file and removes sidebar item from config.json
 */
async function deleteSidebarItem() {
  readFile('config.json', 'utf8', (err, data) => {
    const config = JSON.parse(data)
    config.themeConfig.sidebar['/'][0].children = config.themeConfig.sidebar[
      '/'
    ][0].children.filter(item => item[0] !== slug)

    const json = JSON.stringify(config, null, 2)
    writeFile('config.json', json, 'utf8', err => {
      if (err) {
        console.error(err)
        return
      }
    })

    // unlink deletes the file
    unlink(filePath, err => {
      if (err) {
        console.error(err)
        return
      }
    })
  })
}

/**
 *
 * @returns frontmatter config
 */
async function main() {
  return await initializeFile().then(async () => {
    // await addSidebarItem()
    // await deleteSidebarItem()
  })
}

main()
