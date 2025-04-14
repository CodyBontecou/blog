// middleware/redirect-html.ts
import { defineNuxtRouteMiddleware, navigateTo } from 'nuxt/app'

export default defineNuxtRouteMiddleware(to => {
    if (to.path.endsWith('.html')) {
        // Remove the .html extension
        const newPath = to.path.slice(0, -5)

        // Perform the redirect with a 301 status code
        return navigateTo(newPath, { redirectCode: 301 })
    }
})
