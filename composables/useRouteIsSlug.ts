export const useRouteIsSlug = () => {
    const { name: routeName } = useRoute()
    const routeIsSlug = computed(() => routeName === 'slug')

    return { routeIsSlug }
}
