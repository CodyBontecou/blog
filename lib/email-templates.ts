import { EMAIL_CONFIG } from './resend'

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
  const { title, slug, content, excerpt, topics, created_at, author = 'Cody Bontecou' } = article
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
            background-color: #f8fafc;
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
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
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
            border-bottom: 1px solid #e2e8f0;
        }
        
        .article-title {
            font-size: 24px;
            font-weight: 700;
            color: #1a202c;
            margin-bottom: 12px;
            line-height: 1.3;
        }
        
        .article-meta {
            display: flex;
            flex-wrap: wrap;
            gap: 16px;
            font-size: 14px;
            color: #64748b;
            margin-bottom: 16px;
        }
        
        .topics {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            margin-top: 8px;
        }
        
        .topic {
            background-color: #f1f5f9;
            color: #475569;
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
            color: #1a202c;
        }
        
        .article-content h3 {
            font-size: 18px;
            font-weight: 600;
            margin: 20px 0 12px 0;
            color: #1a202c;
        }
        
        .article-content p {
            margin-bottom: 16px;
            color: #4a5568;
            line-height: 1.7;
        }
        
        .article-content ul, .article-content ol {
            margin-bottom: 16px;
            padding-left: 24px;
        }
        
        .article-content li {
            margin-bottom: 8px;
            color: #4a5568;
        }
        
        .article-content pre {
            background-color: #f7fafc;
            border: 1px solid #e2e8f0;
            border-radius: 8px;
            padding: 16px;
            margin: 16px 0;
            overflow-x: auto;
        }
        
        .article-content code {
            background-color: #f7fafc;
            border: 1px solid #e2e8f0;
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
            border-left: 4px solid #667eea;
            background-color: #f8fafc;
            padding: 16px 20px;
            margin: 16px 0;
            font-style: italic;
        }
        
        .cta-section {
            background-color: #f8fafc;
            padding: 24px;
            border-radius: 8px;
            text-align: center;
            margin-bottom: 32px;
        }
        
        .cta-button {
            display: inline-block;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
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
            background-color: #f8fafc;
            padding: 32px;
            text-align: center;
            border-top: 1px solid #e2e8f0;
        }
        
        .footer p {
            color: #64748b;
            font-size: 14px;
            margin-bottom: 8px;
        }
        
        .footer a {
            color: #667eea;
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
        <div class="header">
            <h1>📧 New Article Published</h1>
            <p>Fresh content from Cody Bontecou's blog</p>
        </div>
        
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
                ${excerpt ? `<p><strong>Summary:</strong> ${excerpt}</p>` : ''}
                ${formatContentForEmail(content)}
            </div>
            
            <div class="cta-section">
                <p>Want to read more, leave a comment, or share this article?</p>
                <a href="${articleUrl}" class="cta-button">Read Full Article on Blog</a>
            </div>
        </div>
        
        <div class="footer">
            <p>Thanks for being part of my newsletter community! 🚀</p>
            <p>
                <a href="${articleUrl}">View on web</a> • 
                <a href="${EMAIL_CONFIG.domain}">Visit blog</a> • 
                <a href="${unsubscribeUrl}">Unsubscribe</a>
            </p>
            <p style="margin-top: 16px; font-size: 12px; color: #94a3b8;">
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
  // This is a simplified version - you might want to use a proper markdown parser
  return content
    .replace(/\n\n/g, '</p><p>')
    .replace(/\n/g, '<br>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/^### (.*$)/gm, '<h3>$1</h3>')
    .replace(/^## (.*$)/gm, '<h2>$1</h2>')
    .replace(/^# (.*$)/gm, '<h1>$1</h1>')
    .replace(/^\* (.*$)/gm, '<li>$1</li>')
    .replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>')
    .replace(/^> (.*$)/gm, '<blockquote>$1</blockquote>')
    .replace(/^(<p>|<br>)/, '<p>')
    .replace(/(<\/p>|<br>)$/, '</p>')
}

export function generateArticleEmailText(article: ArticleData): string {
  const { title, slug, content, topics, created_at, author = 'Cody Bontecou' } = article
  const articleUrl = `${EMAIL_CONFIG.domain}/${slug}`
  const unsubscribeUrl = `${EMAIL_CONFIG.domain}/unsubscribe?token={{unsubscribe_token}}`
  
  return `
🚀 NEW ARTICLE PUBLISHED

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

Thanks for being part of my newsletter community! 🚀

Visit blog: ${EMAIL_CONFIG.domain}
Unsubscribe: ${unsubscribeUrl}

You received this email because you subscribed to newsletter updates from Cody Bontecou's blog.
`
}