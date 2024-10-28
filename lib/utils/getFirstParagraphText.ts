export const getFirstParagraphText = body => {
    if (!body?.children) return ''

    // Find the first paragraph element
    const firstParagraph = body.children.find(
        child => child.tag === 'p' && child.children?.[0]?.value
    )

    if (!firstParagraph) return ''

    const text = firstParagraph.children[0].value
    if (text.length <= 120) return text
    return text.slice(0, 120).trim() + '...'
}
