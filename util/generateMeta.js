const fg = require('fast-glob')
const fs = require('fs')
const path = require('path')

const files = fg.sync(['**/*.md', '!**/node_modules', '!README.md'])

// TODO: Create a shared util file for reusable functions
// This function is copied over from generateSidebar.js
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

function generateMetaData(file) {
  const fileName = file.split('.')[0].replace('src/', '')
  const title = fileName.replaceAll('-', ' ')
  const capitalizedTitle = capitalizeFirstLetter(title)
  const description =
    "Use a VueJS's custom event to emit multiple parameters between components."

  return {
    file,
    body: {
      text: `---
  type: 'post'
  title: '${capitalizedTitle}'
  author: { 'name': 'Cody Bontecou', 'image': 'https://codybontecou.com/images/cody-abstract.jpeg' }
  date: 2020-09-07
  description: ${description}
  category: tutorials
  dropdown: 'VueJS'
  tags:
    - Vuejs
    - Vue
    - Nuxtjs
    - Nuxt
    - Code
  meta:
    - name: og:title
      content: ${capitalizedTitle}
    - name: og:description
      content: ${description}
    - name: og:image
      content: https://codybontecou.com/images/${fileName}.png
    - name: og:image:alt
      content: ${capitalizedTitle}
    - name: og:title
      content: ${capitalizedTitle}
    - name: twitter:title
      content: ${capitalizedTitle}
    - name: twitter:text:title
      content: ${capitalizedTitle}
  canonicalUrl: https://codybontecou.com/${fileName}.html
---
      `,
    },
  }
}

const metaStrings = files.map(file => generateMetaData(file))

metaStrings.forEach(element => {
  // TODO: This needs to update the file, not write over what's already there.
  fs.writeFileSync(
    path.resolve(__dirname, `../${element.file}`),
    element.body.text,
    err => {
      if (err) throw err
    }
  )
})
