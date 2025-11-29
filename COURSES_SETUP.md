# Course Platform Setup Guide

This guide will walk you through setting up the course platform feature that has been added to your VitePress site.

## Overview

The course platform includes:
- **Course browsing page** with filtering (free/paid courses)
- **Individual course pages** with lesson lists and enrollment
- **Video player** with progress tracking
- **Lesson viewer** with sidebar navigation
- **Admin panel** for course management
- **Stripe integration** for paid courses
- **Supabase** for database and video storage

## Prerequisites

- Supabase project (already configured)
- Stripe account
- Node.js and npm installed

## Step 1: Database Setup

The database migration has already been applied to your Supabase project with these tables:
- `courses` - Course information
- `lessons` - Lesson content
- `enrollments` - User course enrollments
- `lesson_progress` - Video watch progress

✅ **Already completed!**

## Step 2: Supabase Storage Setup

You need to create a storage bucket for course videos:

1. Go to your Supabase dashboard → Storage
2. Create a new bucket named `course-videos`
3. Set it to **Private** (not public)
4. Configure the following policies by running the SQL in `supabase/storage-policies.sql`:

```sql
-- Allow authenticated users to upload videos
CREATE POLICY "Authenticated users can upload videos"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'course-videos');

-- Allow authenticated users to update videos
CREATE POLICY "Authenticated users can update videos"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'course-videos');

-- Allow authenticated users to delete videos
CREATE POLICY "Authenticated users can delete videos"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'course-videos');

-- Allow enrolled users to view videos
CREATE POLICY "Enrolled users can view videos"
ON storage.objects FOR SELECT
TO authenticated
USING (
  bucket_id = 'course-videos' AND (
    -- User is enrolled in the course
    EXISTS (
      SELECT 1 FROM enrollments e
      INNER JOIN lessons l ON l.course_id = e.course_id
      WHERE e.user_id = auth.uid()
      AND storage.objects.name LIKE CONCAT(
        (SELECT c.slug FROM courses c WHERE c.id = l.course_id),
        '/%'
      )
    )
    OR
    -- Course is free
    EXISTS (
      SELECT 1 FROM courses c
      INNER JOIN lessons l ON l.course_id = c.id
      WHERE c.is_free = true
      AND storage.objects.name LIKE CONCAT(c.slug, '/%')
    )
  )
);
```

## Step 3: Environment Variables

Add the following Stripe configuration to your `.env` file:

```bash
# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_your-secret-key
STRIPE_PUBLISHABLE_KEY=pk_test_your-publishable-key
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your-publishable-key
STRIPE_WEBHOOK_SECRET=whsec_your-webhook-secret
```

You can get these from:
1. Go to https://dashboard.stripe.com/test/apikeys
2. Copy your **Secret key** and **Publishable key**
3. For webhooks, go to https://dashboard.stripe.com/test/webhooks
4. Add endpoint: `https://yourdomain.com/api/stripe/webhook`
5. Select events: `checkout.session.completed`
6. Copy the **Signing secret**

## Step 4: Supabase Authentication

Enable authentication providers in your Supabase project:

1. Go to Authentication → Providers
2. Enable at least one provider (GitHub, Google, etc.)
3. Configure the redirect URLs to include:
   - `https://yourdomain.com`
   - `http://localhost:5173` (for local development)

## Step 5: Deploy Stripe Webhook Handler

The webhook handler is already created at `api/stripe/webhook.ts`. You need to deploy it to Vercel:

1. Make sure your project is connected to Vercel
2. The API routes will automatically deploy with your site
3. Configure the webhook URL in Stripe dashboard (see Step 3)

## Step 6: Create Your First Course

1. Navigate to `/admin` on your site
2. Sign in with your authentication provider
3. Click "New Course"
4. Fill in the course details:
   - **Title**: Name of your course
   - **Slug**: URL-friendly identifier (e.g., `web-development-101`)
   - **Description**: What the course covers
   - **Thumbnail URL**: Optional course image
   - **Free/Paid**: Toggle and set price if paid
   - **Published**: Make it visible to users

