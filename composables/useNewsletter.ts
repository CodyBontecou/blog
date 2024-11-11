export const useNewsletter = () => {
    const subscribeUserToNewsletter = async (email: string) => {
        return await useFetch('/api/subscribeUser', {
            method: 'POST',
            body: { email },
        })
    }

    return { subscribeUserToNewsletter }
}
