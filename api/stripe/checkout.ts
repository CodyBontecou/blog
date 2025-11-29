import type { IncomingMessage, ServerResponse } from 'http'
import { createCheckoutSession } from '~/lib/stripe/client'
import { supabase } from '~/lib/supabase/storage'

interface CheckoutRequestBody {
  courseId: string
  userId: string
}

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
    const { courseId, userId } = JSON.parse(body) as CheckoutRequestBody

    if (!courseId || !userId) {
      res.writeHead(400, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ error: 'Missing courseId or userId' }))
      return
    }

    const { data: course, error: courseError } = await supabase
      .from('courses')
      .select('*')
      .eq('id', courseId)
      .single()

    if (courseError || !course) {
      res.writeHead(404, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ error: 'Course not found' }))
      return
    }

    if (course.is_free) {
      res.writeHead(400, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ error: 'This course is free' }))
      return
    }

    const { data: existingEnrollment } = await supabase
      .from('enrollments')
      .select('*')
      .eq('user_id', userId)
      .eq('course_id', courseId)
      .single()

    if (existingEnrollment) {
      res.writeHead(400, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ error: 'Already enrolled in this course' }))
      return
    }

    const siteUrl = process.env.SITE_URL || 'http://localhost:5173'
    const { session, error } = await createCheckoutSession({
      courseId: course.id,
      courseName: course.title,
      price: course.price,
      userId,
      successUrl: `${siteUrl}/courses/${course.slug}?success=true`,
      cancelUrl: `${siteUrl}/courses/${course.slug}?canceled=true`
    })

    if (error || !session) {
      res.writeHead(500, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ error: error || 'Failed to create checkout session' }))
      return
    }

    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ url: session.url }))
  } catch (error) {
    console.error('Error in checkout handler:', error)
    res.writeHead(500, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ error: 'Internal server error' }))
  }
}
