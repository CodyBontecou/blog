import { newsletterService } from '../../lib/newsletter.js'

export async function GET(request: Request): Promise<Response> {
  try {
    const url = new URL(request.url)
    const token = url.searchParams.get('token')

    if (!token) {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Invalid unsubscribe link. Please check your email and try again.'
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      )
    }

    const result = await newsletterService.unsubscribe(token)

    return new Response(
      JSON.stringify(result),
      {
        status: result.success ? 200 : 400,
        headers: { 'Content-Type': 'application/json' }
      }
    )
  } catch (error) {
    console.error('Unsubscribe API error:', error)
    return new Response(
      JSON.stringify({
        success: false,
        message: 'An error occurred while processing your request.'
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    )
  }
}
