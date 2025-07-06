import { supabase, type Subscriber, type NewsletterCampaign } from './supabase'
import { resend, EMAIL_CONFIG } from './resend'
import { generateArticleEmailHTML, generateArticleEmailText, type ArticleData } from './email-templates'

export class NewsletterService {
  /**
   * Subscribe a new email to the newsletter
   */
  async subscribe(email: string): Promise<{ success: boolean; message: string; confirmationRequired?: boolean }> {
    try {
      // Check if already subscribed
      const { data: existing } = await supabase
        .from('subscribers')
        .select('*')
        .eq('email', email)
        .single()

      if (existing) {
        if (existing.confirmed) {
          return { success: false, message: 'Already subscribed!' }
        } else {
          // Resend confirmation email
          await this.sendConfirmationEmail(email, existing.unsubscribe_token)
          return { 
            success: true, 
            message: 'Confirmation email sent! Please check your inbox.',
            confirmationRequired: true 
          }
        }
      }

      // Insert new subscriber
      const { data: subscriber, error } = await supabase
        .from('subscribers')
        .insert([{ email }])
        .select()
        .single()

      if (error) {
        console.error('Database error:', error)
        return { success: false, message: 'Failed to subscribe. Please try again.' }
      }

      // Send confirmation email
      await this.sendConfirmationEmail(email, subscriber.unsubscribe_token)

      return { 
        success: true, 
        message: 'Confirmation email sent! Please check your inbox.',
        confirmationRequired: true 
      }
    } catch (error) {
      console.error('Subscribe error:', error)
      return { success: false, message: 'An error occurred. Please try again.' }
    }
  }

  /**
   * Confirm a subscriber's email
   */
  async confirmSubscription(token: string): Promise<{ success: boolean; message: string }> {
    try {
      const { data: subscriber, error } = await supabase
        .from('subscribers')
        .update({ confirmed: true })
        .eq('unsubscribe_token', token)
        .select()
        .single()

      if (error || !subscriber) {
        return { success: false, message: 'Invalid confirmation link.' }
      }

      return { success: true, message: 'Email confirmed! You\'re now subscribed to the newsletter.' }
    } catch (error) {
      console.error('Confirm subscription error:', error)
      return { success: false, message: 'An error occurred. Please try again.' }
    }
  }

  /**
   * Unsubscribe a user
   */
  async unsubscribe(token: string): Promise<{ success: boolean; message: string }> {
    try {
      const { error } = await supabase
        .from('subscribers')
        .delete()
        .eq('unsubscribe_token', token)

      if (error) {
        return { success: false, message: 'Invalid unsubscribe link.' }
      }

      return { success: true, message: 'Successfully unsubscribed from the newsletter.' }
    } catch (error) {
      console.error('Unsubscribe error:', error)
      return { success: false, message: 'An error occurred. Please try again.' }
    }
  }

  /**
   * Get all confirmed subscribers
   */
  async getConfirmedSubscribers(): Promise<Subscriber[]> {
    const { data, error } = await supabase
      .from('subscribers')
      .select('*')
      .eq('confirmed', true)

    if (error) {
      console.error('Get subscribers error:', error)
      return []
    }

    return data || []
  }