5. After creating a course, click on it to add lessons:
   - Click "New Lesson"
   - Fill in lesson details
   - Upload a video (supports .mp4, .webm, .ogg)
   - Set the order and publish

## File Structure

```
.
├── content/
│   ├── courses.md              # Course browsing page
│   └── admin.md                # Admin panel page
│
├── .vitepress/theme/
│   ├── components/
│   │   ├── CoursesLayout.vue   # Course grid/list view
│   │   ├── CourseDetail.vue    # Individual course page
│   │   ├── LessonViewer.vue    # Lesson player with sidebar
│   │   ├── VideoPlayer.vue     # Custom video player
│   │   └── AdminPanel.vue      # Course management UI
│   └── Layout.vue              # Route handling
│
├── lib/
│   ├── types/
│   │   └── courses.ts          # TypeScript types
│   ├── supabase/
│   │   └── storage.ts          # Supabase storage utils
│   └── stripe/
│       └── client.ts           # Stripe API client
│
├── api/
│   └── stripe/
│       ├── checkout.ts         # Checkout session creation
│       └── webhook.ts          # Payment webhook handler
│
└── supabase/
    ├── courses-schema.sql      # Database schema
    └── storage-policies.sql    # Storage bucket policies
```

## Testing the Platform

### Test Free Courses

1. Create a free course in the admin panel
2. Navigate to `/courses`
3. Click on the course
4. Click "Enroll for Free"
5. Access lessons and watch videos

### Test Paid Courses

1. Create a paid course with a price
2. Use Stripe test card: `4242 4242 4242 4242`
3. Any future date, any CVC, any ZIP
4. Complete checkout
5. Verify enrollment and access to lessons

### Test Video Progress

1. Start watching a lesson
2. Skip ahead or pause
3. Progress is saved every 10 seconds
4. Refresh the page - you should resume where you left off
5. Completion is tracked at 90% watched

## Video Player Features

- **Keyboard shortcuts**:
  - `Space` or `K`: Play/Pause
  - `F`: Fullscreen
  - `M`: Mute
  - `←/→`: Seek 5 seconds
  - `↑/↓`: Volume up/down

- **Features**:
  - Custom playback speed (0.5x to 2x)
  - Volume control
  - Progress bar with click-to-seek
  - Automatic progress tracking
  - Resume from last position

## Security Notes

1. **RLS Policies**: All database tables have Row Level Security enabled
2. **Video Protection**: Videos use signed URLs that expire after 1 hour
3. **Enrollment Verification**: Users can only access courses they're enrolled in or free courses
4. **Admin Access**: Currently anyone authenticated can access admin - you may want to add role checks

## Customization

### Styling
All components use scoped styles with a warm editorial aesthetic. Colors are defined using HSL values for easy customization.

### Video Storage
Currently using Supabase Storage. To switch to Vercel Blob:
1. Update `lib/supabase/storage.ts`
2. Replace upload/download functions with Vercel Blob API
3. Update video URL generation

### Payment Processing
Stripe integration uses one-time payments. To add subscriptions:
1. Modify `lib/stripe/client.ts`
2. Update checkout session to use `mode: 'subscription'`
3. Add subscription management to admin panel

## Troubleshooting

### Videos won't play
- Check that the storage bucket exists
- Verify storage policies are applied
- Ensure video files are under 500MB
- Check that signed URLs are being generated

### Enrollment not working
- Verify authentication is set up
- Check enrollments table RLS policies
- Look for errors in browser console

### Stripe checkout fails
- Verify environment variables are set
- Check Stripe API keys are correct
- Ensure webhook endpoint is accessible
- Test with Stripe test mode first

## Next Steps

1. **Add email notifications**: Send enrollment confirmations
2. **Certificates**: Generate completion certificates
3. **Discussions**: Add comments/Q&A for lessons
4. **Quiz/Assessments**: Test knowledge after lessons
5. **Bulk upload**: Upload multiple lessons at once
6. **Analytics**: Track course performance and engagement

## Support

If you encounter issues:
1. Check the browser console for errors
2. Review Supabase logs for database errors
3. Check Vercel logs for API route errors
4. Verify all environment variables are set correctly

Congratulations! Your course platform is ready to use. 🎉
