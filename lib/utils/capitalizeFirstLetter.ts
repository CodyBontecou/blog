export function capitalizeFirstLetter(string: string) {
    if (string.length === 0) return '' // Handle empty string
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
}