  /**
   * Send newsletter for a new article
   */
  async sendArticleNewsletter(article: ArticleData): Promise<{ success: boolean; message: string; recipientCount?: number }> {
    try {
      // Debug: Log environment configuration
      console.log('📧 Email Configuration:')
      console.log(`  From: ${EMAIL_CONFIG.from}`)
      console.log(`  Reply-To: ${EMAIL_CONFIG.replyTo}`)
      console.log(`  Domain: ${EMAIL_CONFIG.domain}`)
      console.log(`  API Key: ${process.env.RESEND_API_KEY ? 'Set (' + process.env.RESEND_API_KEY.substring(0, 10) + '...)' : 'Not set'}`)

      // Get all confirmed subscribers
      const subscribers = await this.getConfirmedSubscribers()
      console.log(`📋 Found ${subscribers.length} confirmed subscribers`)
      
      if (subscribers.length === 0) {
        return { success: false, message: 'No confirmed subscribers found.' }
      }

      // Generate email content
      const htmlContent = generateArticleEmailHTML(article)
      const textContent = generateArticleEmailText(article)
      const subject = `📚 New Article: ${article.title}`

      // Send emails in batches to avoid rate limits
      const batchSize = 50
      let totalSent = 0
      let totalFailed = 0

      for (let i = 0; i < subscribers.length; i += batchSize) {
        const batch = subscribers.slice(i, i + batchSize)
        console.log(`📤 Sending batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(subscribers.length / batchSize)} (${batch.length} emails)`)
        
        const emailPromises = batch.map(subscriber => 
          resend.emails.send({
            from: EMAIL_CONFIG.from,
            to: subscriber.email,
            subject,
            html: htmlContent.replace('{{unsubscribe_token}}', subscriber.unsubscribe_token),
            text: textContent.replace('{{unsubscribe_token}}', subscriber.unsubscribe_token),
            replyTo: EMAIL_CONFIG.replyTo,
            tags: [
              { name: 'campaign', value: 'newsletter' },
              { name: 'article', value: article.slug }
            ]
          })
        )

        const results = await Promise.allSettled(emailPromises)
        const successCount = results.filter(result => result.status === 'fulfilled').length
        const failCount = results.filter(result => result.status === 'rejected').length
        totalSent += successCount
        totalFailed += failCount

        // Log results with more detail
        console.log(`  ✅ Success: ${successCount}/${batch.length} emails`)
        if (failCount > 0) {
          console.log(`  ❌ Failed: ${failCount}/${batch.length} emails`)
        }

        // Log successful email IDs for verification
        results.forEach((result, index) => {
          if (result.status === 'fulfilled') {
            const emailResult = (result as any).value
            const emailId = emailResult?.data?.id || emailResult?.id
            console.log(`  ✓ Sent to ${batch[index].email} - ID: ${emailId || 'No ID returned'}`)
          } else if (result.status === 'rejected') {
            console.error(`  ✗ Failed to send to ${batch[index].email}:`, result.reason)
          }
        })

        // Add delay between batches to respect rate limits
        if (i + batchSize < subscribers.length) {
          console.log('  ⏱️  Waiting 1 second before next batch...')
          await new Promise(resolve => setTimeout(resolve, 1000))
        }
      }

      console.log('\n📊 Summary:')
      console.log(`  Total sent: ${totalSent}`)
      console.log(`  Total failed: ${totalFailed}`)
      console.log(`  Total subscribers: ${subscribers.length}`)

      // Record the campaign
      const { error: dbError } = await supabase
        .from('newsletter_campaigns')
        .insert([{
          article_slug: article.slug,
          article_title: article.title,
          subject,
          recipients_count: totalSent
        }])

      if (dbError) {
        console.error('Failed to record campaign in database:', dbError)
      }

      return { 
        success: true, 
        message: `Newsletter sent to ${totalSent} subscribers.`,
        recipientCount: totalSent
      }
    } catch (error) {
      console.error('Send newsletter error:', error)
      return { success: false, message: 'Failed to send newsletter.' }
    }
  }

  /**
   * Send confirmation email
   */
  private async sendConfirmationEmail(email: string, token: string): Promise<void> {
    const confirmUrl = `${EMAIL_CONFIG.domain}/confirm?token=${token}`
    
    const html = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Confirm Your Newsletter Subscription</title>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
        .container { background: #f8fafc; padding: 40px; border-radius: 12px; text-align: center; }
        .button { display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600; margin: 20px 0; }
        .footer { margin-top: 30px; font-size: 14px; color: #64748b; }
    </style>
</head>
<body>
    <div class="container">
        <h1>📧 Confirm Your Subscription</h1>
        <p>Thanks for subscribing to Cody Bontecou's newsletter!</p>
        <p>Click the button below to confirm your email address and start receiving updates when new articles are published.</p>
        <a href="${confirmUrl}" class="button">Confirm Subscription</a>
        <div class="footer">
            <p>If you didn't request this, you can safely ignore this email.</p>
            <p>Or copy and paste this link: ${confirmUrl}</p>
        </div>
    </div>
</body>
</html>
`

    const text = `
Confirm Your Newsletter Subscription

Thanks for subscribing to Cody Bontecou's newsletter!

Click the link below to confirm your email address and start receiving updates when new articles are published:

${confirmUrl}

If you didn't request this, you can safely ignore this email.
`

    await resend.emails.send({
      from: EMAIL_CONFIG.from,
      to: email,
      subject: 'Confirm your newsletter subscription',
      html,
      text,
      replyTo: EMAIL_CONFIG.replyTo,
      tags: [{ name: 'type', value: 'confirmation' }]
    })
  }

  /**
   * Get newsletter statistics
   */
  async getStats(): Promise<{
    totalSubscribers: number
    confirmedSubscribers: number
    totalCampaigns: number
    lastCampaign?: NewsletterCampaign
  }> {
    const [subscribersResult, confirmedResult, campaignsResult, lastCampaignResult] = await Promise.all([
      supabase.from('subscribers').select('*', { count: 'exact' }),
      supabase.from('subscribers').select('*', { count: 'exact' }).eq('confirmed', true),
      supabase.from('newsletter_campaigns').select('*', { count: 'exact' }),
      supabase.from('newsletter_campaigns').select('*').order('sent_at', { ascending: false }).limit(1)
    ])

    return {
      totalSubscribers: subscribersResult.count || 0,
      confirmedSubscribers: confirmedResult.count || 0,
      totalCampaigns: campaignsResult.count || 0,
      lastCampaign: lastCampaignResult.data?.[0]
    }
  }
}

export const newsletterService = new NewsletterService()