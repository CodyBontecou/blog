export const useJsonLd = (data: any) => {
    useHead({
        script: [
            {
                type: 'application/ld+json',
                innerHTML: JSON.stringify(data),
            },
        ],
    })
}