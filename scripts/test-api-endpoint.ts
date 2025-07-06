// Test the newsletter API endpoint
async function testAPIEndpoint() {
  console.log('🧪 Testing newsletter API endpoint...\n')
  
  const testEmail = `api-test-${Date.now()}@example.com`
  console.log(`📧 Test email: ${testEmail}`)
  
  try {
    const response = await fetch('http://localhost:5173/api/newsletter/subscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: testEmail }),
    })
    
    const result = await response.json()
    
    console.log(`\n📬 Response status: ${response.status}`)
    console.log('📋 Response body:', JSON.stringify(result, null, 2))
    
    if (result.success) {
      console.log('\n✅ API endpoint working correctly!')
    } else {
      console.log('\n❌ API returned an error:', result.message)
    }
  } catch (error) {
    console.error('\n❌ Failed to reach API:', error)
    console.log('\n💡 Make sure the development server is running with: npm run dev')
  }
}

testAPIEndpoint()