// Newsletter subscription composable that integrates with Supabase backend
export function useNewsletter() {
  const subscribeUserToNewsletter = async (email: string) => {
    try {
      console.log('📧 Subscribing email:', email)
      
      // Call the server endpoint to handle subscription
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })
      
      const result = await response.json()
      console.log('📬 Subscription response:', result)
      
      if (!response.ok) {
        return { 
          success: false, 
          message: result.message || 'Subscription failed',
          error: [result.message || 'Subscription failed'] 
        }
      }
      
      return { 
        success: result.success,
        message: result.message,
        confirmationRequired: result.confirmationRequired,
        error: result.success ? [] : [result.message]
      }
    } catch (error) {
      console.error('Newsletter subscription error:', error)
      return { 
        success: false,
        message: 'Network error. Please try again.',
        error: ['Network error. Please try again.'] 
      }
    }
  }
  
  return { subscribeUserToNewsletter }
}