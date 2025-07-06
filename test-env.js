console.log('Testing environment variables:')
console.log('VITE_SUPABASE_URL:', process.env.VITE_SUPABASE_URL)

const dotenv = require('dotenv')
dotenv.config()

console.log('\nAfter loading .env:')
console.log('VITE_SUPABASE_URL:', process.env.VITE_SUPABASE_URL)