// VitePress-compatible newsletter subscription
export function useNewsletter() {
  const subscribeUserToNewsletter = async (email: string) => {
    try {
      // Simple Mailchimp JSONP subscription
      const emailEncoded = encodeURIComponent(email)
      const dataCenter = 'gmail'
      const userId = 'cd437705ede047b78169e4337'
      const listId = 'c7dcc86f21'
      const endpoint = `https://${dataCenter}.us10.list-manage.com/subscribe/post-json?u=${userId}&id=${listId}&f_id=00b0bbe3f0&EMAIL=${emailEncoded}&c=?`
      
      // Use fetch with JSONP-style callback
      return new Promise((resolve, reject) => {
        const script = document.createElement('script')
        const callbackName = 'mailchimpCallback' + Date.now()
        
        // Create global callback
        ;(window as any)[callbackName] = (data: any) => {
          document.head.removeChild(script)
          delete (window as any)[callbackName]
          
          if (data.result === 'success') {
            resolve({ error: [] })
          } else {
            resolve({ error: [data.msg || 'Subscription failed'] })
          }
        }
        
        script.src = endpoint.replace('c=?', `c=${callbackName}`)
        script.onerror = () => {
          document.head.removeChild(script)
          delete (window as any)[callbackName]
          reject(new Error('Network error'))
        }
        
        document.head.appendChild(script)
      })
    } catch (error) {
      console.error('Newsletter subscription error:', error)
      return { error: ['Something went wrong. Please try again.'] }
    }
  }
  
  return { subscribeUserToNewsletter }
}