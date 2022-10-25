const fs = require('fs')
const path = require('path')
const fg = require('fast-glob')

console.log('Start building netlify.toml...')

const files = fg.sync(['**/*.md', '!**/node_modules', '!README.md'])
const filePathsWithoutSrc = files.map(file => file.replace('src/', ''))

fs.writeFile(
  path.resolve(__dirname, '../_netlify.toml'),
  `[[plugins]]
  package = "@netlify/plugin-lighthouse"

  [plugins.inputs.thresholds]
  performance = 0.9
  accessibility = 0.9
  best-practices = 0.9
  seo = 0.9

  ${filePathsWithoutSrc
    .map(path => {
      return `
     [[plugins.inputs.audits]]
     path = "/${path.replace('.md', '.html')}"
    `
    })
    .join(' ')}
`,
  err => {
    if (err) throw err
  }
)
