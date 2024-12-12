export default function ({ route, redirect }) {
    if (route && route.path !== '/' && route.path.endsWith('/')) {
        const { path, query, hash } = route
        const nextPath = path.replace(/\/+$/, '') || '/'
        const nextRoute = { path: nextPath, query, hash }

        return navigateTo(nextRoute, { redirectCode: 301 })
    }
}
