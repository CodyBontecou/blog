import { readdirSync, statSync } from 'fs'
import { join } from 'path'
import { TtsGenerator } from './tts-generator.js'
import matter from 'gray-matter'
import { readFileSync } from 'fs'

function getAllMarkdownFiles(dir: string): string[] {
    const files: string[] = []

    const items = readdirSync(dir)

    for (const item of items) {
        const fullPath = join(dir, item)
        const stat = statSync(fullPath)

        if (stat.isDirectory()) {
            // Skip templates and topics directories
            if (item !== 'templates' && item !== 'topics' && item !== 'audio') {
                files.push(...getAllMarkdownFiles(fullPath))
            }
        } else if (item.endsWith('.md')) {
            files.push(fullPath)
        }
    }

    return files
}

function isPublishedPost(filePath: string): boolean {
    try {
        const content = readFileSync(filePath, 'utf-8')
        const { data: frontmatter } = matter(content)

        // Only include posts that are not drafts
        return !frontmatter.draft
    } catch (error) {
        console.error(`Error reading file ${filePath}:`, error)
        return false
    }
}

async function main() {
    const contentDir = join(process.cwd(), 'content')
    const generator = new TtsGenerator()

    console.log('🔍 Finding all markdown files...')
    const allMarkdownFiles = getAllMarkdownFiles(contentDir)

    console.log('📋 Filtering for published posts...')
    const publishedPosts = allMarkdownFiles.filter(isPublishedPost)

    console.log(
        `📊 Found ${publishedPosts.length} published posts out of ${allMarkdownFiles.length} total markdown files`
    )

    if (publishedPosts.length === 0) {
        console.log('❌ No published posts found')
        return
    }

    console.log('🎵 Starting TTS generation...')

    const results = {
        success: 0,
        skipped: 0,
        failed: 0,
    }

    for (const postPath of publishedPosts) {
        try {
            const result = await generator.generateForPost(postPath)

            if (result) {
                results.success++
            } else {
                results.skipped++
            }
        } catch (error) {
            console.error(`❌ Failed to process ${postPath}:`, error)
            results.failed++
        }
    }

    console.log('\n📊 Summary:')
    console.log(`✅ Successfully generated: ${results.success}`)
    console.log(`⏭️  Skipped: ${results.skipped}`)
    console.log(`❌ Failed: ${results.failed}`)
    console.log(`📁 Total processed: ${publishedPosts.length}`)
}

main().catch(console.error)
