import { Resend } from 'resend'
import { config } from 'dotenv'
import { join } from 'path'

// Load environment variables if they haven't been loaded yet
if (!process.env.RESEND_API_KEY) {
  config({ path: join(process.cwd(), '.env.local') })
  config({ path: join(process.cwd(), '.env') })
}

let _resend: Resend | null = null

function getResendClient() {
  if (_resend) return _resend
  
  const resendApiKey = process.env.RESEND_API_KEY

  if (!resendApiKey) {
    throw new Error('Missing RESEND_API_KEY environment variable. Please set RESEND_API_KEY in your .env file.')
  }

  _resend = new Resend(resendApiKey)
  return _resend
}

export const resend = new Proxy({} as Resend, {
  get(target, prop) {
    const client = getResendClient()
    return client[prop as keyof typeof client]
  }
})

// Email configuration (use a getter to ensure env vars are loaded)
export const EMAIL_CONFIG = {
  get from() { return process.env.FROM_EMAIL || 'newsletter@yourdomain.com' },
  get replyTo() { return process.env.REPLY_TO_EMAIL || 'hello@yourdomain.com' },
  get domain() { return process.env.SITE_URL || 'https://yourdomain.com' }
} as const