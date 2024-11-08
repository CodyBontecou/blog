export function getPostBody(node: any) {
    // If node is null or undefined, return empty string
    if (!node) return ''

    // Base case: if this is a text node with a value
    if (node.type === 'text' && node.value) {
        return node.value + ' '
    }

    let result = ''

    // If node has children, recursively process them
    if (node.children && Array.isArray(node.children)) {
        node.children.forEach(child => {
            result += getPostBody(child)
        })
    }

    return result
}
