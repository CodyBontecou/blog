import type { IncomingMessage, ServerResponse } from 'http'
import { verifyWebhookSignature } from '~/lib/stripe/client'
import { supabase } from '~/lib/supabase/storage'
import type Stripe from 'stripe'

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  if (req.method !== 'POST') {
    res.writeHead(405, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ error: 'Method not allowed' }))
    return
  }

  try {
    let body = ''
    for await (const chunk of req) {
      body += chunk
    }

    const signature = req.headers['stripe-signature']
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

    if (!signature || !webhookSecret) {
      res.writeHead(400, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ error: 'Missing signature or webhook secret' }))
      return
    }

    const event = await verifyWebhookSignature(body, signature as string, webhookSecret)

    if (!event) {
      res.writeHead(400, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ error: 'Invalid signature' }))
      return
    }

    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        const { courseId, userId } = session.metadata || {}

        if (!courseId || !userId) {
          console.error('Missing metadata in checkout session')
          break
        }

        const { error: enrollmentError } = await supabase
          .from('enrollments')
          .insert({
            user_id: userId,
            course_id: courseId,
            stripe_payment_intent_id: session.payment_intent as string
          })

        if (enrollmentError) {
          console.error('Error creating enrollment:', enrollmentError)
        }
        break
      }
      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ received: true }))
  } catch (error) {
    console.error('Error in webhook handler:', error)
    res.writeHead(500, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ error: 'Internal server error' }))
  }
}
