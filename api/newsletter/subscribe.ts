import { VercelRequest, VercelResponse } from '@vercel/node'
import { newsletterService } from '../../lib/newsletter.js'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }
  
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      success: false, 
      message: 'Method not allowed' 
    })
  }
  
  try {
    console.log('📧 Newsletter subscription request received')
    console.log('Environment check:', {
      hasSupabaseUrl: !!process.env.SUPABASE_URL || !!process.env.VITE_SUPABASE_URL,
      hasSupabaseKey: !!process.env.SUPABASE_SERVICE_ROLE_KEY || !!process.env.SUPABASE_ANON_KEY || !!process.env.VITE_SUPABASE_ANON_KEY,
      hasResendKey: !!process.env.RESEND_API_KEY
    })

    const { email } = req.body

    if (!email || typeof email !== 'string') {
      return res.status(400).json({
        success: false,
        message: 'Email is required'
      })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email format'
      })
    }

    console.log(`📧 Attempting to subscribe email: ${email}`)

    // Subscribe using the newsletter service
    const result = await newsletterService.subscribe(email)

    console.log('📧 Subscription result:', result)

    return res.status(result.success ? 200 : 400).json(result)
  } catch (error) {
    console.error('Newsletter API error:', error)
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error instanceof Error ? error.message : String(error)
    })
  }
}