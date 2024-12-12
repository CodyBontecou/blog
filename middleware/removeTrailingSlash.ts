export default defineNuxtRouteMiddleware(to => {
    if (to.path !== '/' && to.path.endsWith('/')) {
        const newPath = to.path.slice(0, -1)
        return navigateTo(
            newPath +
                (to.query ? `?${new URLSearchParams(to.query).toString()}` : '')
        )
    }
})
