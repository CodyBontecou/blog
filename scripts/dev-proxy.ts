import http from 'http'
import httpProxy from 'http-proxy'

const proxy = httpProxy.createProxyServer({})

// Configuration for different subdomains
const routes = {
  'admin.codybontecou.com': 'http://localhost:3001',
  'courses.codybontecou.com': 'http://localhost:3002',
  'codybontecou.com': 'http://localhost:5173', // VitePress default port
  'www.codybontecou.com': 'http://localhost:5173',
}

const server = http.createServer((req, res) => {
  const host = req.headers.host?.split(':')[0] || ''
  const target = routes[host as keyof typeof routes]

  if (target) {
    console.log(`[${new Date().toLocaleTimeString()}] ${host} → ${target}${req.url}`)
    proxy.web(req, res, { target, changeOrigin: true }, (err) => {
      console.error(`Proxy error for ${host}:`, err.message)
      res.writeHead(502, { 'Content-Type': 'text/plain' })
      res.end(`Bad Gateway: Could not connect to ${target}`)
    })
  } else {
    console.warn(`[${new Date().toLocaleTimeString()}] Unknown host: ${host}`)
    res.writeHead(404, { 'Content-Type': 'text/plain' })
    res.end(`Not Found: No route configured for ${host}`)
  }
})

// Handle WebSocket upgrades for hot-reload
server.on('upgrade', (req, socket, head) => {
  const host = req.headers.host?.split(':')[0] || ''
  const target = routes[host as keyof typeof routes]

  if (target) {
    proxy.ws(req, socket, head, { target }, (err) => {
      console.error(`WebSocket proxy error for ${host}:`, err.message)
    })
  }
})

const PORT = 80

server.listen(PORT, () => {
  console.log('\n🚀 Development Proxy Server Running\n')
  console.log('Local development URLs:')
  console.log('  Main Blog:   http://codybontecou.com')
  console.log('  Admin App:   http://admin.codybontecou.com')
  console.log('  Courses App: http://courses.codybontecou.com')
  console.log('\n⚠️  Make sure to add these entries to your /etc/hosts file:')
  console.log('  127.0.0.1 codybontecou.com')
  console.log('  127.0.0.1 admin.codybontecou.com')
  console.log('  127.0.0.1 courses.codybontecou.com')
  console.log('\n📝 Run: sudo nano /etc/hosts\n')
})

// Handle proxy errors
proxy.on('error', (err, req, res) => {
  console.error('Proxy error:', err.message)
  if (res instanceof http.ServerResponse) {
    res.writeHead(500, { 'Content-Type': 'text/plain' })
    res.end('Proxy error: ' + err.message)
  }
})
