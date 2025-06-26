export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  const router = useRouter()

  // Ensure canonical URLs are always set correctly
  router.afterEach((to) => {
    const canonical = `${config.public.siteUrl}${to.path}`
    
    // Remove any existing canonical link
    const existingCanonical = document.querySelector('link[rel="canonical"]')
    if (existingCanonical) {
      existingCanonical.remove()
    }
    
    // Add the correct canonical link
    const link = document.createElement('link')
    link.rel = 'canonical'
    link.href = canonical
    document.head.appendChild(link)
  })
})