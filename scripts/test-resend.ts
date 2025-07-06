#!/usr/bin/env tsx

import { config } from 'dotenv'
import { join } from 'path'

// Load environment variables BEFORE importing modules that use them
const result = config({ path: join(process.cwd(), '.env') })

if (result.error) {
    console.error('Error loading .env file:', result.error)
    process.exit(1)
}

// Now import modules after env vars are loaded
import { resend } from '../lib/resend'

// Re-read EMAIL_CONFIG after env vars are loaded
const EMAIL_CONFIG = {
    from: process.env.FROM_EMAIL || 'newsletter@yourdomain.com',
    replyTo: process.env.REPLY_TO_EMAIL || 'hello@yourdomain.com',
    domain: process.env.SITE_URL || 'https://yourdomain.com'
}

async function testResend() {
    console.log('🧪 Testing Resend API Configuration\n')
    
    console.log('📋 Configuration:')
    console.log(`   API Key: ${process.env.RESEND_API_KEY ? '✅ Set' : '❌ Not set'}`)
    console.log(`   From Email: ${EMAIL_CONFIG.from}`)
    console.log(`   Reply To: ${EMAIL_CONFIG.replyTo}`)
    console.log(`   Domain: ${EMAIL_CONFIG.domain}`)
    
    console.log('\n🔍 Environment Variables:')
    console.log(`   FROM_EMAIL: ${process.env.FROM_EMAIL || 'Not set'}`)
    console.log(`   REPLY_TO_EMAIL: ${process.env.REPLY_TO_EMAIL || 'Not set'}`)
    console.log(`   SITE_URL: ${process.env.SITE_URL || 'Not set'}`)
    
    if (!process.env.RESEND_API_KEY) {
        console.error('\n❌ RESEND_API_KEY is not set in .env file')
        process.exit(1)
    }
    
    console.log('\n📧 Sending test email...')
    
    try {
        const result = await resend.emails.send({
            from: EMAIL_CONFIG.from,
            to: EMAIL_CONFIG.replyTo, // Send test email to reply-to address
            subject: '🧪 Resend API Test',
            html: `
                <h2>Resend API Test</h2>
                <p>This is a test email to verify your Resend API configuration.</p>
                <p>If you're seeing this, your Resend API is working correctly!</p>
                <hr>
                <p><small>Sent at: ${new Date().toISOString()}</small></p>
            `,
            text: `Resend API Test\n\nThis is a test email to verify your Resend API configuration.\n\nIf you're seeing this, your Resend API is working correctly!\n\nSent at: ${new Date().toISOString()}`,
            tags: [
                { name: 'type', value: 'test' }
            ]
        })
        
        console.log('\n📨 Resend API Response:')
        console.log(JSON.stringify(result, null, 2))
        
        const emailId = result.data?.id || result.id
        
        console.log('\n✅ Test email sent successfully!')
        console.log(`   Email ID: ${emailId}`)
        console.log(`   Check your inbox at: ${EMAIL_CONFIG.replyTo}`)
        
        if (emailId) {
            console.log('\n🔍 Verify in Resend Dashboard:')
            console.log(`   https://resend.com/emails/${emailId}`)
        } else {
            console.log('\n⚠️  No email ID returned. This might indicate an issue with the Resend API response.')
        }
        
    } catch (error) {
        console.error('\n❌ Failed to send test email:')
        console.error(error)
        
        if (error instanceof Error) {
            if (error.message.includes('not_found')) {
                console.log('\n💡 Possible issues:')
                console.log('   - Check if your API key is correct')
                console.log('   - Verify the API key has sending permissions')
            } else if (error.message.includes('domain')) {
                console.log('\n💡 Possible issues:')
                console.log(`   - Domain "${EMAIL_CONFIG.from.split('@')[1]}" might not be verified`)
                console.log('   - Check https://resend.com/domains to verify your domain')
            }
        }
        
        process.exit(1)
    }
}

testResend().catch(console.error)