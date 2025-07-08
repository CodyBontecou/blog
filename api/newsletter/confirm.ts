import { VercelRequest, VercelResponse } from '@vercel/node'
import { newsletterService } from '../../lib/newsletter.js'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }
  
  if (req.method !== 'GET') {
    return res.status(405).json({ 
      success: false, 
      message: 'Method not allowed' 
    })
  }
  
  try {
    const { token } = req.query
    
    if (!token || typeof token !== 'string') {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid confirmation token' 
      })
    }
    
    // Confirm using the newsletter service
    const result = await newsletterService.confirmSubscription(token)
    
    return res.status(result.success ? 200 : 400).json(result)
  } catch (error) {
    console.error('Newsletter confirmation API error:', error)
    return res.status(500).json({ 
      success: false, 
      message: 'Internal server error' 
    })
  }
}