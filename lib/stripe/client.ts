import Stripe from 'stripe'

const stripeSecretKey = process.env.STRIPE_SECRET_KEY

if (!stripeSecretKey) {
  throw new Error('Missing STRIPE_SECRET_KEY environment variable')
}

export const stripe = new Stripe(stripeSecretKey, {
  apiVersion: '2024-12-18.acacia'
})

export async function createCheckoutSession({
  courseId,
  courseName,
  price,
  userId,
  successUrl,
  cancelUrl
}: {
  courseId: string
  courseName: string
  price: number
  userId: string
  successUrl: string
  cancelUrl: string
}) {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: courseName,
              description: `Access to ${courseName} course`
            },
            unit_amount: Math.round(price * 100) // Convert to cents
          },
          quantity: 1
        }
      ],
      mode: 'payment',
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata: {
        courseId,
        userId
      }
    })

    return { session, error: null }
  } catch (error) {
    console.error('Error creating checkout session:', error)
    return { session: null, error: error instanceof Error ? error.message : 'Unknown error' }
  }
}

export async function createOrUpdateStripeProduct(course: {
  id: string
  title: string
  description: string | null
  price: number
  stripe_product_id?: string | null
}): Promise<{ productId: string; priceId: string } | null> {
  try {
    let productId = course.stripe_product_id

    if (!productId) {
      const product = await stripe.products.create({
        name: course.title,
        description: course.description || undefined,
        metadata: {
          courseId: course.id
        }
      })
      productId = product.id
    } else {
      await stripe.products.update(productId, {
        name: course.title,
        description: course.description || undefined
      })
    }

    const price = await stripe.prices.create({
      product: productId,
      unit_amount: Math.round(course.price * 100),
      currency: 'usd'
    })

    return {
      productId,
      priceId: price.id
    }
  } catch (error) {
    console.error('Error creating/updating Stripe product:', error)
    return null
  }
}

export async function verifyWebhookSignature(
  payload: string | Buffer,
  signature: string,
  webhookSecret: string
): Promise<Stripe.Event | null> {
  try {
    return stripe.webhooks.constructEvent(payload, signature, webhookSecret)
  } catch (error) {
    console.error('Error verifying webhook signature:', error)
    return null
  }
}
