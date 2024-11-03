// Format the date for the posts list (YYYY · MM)
export const formatPostDate = (date: string) => {
    if (date) {
        const d = new Date(date)
        return `${d.getFullYear()} · ${String(d.getMonth() + 1).padStart(
            2,
            '0'
        )}`
    }
}
