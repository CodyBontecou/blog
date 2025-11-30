import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'

export default defineEventHandler(async (event) => {
  try {
    const config = useRuntimeConfig()
    const body = await readBody(event)

    const { articleSlug, articleTitle } = body

    if (!articleSlug || !articleTitle) {
      throw createError({
        statusCode: 400,
        message: 'Missing required fields: articleSlug and articleTitle',
      })
    }

    // Get environment variables
    const supabaseUrl = config.public.supabaseUrl
    const supabaseServiceKey = config.supabaseServiceRoleKey
    const resendApiKey = config.resendApiKey
    const fromEmail = config.fromEmail || config.public.fromEmail
    const siteUrl = config.public.siteUrl

    if (!supabaseUrl || !supabaseServiceKey) {
      throw createError({
        statusCode: 500,
        message: 'Supabase configuration missing',
      })
    }

    if (!resendApiKey) {
      throw createError({
        statusCode: 500,
        message: 'Resend API key not configured',
      })
    }

    // Create Supabase client with service role key for admin operations
    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    })
    const resend = new Resend(resendApiKey)

    // Get all confirmed subscribers
    const { data: subscribers, error: subscribersError } = await supabase
      .from('subscribers')
      .select('email')
      .eq('confirmed', true)

    if (subscribersError) {
      throw createError({
        statusCode: 500,
        message: `Failed to fetch subscribers: ${subscribersError.message}`,
      })
    }

    if (!subscribers || subscribers.length === 0) {
      throw createError({
        statusCode: 400,
        message: 'No confirmed subscribers found',
      })
    }

    // Send email to all subscribers
    const articleUrl = `${siteUrl}/${articleSlug}`
    const emails = subscribers.map(s => s.email)

    await resend.emails.send({
      from: fromEmail,
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
            You're receiving this because you subscribed to updates from ${siteUrl}
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

    return {
      success: true,
      recipients: subscribers.length,
    }
  } catch (error: any) {
    console.error('Newsletter send error:', error)

    if (error.statusCode) {
      throw error
    }

    throw createError({
      statusCode: 500,
      message: `Failed to send newsletter: ${error.message}`,
    })
  }
})
