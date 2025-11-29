#!/usr/bin/env tsx

import { config } from 'dotenv'
import { newsletterAutomation } from '../lib/newsletter-automation'

// Load environment variables from .env file
config()

const command = process.argv[2]
const arg = process.argv[3]

async function main() {
    switch (command) {
        case 'send':
            if (!arg) {
                console.error('Usage: npm run newsletter send <article-slug>')
                process.exit(1)
            }

            console.log(`Sending newsletter for article: ${arg}`)
            const result =
                await newsletterAutomation.sendNewsletterForArticle(arg)

            if (result.success) {
                console.log('✅ Newsletter sent successfully!')
                console.log(result.message)
            } else {
                console.error('❌ Failed to send newsletter:', result.message)
                process.exit(1)
            }
            break

        case 'stats':
            console.log('Fetching newsletter statistics...')
            const stats = await newsletterAutomation.getStats()

            console.log('\n📊 Newsletter Statistics:')
            console.log(`• Total subscribers: ${stats.totalSubscribers}`)
            console.log(
                `• Confirmed subscribers: ${stats.confirmedSubscribers}`
            )
            console.log(`• Total campaigns sent: ${stats.totalCampaigns}`)

            if (stats.lastCampaign) {
                console.log(
                    `• Last campaign: "${stats.lastCampaign.article_title}" sent to ${stats.lastCampaign.recipients_count} recipients`
                )
            }
            break

        case 'check':
            console.log('Checking for new articles...')
            await newsletterAutomation.checkAndSendNewsletter()
            break

        default:
            console.log('Newsletter Management CLI')
            console.log('')
            console.log('Usage:')
            console.log(
                '  npm run newsletter send <article-slug>   - Send newsletter for specific article'
            )
            console.log(
                '  npm run newsletter stats                 - Show newsletter statistics'
            )
            console.log(
                '  npm run newsletter check                 - Check for new articles and send newsletters'
            )
            console.log('')
            console.log('Examples:')
            console.log('  npm run newsletter send my-awesome-article')
            console.log('  npm run newsletter stats')
            console.log('  npm run newsletter check')
    }
}

main().catch(console.error)
