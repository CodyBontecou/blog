# Newsletter System Setup Guide

This guide will help you set up the automated newsletter system that sends beautiful emails to subscribers whenever you publish new articles.

## 🚀 Quick Start

### 1. Database Setup (Supabase)

1. Create a new project at [Supabase](https://supabase.com)
2. Go to the SQL Editor in your Supabase dashboard
3. Run the SQL script from `supabase/schema.sql` to create the required tables
4. Copy your project URL and anon key from Settings > API

### 2. Email Service Setup (Resend)

1. Sign up at [Resend](https://resend.com)
2. Create a new API key in your dashboard
3. Add your domain and verify it (optional but recommended for better deliverability)

### 3. Environment Variables

Copy `.env.example` to `.env` and fill in your credentials:

```bash
cp .env.example .env
```

Update the following variables:

- `SUPABASE_URL` - Your Supabase project URL
- `SUPABASE_ANON_KEY` - Your Supabase anon key
- `RESEND_API_KEY` - Your Resend API key
- `FROM_EMAIL` - The email address newsletters will be sent from
- `REPLY_TO_EMAIL` - Where replies should go
- `SITE_URL` - Your website URL

### 4. Deploy Configuration

Make sure your hosting platform (Vercel, Netlify, etc.) has the environment variables set.

## 🎯 How It Works

### Automatic Newsletter Sending

When you deploy your site (production build), the system:

1. **Checks for new articles** - Compares file modification times since the last build
2. **Generates beautiful emails** - Creates HTML and text versions of your articles
3. **Sends to subscribers** - Delivers emails to all confirmed subscribers
4. **Tracks campaigns** - Records sent newsletters in the database

### Manual Newsletter Management

Use the CLI script for manual operations:

```bash
# Send newsletter for a specific article
npm run newsletter send my-article-slug

# Check newsletter statistics
npm run newsletter stats

# Manually check for new articles and send newsletters
npm run newsletter check
```

## 📧 Email Features

### Beautiful Templates

- Responsive design that looks great on all devices
- Professional styling with gradients and modern typography
- Includes article content, metadata, and call-to-action buttons

### Email Content

- Full article content in the email (readers can read without clicking)
- Article metadata (author, date, topics)
- Link to read on your website
- Professional unsubscribe handling

### Subscriber Management

- Double opt-in subscription process
- Email confirmation system
- One-click unsubscribe
- Subscriber statistics and analytics

## 🔧 Newsletter Component

The newsletter subscription form is available at:

- `components/ui/newsletter/Newsletter.vue`

It includes:

- Email validation
- Loading states
- Success/error notifications
- Confirmation email sending

## 📊 Database Schema

### Subscribers Table

- `id` - Unique identifier
- `email` - Subscriber email address
- `confirmed` - Email confirmation status
- `subscribed_at` - Subscription date
- `unsubscribe_token` - Secure unsubscribe token

### Newsletter Campaigns Table

- `id` - Unique identifier
- `article_slug` - Article identifier
- `article_title` - Article title
- `subject` - Email subject line
- `sent_at` - Campaign send date
- `recipients_count` - Number of recipients

## 🎨 Customization

### Email Templates

Edit `lib/email-templates.ts` to customize:

- Email styling and layout
- Content formatting
- Call-to-action buttons
- Footer information

### Newsletter Service

Modify `lib/newsletter.ts` to adjust:

- Subscription logic
- Email sending behavior
- Confirmation process
- Statistics tracking

## 🔐 Security Features

- **Row Level Security** - Supabase RLS policies protect subscriber data
- **Email Validation** - Server-side email format validation
- **Secure Tokens** - Cryptographically secure unsubscribe tokens
- **Rate Limiting** - Email sending respects API rate limits

## 📈 Analytics

Track newsletter performance:

- Total subscribers
- Confirmed subscribers
- Campaign history
- Open rates (via Resend dashboard)
- Click tracking

## 🛠️ Troubleshooting

### Common Issues

1. **Newsletter not sending**
    - Check environment variables are set
    - Verify Resend API key is valid
    - Ensure NODE_ENV=production for auto-sending

2. **Emails going to spam**
    - Verify your domain with Resend
    - Set up SPF/DKIM records
    - Use a professional from-email address

3. **Subscription not working**
    - Check Supabase connection
    - Verify database schema is created
    - Check browser console for errors

### Debug Mode

Enable debug logging by adding to your environment:

```bash
DEBUG=newsletter:*
```

## 🎉 Next Steps

1. **Test the system** - Subscribe with a test email and publish a test article
2. **Customize templates** - Update email styling to match your brand
3. **Set up monitoring** - Monitor your Resend dashboard for delivery rates
4. **Migrate existing subscribers** - If you have existing subscribers, import them to Supabase

## 📞 Support

If you encounter issues:

1. Check the browser console for client-side errors
2. Check your deployment logs for server-side errors
3. Verify all environment variables are correctly set
4. Test individual components (subscription, confirmation, unsubscribe)

Your newsletter system is now ready to automatically engage your readers! 🚀
