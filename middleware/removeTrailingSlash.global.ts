export default defineNuxtRouteMiddleware(to => {
    if (!to.path.endsWith('/') && to.path !== '/') {
        const { path, query, hash } = to
        const nextPath = `${path}/`
        return navigateTo(
            { path: nextPath, query, hash },
            { redirectCode: 301 }
        )
    }
})
