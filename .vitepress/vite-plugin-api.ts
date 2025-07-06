import type { Plugin } from 'vite'
import { config } from 'dotenv'
import { join } from 'path'

// Load environment variables
config({ path: join(process.cwd(), '.env.local') })
config({ path: join(process.cwd(), '.env') })

export function apiPlugin(): Plugin {
  return {
    name: 'vite-plugin-api',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        // Handle API routes
        if (req.url === '/api/newsletter/subscribe' && req.method === 'POST') {
          try {
            // Dynamically import the handler to ensure environment variables are loaded
            const { handleNewsletterSubscribe } = await import('./theme/api/newsletter')
            
            // Parse request body
            let body = ''
            req.on('data', chunk => {
              body += chunk.toString()
            })
            
            req.on('end', async () => {
              try {
                const data = JSON.parse(body)
                
                // Subscribe using the newsletter service directly
                const { newsletterService } = await import('../lib/newsletter')
                const result = await newsletterService.subscribe(data.email)
                
                res.statusCode = result.success ? 200 : 400
                res.setHeader('Content-Type', 'application/json')
                res.end(JSON.stringify(result))
              } catch (error) {
                console.error('Newsletter subscribe error:', error)
                res.statusCode = 500
                res.setHeader('Content-Type', 'application/json')
                res.end(JSON.stringify({ 
                  success: false, 
                  message: error instanceof Error ? error.message : 'Internal server error' 
                }))
              }
            })
            
            return
          } catch (error) {
            console.error('API middleware error:', error)
            res.statusCode = 500
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ success: false, message: 'Internal server error' }))
            return
          }
        }
        
        // Handle newsletter confirmation
        if (req.url?.startsWith('/api/newsletter/confirm') && req.method === 'GET') {
          try {
            const url = new URL(req.url, `http://${req.headers.host}`)
            const token = url.searchParams.get('token')
            
            if (!token) {
              res.statusCode = 400
              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify({ 
                success: false, 
                message: 'Missing confirmation token' 
              }))
              return
            }
            
            // Confirm using the newsletter service
            const { newsletterService } = await import('../lib/newsletter')
            const result = await newsletterService.confirmSubscription(token)
            
            res.statusCode = result.success ? 200 : 400
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify(result))
            
            return
          } catch (error) {
            console.error('Newsletter confirmation error:', error)
            res.statusCode = 500
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ 
              success: false, 
              message: error instanceof Error ? error.message : 'Internal server error' 
            }))
            return
          }
        }
        
        next()
      })
    }
  }
}