const fg = require('fast-glob')
const fs = require('fs')
const path = require('path')
const prependFile = require('prepend-file')
const axios = require('axios').default
const matter = require('gray-matter')

const files = fg.sync(['**/*.md', '!**/node_modules', '!README.md'])

// TODO: Create a shared util file for reusable functions
// This function is copied over from generateSidebar.js
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

async function getArticleCategory(title) {
  const { data } = await axios.post(
    'https://api.openai.com/v1/completions',
    {
      prompt: `Which category does the title: "${title}" fall into? NuxtJS, Vuejs, Electron, NodeJS, Python, Marketing, Misc, Cypress, Youtube, Vitepress, Yaml, or Vuepress?`,
      model: 'text-davinci-003',
      temperature: 0.8,
      max_tokens: 200,
    },
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization:
          'Bearer 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',
      },
    }
  )
  return data
}

async function generateMetaData(file) {
  const fileName = file.split('.')[0].replace('src/', '')
  const title = fileName.replaceAll('-', ' ')
  const capitalizedTitle = capitalizeFirstLetter(title)
  const articleCategory = await getArticleCategory(capitalizedTitle).then(res =>
    res.choices[0].text.replaceAll('\n', '')
  )
  const description = ''

  return {
    file,
    body: {
      text: `---
  type: 'post'
  title: '${capitalizedTitle}'
  date: 2020-09-07
  description: ${description}
  category: tutorials
  dropdown: '${articleCategory}'
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

files.forEach(async file => {
  const { data } = matter.read(file)

  if (Object.keys(data).length !== 0 && data.constructor === Object) {
    return
  } else {
    console.log('here: ', file)
    const element = await generateMetaData(file)
    await prependFile(
      path.resolve(__dirname, `../${element.file}`),
      element.body.text
    )
  }
})
