export default defineEventHandler((event) => {
  const headers = getHeaders(event)
  const cookies = parseCookies(event)

  return {
    environment: process.env.NODE_ENV,
    supabaseUrl: process.env.SUPABASE_URL || 'NOT SET',
    hasSupabaseKey: !!process.env.SUPABASE_KEY,
    host: headers.host,
    origin: headers.origin,
    referer: headers.referer,
    cookieKeys: Object.keys(cookies),
    supabaseCookies: Object.keys(cookies).filter(k => k.includes('supabase') || k.includes('sb-')),
    timestamp: new Date().toISOString()
  }
})
