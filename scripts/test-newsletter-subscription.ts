import { config } from 'dotenv'
import { newsletterService } from '../lib/newsletter'

// Load environment variables
config()

async function testNewsletterSubscription() {
  console.log('🧪 Testing newsletter subscription...\n')
  
  const testEmail = `test-${Date.now()}@example.com`
  console.log(`📧 Test email: ${testEmail}`)
  
  try {
    // Test subscription
    console.log('\n1️⃣ Testing subscription...')
    const result = await newsletterService.subscribe(testEmail)
    console.log('   Result:', result)
    
    if (result.success) {
      console.log('   ✅ Subscription successful!')
      
      // Check if subscriber was created
      console.log('\n2️⃣ Verifying subscriber in database...')
      const { supabase } = await import('../lib/supabase')
      const { data: subscriber, error } = await supabase
        .from('subscribers')
        .select('*')
        .eq('email', testEmail)
        .single()
      
      if (error) {
        console.error('   ❌ Error checking subscriber:', error)
      } else {
        console.log('   ✅ Subscriber found in database:')
        console.log(`      - Email: ${subscriber.email}`)
        console.log(`      - Confirmed: ${subscriber.confirmed}`)
        console.log(`      - Created: ${subscriber.created_at}`)
        console.log(`      - Token: ${subscriber.unsubscribe_token}`)
      }
      
      // Test duplicate subscription
      console.log('\n3️⃣ Testing duplicate subscription...')
      const duplicateResult = await newsletterService.subscribe(testEmail)
      console.log('   Result:', duplicateResult)
      if (!duplicateResult.success && duplicateResult.message.includes('Already subscribed')) {
        console.log('   ✅ Duplicate prevention working correctly')
      }
      
      // Clean up test data
      console.log('\n4️⃣ Cleaning up test data...')
      const { error: deleteError } = await supabase
        .from('subscribers')
        .delete()
        .eq('email', testEmail)
      
      if (deleteError) {
        console.error('   ❌ Error cleaning up:', deleteError)
      } else {
        console.log('   ✅ Test data cleaned up')
      }
    } else {
      console.error('   ❌ Subscription failed:', result.message)
    }
    
  } catch (error) {
    console.error('❌ Test error:', error)
  }
}

testNewsletterSubscription()