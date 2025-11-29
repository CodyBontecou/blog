import type { VercelRequest, VercelResponse } from '@vercel/node'
import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'

const supabaseUrl = process.env.SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
const resendApiKey = process.env.RESEND_API_KEY!

const supabase = createClient(supabaseUrl, supabaseKey)
const resend = new Resend(resendApiKey)

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { articleSlug, articleTitle } = req.body

    if (!articleSlug || !articleTitle) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    // Get all confirmed subscribers
    const { data: subscribers, error: subscribersError } = await supabase
      .from('subscribers')
      .select('email')
      .eq('confirmed', true)

    if (subscribersError) {
      throw subscribersError
    }

    if (!subscribers || subscribers.length === 0) {
      return res.status(400).json({ error: 'No confirmed subscribers' })
    }

    // Send email to all subscribers
    const articleUrl = `${process.env.SITE_URL}/${articleSlug}`
    const emails = subscribers.map(s => s.email)

    await resend.emails.send({
      from: process.env.FROM_EMAIL!,
      to: emails,
      subject: `New Article: ${articleTitle}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #2d2a26; font-size: 28px; margin-bottom: 16px;">${articleTitle}</h1>
          <p style="color: #5a5147; font-size: 16px; line-height: 1.6; margin-bottom: 24px;">
            A new article has been published on the blog. Click below to read it.
          </p>
          <a href="${articleUrl}" style="display: inline-block; background: #2d2a26; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: 500;">
            Read Article
          </a>
          <p style="color: #8b7f72; font-size: 14px; margin-top: 32px;">
            You're receiving this because you subscribed to updates from ${process.env.SITE_URL}
          </p>
        </div>
      `,
    })

    // Record the campaign
    await supabase.from('newsletter_campaigns').insert({
      article_slug: articleSlug,
      article_title: articleTitle,
      subject: `New Article: ${articleTitle}`,
      recipients_count: subscribers.length,
    })

    // Update article metadata to mark newsletter as sent
    await supabase
      .from('articles')
      .update({
        metadata: { newsletter_sent: true }
      })
      .eq('slug', articleSlug)

    return res.status(200).json({
      success: true,
      recipients: subscribers.length,
    })
  } catch (error) {
    console.error('Newsletter send error:', error)
    return res.status(500).json({ error: 'Failed to send newsletter' })
  }
}
