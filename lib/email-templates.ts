import { EMAIL_CONFIG } from './resend.js'

export interface ArticleData {
  title: string
  slug: string
  content: string
  excerpt?: string
  topics: string[]
  created_at: string
  author?: string
}

export function generateArticleEmailHTML(article: ArticleData): string {
  const { title, slug, content, topics, created_at, author = 'Cody Bontecou' } = article
  const articleUrl = `${EMAIL_CONFIG.domain}/${slug}`
  const unsubscribeUrl = `${EMAIL_CONFIG.domain}/unsubscribe?token={{unsubscribe_token}}`
  
  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f5f5f5;
        }

        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }

        .header {
            background: #333333;
            color: white;
            padding: 40px 32px;
            text-align: center;
        }
        
        .header h1 {
            font-size: 28px;
            font-weight: 700;
            margin-bottom: 8px;
        }
        
        .header p {
            font-size: 16px;
            opacity: 0.9;
        }
        
        .content {
            padding: 32px;
        }
        
        .article-header {
            margin-bottom: 24px;
            padding-bottom: 24px;
            border-bottom: 1px solid #cccccc;
        }

        .article-title {
            font-size: 24px;
            font-weight: 700;
            color: #000000;
            margin-bottom: 12px;
            line-height: 1.3;
        }

        .article-meta {
            display: flex;
            flex-wrap: wrap;
            gap: 16px;
            font-size: 14px;
            color: #666666;
            margin-bottom: 16px;
        }

        .topics {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            margin-top: 8px;
        }

        .topic {
            background-color: #e5e5e5;
            color: #333333;
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: 500;
        }
        
        .article-content {
            margin-bottom: 32px;
        }
        
        .article-content h2 {
            font-size: 20px;
            font-weight: 600;
            margin: 24px 0 16px 0;
            color: #000000;
        }

        .article-content h3 {
            font-size: 18px;
            font-weight: 600;
            margin: 20px 0 12px 0;
            color: #000000;
        }

        .article-content p {
            margin-bottom: 16px;
            color: #333333;
            line-height: 1.7;
        }

        .article-content ul, .article-content ol {
            margin-bottom: 16px;
            padding-left: 24px;
        }

        .article-content li {
            margin-bottom: 8px;
            color: #333333;
        }

        .article-content pre {
            background-color: #f5f5f5;
            border: 1px solid #cccccc;
            border-radius: 8px;
            padding: 16px;
            margin: 16px 0;
            overflow-x: auto;
        }

        .article-content code {
            background-color: #f5f5f5;
            border: 1px solid #cccccc;
            border-radius: 4px;
            padding: 2px 6px;
            font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
            font-size: 14px;
        }
        
        .article-content pre code {
            background: none;
            border: none;
            padding: 0;
        }
        
        .article-content blockquote {
            border-left: 4px solid #333333;
            background-color: #f5f5f5;
            padding: 16px 20px;
            margin: 16px 0;
            font-style: italic;
        }

        .article-content table {
            width: 100%;
            border-collapse: collapse;
            margin: 16px 0;
            font-size: 14px;
        }

        .article-content table th,
        .article-content table td {
            border: 1px solid #cccccc;
            padding: 12px;
            text-align: left;
        }

        .article-content table th {
            background-color: #f5f5f5;
            font-weight: 600;
            color: #000000;
        }

        .article-content table tr:nth-child(even) {
            background-color: #fafafa;
        }

        .cta-section {
            background-color: #f5f5f5;
            padding: 24px;
            border-radius: 8px;
            text-align: center;
            margin-bottom: 32px;
        }

        .cta-button {
            display: inline-block;
            background: #333333;
            color: white;
            padding: 12px 24px;
            border-radius: 8px;
            text-decoration: none;
            font-weight: 600;
            margin-top: 16px;
            transition: transform 0.2s;
        }
        
        .cta-button:hover {
            transform: translateY(-2px);
        }
        
        .footer {
            background-color: #f5f5f5;
            padding: 32px;
            text-align: center;
            border-top: 1px solid #cccccc;
        }

        .footer p {
            color: #666666;
            font-size: 14px;
            margin-bottom: 8px;
        }
        
        .footer a {
            color: #333333;
            text-decoration: none;
        }
        
        .footer a:hover {
            text-decoration: underline;
        }
        
        @media (max-width: 600px) {
            .container {
                margin: 0;
                border-radius: 0;
            }
            
            .header {
                padding: 32px 24px;
            }
            
            .content {
                padding: 24px;
            }
            
            .article-title {
                font-size: 20px;
            }
            
            .article-meta {
                flex-direction: column;
                gap: 8px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="content">
            <div class="article-header">
                <h2 class="article-title">${title}</h2>
                <div class="article-meta">
                    <span>By ${author}</span>
                    <span>•</span>
                    <span>${new Date(created_at).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                    })}</span>
                </div>
                ${topics.length > 0 ? `
                <div class="topics">
                    ${topics.map(topic => `<span class="topic">${topic}</span>`).join('')}
                </div>
                ` : ''}
            </div>
            
            <div class="article-content">
                ${formatContentForEmail(content)}
            </div>
            
            <div class="cta-section">
                <p>Want to read more, leave a comment, or share this article?</p>
                <a href="${articleUrl}" class="cta-button">Read Full Article on Blog</a>
            </div>
        </div>
        
        <div class="footer">
            <p>Thanks for being part of my newsletter community!</p>
            <p>
                <a href="${articleUrl}">View on web</a> •
                <a href="${EMAIL_CONFIG.domain}">Visit blog</a> •
                <a href="${unsubscribeUrl}">Unsubscribe</a>
            </p>
            <p style="margin-top: 16px; font-size: 12px; color: #666666;">
                You received this email because you subscribed to newsletter updates from Cody Bontecou's blog.
            </p>
        </div>
    </div>
