import { config } from 'dotenv'
import { supabase } from '../lib/supabase'

// Load environment variables
config()

async function checkNewsletterTables() {
  console.log('🔍 Checking newsletter tables in Supabase...\n')
  
  try {
    // Check subscribers table
    console.log('📋 Checking subscribers table...')
    const { data: subscribers, error: subscribersError } = await supabase
      .from('subscribers')
      .select('*')
      .limit(1)
    
    if (subscribersError) {
      console.error('❌ Error accessing subscribers table:', subscribersError.message)
      console.log('   The table might not exist or you might not have permissions.')
    } else {
      console.log('✅ Subscribers table exists and is accessible')
      const { count } = await supabase
        .from('subscribers')
        .select('*', { count: 'exact', head: true })
      console.log(`   Total subscribers: ${count || 0}`)
    }
    
    // Check newsletter_campaigns table
    console.log('\n📋 Checking newsletter_campaigns table...')
    const { data: campaigns, error: campaignsError } = await supabase
      .from('newsletter_campaigns')
      .select('*')
      .limit(1)
    
    if (campaignsError) {
      console.error('❌ Error accessing newsletter_campaigns table:', campaignsError.message)
      console.log('   The table might not exist or you might not have permissions.')
    } else {
      console.log('✅ Newsletter campaigns table exists and is accessible')
      const { count } = await supabase
        .from('newsletter_campaigns')
        .select('*', { count: 'exact', head: true })
      console.log(`   Total campaigns: ${count || 0}`)
    }
    
    // If tables don't exist, provide SQL to create them
    if (subscribersError || campaignsError) {
      console.log('\n📝 If tables are missing, create them with this SQL:\n')
      console.log(`-- Create subscribers table
CREATE TABLE IF NOT EXISTS subscribers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  confirmed BOOLEAN DEFAULT false,
  unsubscribe_token UUID DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_subscribers_email ON subscribers(email);
CREATE INDEX IF NOT EXISTS idx_subscribers_unsubscribe_token ON subscribers(unsubscribe_token);

-- Create newsletter_campaigns table
CREATE TABLE IF NOT EXISTS newsletter_campaigns (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  article_slug TEXT NOT NULL,
  article_title TEXT NOT NULL,
  subject TEXT NOT NULL,
  recipients_count INTEGER DEFAULT 0,
  sent_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_campaigns ENABLE ROW LEVEL SECURITY;

-- Create policies for service role access
CREATE POLICY "Service role can manage subscribers" ON subscribers
  FOR ALL USING (true);

CREATE POLICY "Service role can manage campaigns" ON newsletter_campaigns
  FOR ALL USING (true);`)
    }
    
  } catch (error) {
    console.error('❌ Unexpected error:', error)
  }
}

checkNewsletterTables()