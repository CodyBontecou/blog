// server/middleware/redirects.ts
export default defineEventHandler(event => {
    const url = event.path
    if (url.endsWith('.html')) {
        // Remove .html and redirect
        const newUrl = url.slice(0, -5)
        return sendRedirect(event, newUrl, 301)
    }
})