</body>
</html>
`
}

function formatContentForEmail(content: string): string {
  // Basic markdown to HTML conversion for email
  let formatted = content

  // Handle code blocks first (before other replacements)
  formatted = formatted.replace(/```(\w+)?\n([\s\S]*?)```/g, (_match, _lang, code) => {
    return `<pre><code>${escapeHtml(code.trim())}</code></pre>`
  })

  // Handle markdown tables - find complete table blocks
  // A table is: header row, separator row, then data rows
  formatted = formatted.replace(/^\|.+\|[ \t]*\n\|[-:\s|]+\|[ \t]*\n(?:\|.+\|[ \t]*\n?)*/gm, (tableMatch) => {
    const lines = tableMatch.trim().split('\n')
    if (lines.length < 3) return tableMatch // Need header, separator, and at least one data row

    const headerRow = lines[0]
    const dataRows = lines.slice(2) // Skip header and separator

    // Parse header
    const headers = headerRow.split('|').filter(cell => cell.trim()).map(cell => cell.trim())

    // Build table HTML
    let html = '<table><thead><tr>'
    headers.forEach(header => {
      html += `<th>${header}</th>`
    })
    html += '</tr></thead><tbody>'

    // Parse data rows
    dataRows.forEach(row => {
      if (!row.trim()) return
      const cells = row.split('|').filter(cell => cell.trim()).map(cell => cell.trim())
      html += '<tr>'
      cells.forEach(cell => {
        html += `<td>${cell}</td>`
      })
      html += '</tr>'
    })

    html += '</tbody></table>'
    return html
  })

  // Handle headings (must be done before paragraph conversion)
  formatted = formatted.replace(/^### (.+)$/gm, '<h3>$1</h3>')
  formatted = formatted.replace(/^## (.+)$/gm, '<h2>$1</h2>')
  formatted = formatted.replace(/^# (.+)$/gm, '<h1>$1</h1>')

  // Handle inline code (after code blocks)
  formatted = formatted.replace(/`([^`\n]+)`/g, '<code>$1</code>')

  // Handle bold and italic
  formatted = formatted.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
  formatted = formatted.replace(/\*(.+?)\*/g, '<em>$1</em>')

  // Handle blockquotes
  formatted = formatted.replace(/^> (.+)$/gm, '<blockquote>$1</blockquote>')

  // Handle lists
  formatted = formatted.replace(/^\* (.+)$/gm, '<li>$1</li>')
  formatted = formatted.replace(/^- (.+)$/gm, '<li>$1</li>')
  formatted = formatted.replace(/^(\d+)\. (.+)$/gm, '<li>$2</li>')

  // Wrap consecutive list items
  formatted = formatted.replace(/(<li>.*<\/li>\n?)+/g, (match) => {
    return `<ul>${match}</ul>`
  })

  // Handle paragraphs (double newline = new paragraph)
  formatted = formatted.replace(/\n\n+/g, '</p><p>')
  formatted = formatted.replace(/\n/g, '<br>')

  // Wrap in paragraph tags if not already wrapped
  if (!formatted.startsWith('<')) {
    formatted = '<p>' + formatted
  }
  if (!formatted.endsWith('>')) {
    formatted = formatted + '</p>'
  }

  return formatted
}

function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  }
  return text.replace(/[&<>"']/g, (m) => map[m])
}

export function generateArticleEmailText(article: ArticleData): string {
  const { title, slug, content, topics, created_at, author = 'Cody Bontecou' } = article
  const articleUrl = `${EMAIL_CONFIG.domain}/${slug}`
  const unsubscribeUrl = `${EMAIL_CONFIG.domain}/unsubscribe?token={{unsubscribe_token}}`

  return `
NEW ARTICLE PUBLISHED

${title}

By ${author} • ${new Date(created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
})}

${topics.length > 0 ? `Topics: ${topics.join(', ')}` : ''}

---

${content.substring(0, 500)}${content.length > 500 ? '...' : ''}

---

Read the full article: ${articleUrl}

---

Thanks for being part of my newsletter community!

Visit blog: ${EMAIL_CONFIG.domain}
Unsubscribe: ${unsubscribeUrl}

You received this email because you subscribed to newsletter updates from Cody Bontecou's blog.
`
}