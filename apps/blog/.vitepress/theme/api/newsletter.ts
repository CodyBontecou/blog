import { newsletterService } from '../../../lib/newsletter'

export async function handleNewsletterSubscribe(req: Request): Promise<Response> {
  try {
    const { email } = await req.json()
    
    if (!email || typeof email !== 'string') {
      return new Response(JSON.stringify({ 
        success: false, 
        message: 'Email is required' 
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      })
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return new Response(JSON.stringify({ 
        success: false, 
        message: 'Invalid email format' 
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      })
    }
    
    // Subscribe using the newsletter service
    const result = await newsletterService.subscribe(email)
    
    return new Response(JSON.stringify(result), {
      status: result.success ? 200 : 400,
      headers: { 'Content-Type': 'application/json' }
    })
  } catch (error) {
    console.error('Newsletter API error:', error)
    return new Response(JSON.stringify({ 
      success: false, 
      message: 'Internal server error' 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}

export async function handleNewsletterConfirm(req: Request): Promise<Response> {
  try {
    const url = new URL(req.url)
    const token = url.searchParams.get('token')
    
    if (!token || typeof token !== 'string') {
      return new Response(JSON.stringify({ 
        success: false, 
        message: 'Invalid confirmation token' 
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      })
    }
    
    // Confirm using the newsletter service
    const result = await newsletterService.confirmSubscription(token)
    
    return new Response(JSON.stringify(result), {
      status: result.success ? 200 : 400,
      headers: { 'Content-Type': 'application/json' }
    })
  } catch (error) {
    console.error('Newsletter confirmation API error:', error)
    return new Response(JSON.stringify({ 
      success: false, 
      message: 'Internal server error' 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}