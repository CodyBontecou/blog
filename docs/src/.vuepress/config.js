require('dotenv').config()
const { description } = require('../../package')

const config = require('../../../config.json')
const autoprefixer = require('autoprefixer')
const tailwindcss = require('tailwindcss')(
  '/Users/codybontecou/Projects/Code/blog/docs/tailwind.config.js'
)
config.description = description
config.postcss.plugins.push(autoprefixer)
config.postcss.plugins.push(tailwindcss)

const commentPlugin = config.plugins[2][1]['comment']
commentPlugin['clientId'] = process.env.GITHUB_CLIENT_ID
commentPlugin['clientSecret'] = process.env.GITHUB_CLIENT_SECRET

module.exports = config
