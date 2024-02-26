import * as fs from 'fs'
import * as path from 'path'
import { Resend } from 'resend'
import matter from 'gray-matter'
import { Marked } from 'marked'
import { markedHighlight } from 'marked-highlight'
import hljs from 'highlight.js'

require('dotenv').config()

const resend = new Resend(process.env.RESEND_API_KEY)

const marked = new Marked(
  markedHighlight({
    langPrefix: 'hljs language-',
    highlight(code, lang, info) {
      const language = hljs.getLanguage(lang) ? lang : 'plaintext'
      return hljs.highlight(code, { language }).value
    },
  })
)

async function sendEmail(content: string, title: string) {
  await resend.emails.send({
    from: 'Costream <test@costream.app>',
    to: ['bontecouc@gmail.com'],
    subject: title,
    html: content,
  })
}

const css = fs.readFileSync('util/styles.css', 'utf-8').toString()

function switchToFalse(filename: string): void {
  const data = fs.readFileSync(filename).toString()
  let newData = data.replace(/newsletter: true/g, 'newsletter: false')
  fs.writeFileSync(filename, newData)
}

function addInlineCss(title: string, html: string): string {
  return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>${title}</title>
          <style>${css}</style>
        </head>
        <body>
          ${html}
          <p>
            Click here to <a href="https://codybontecou.us6.list-manage.com/unsubscribe?u=859d7d456e33a2afd508093ec&id=70832a6daf&t=1" target="_blank">unsubscribe</a>
          </p>
        </body>
      </html>
    `
}

function getMarkdownFiles(dirPath) {
  let files: string[] = []

  // Read all items within the directory
  const items = fs.readdirSync(dirPath, { withFileTypes: true })

  for (let i = 0; i < items.length; i++) {
    const itemName = path.resolve(dirPath, items[i].name)

    // If it's a directory, recursively get files from that directory
    if (items[i].isDirectory()) {
      files = [...files, ...getMarkdownFiles(itemName)]
    }
    // If it's a file and ends with .md or .markdown, add to the list
    else if (items[i].name.endsWith('.md')) {
      files.push(itemName)
    }
  }

  return files
}

const dirPath = '.' // Current directory as default
const files = getMarkdownFiles(dirPath)

files.forEach(filePath => {
  const file = fs.readFileSync(filePath).toString()
  const post = matter(file)

  if (post.data['newsletter'] === true) {
    const title = post.data['title']
    const convertedMarkdown = marked.parse(post.content) as string
    const html = addInlineCss(title, convertedMarkdown)

    sendEmail(html, title)
    switchToFalse(filePath)
  }
})
