import { query } from '@anthropic-ai/claude-agent-sdk'

// AIDEV-NOTE: This script runs Claude Agent SDK to autonomously fix the GitHub issue
// It's executed inside a Vercel Sandbox with the repository already cloned

const issueNumber = 88
const issueTitle = `[Feedback] test 123456`
const issueBody = `## Feedback

test 123456

**Page URL**: http://localhost:3001/
**User Agent**: \`Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36\`

---
*Submitted via [Pullreque.st](https://pullreque.st)*`
const issueUrl = 'https://github.com/CodyBontecou/blog/issues/88'
const repoRoot = process.env.REPO_ROOT || '/vercel/sandbox'

console.log('Starting Claude Agent SDK...')
console.log(`Working directory: ${repoRoot}`)
console.log(`Issue #${issueNumber}: ${issueTitle}`)

// Spam/test feedback detection
function isSpamOrTestFeedback(title, body) {
    // Extract the actual feedback content (remove markdown formatting and metadata)
    const feedbackMatch = body.match(/## Feedback\s+([^\*]+)/i)
    const feedbackContent = feedbackMatch ? feedbackMatch[1].trim() : body
    const cleanFeedback = feedbackContent.replace(/\s+/g, ' ').trim().toLowerCase()

    console.log(`📝 Analyzing feedback content: "${cleanFeedback}"`)

    // Patterns that indicate test or spam feedback
    const spamPatterns = [
        /^test\s*\d+$/i,                    // "test 123", "test 123456"
        /^test\s+test$/i,                   // "test test"
        /^[a-z]{1,5}\s*\d+$/i,             // Simple pattern like "abc 123", "test 123456"
        /^\d+$/,                            // Only numbers
        /^test$/i,                          // Just "test"
        /^testing\s*\d*$/i,                 // "testing" or "testing 123"
        /^spam$/i,                          // Just "spam"
        /^asdf+$/i,                         // Keyboard mashing
        /^qwerty$/i,                        // Keyboard row
        /lorem ipsum/i,                     // Placeholder text
    ]

    // Check if feedback is too short (less than 10 meaningful characters)
    if (cleanFeedback.length < 10) {
        console.log('⚠️  Feedback appears to be too short (spam/test)')
        return true
    }

    // Check against spam patterns on the clean feedback content
    for (const pattern of spamPatterns) {
        if (pattern.test(cleanFeedback)) {
            console.log(`⚠️  Feedback matches spam pattern: ${pattern}`)
            return true
        }
    }

    return false
}

// Check if this is spam/test feedback
if (isSpamOrTestFeedback(issueTitle, issueBody)) {
    console.log('🚫 This appears to be test or spam feedback. Skipping agent processing.')
    console.log('ℹ️  No code changes needed for test feedback submissions.')
    console.log('✅ Exiting gracefully.')
    process.exit(0)
}

const prompt = `Please help me fix this GitHub issue in the codebase.

**Issue #${issueNumber}: ${issueTitle}**
**URL**: ${issueUrl}

**Description**:
${issueBody}

**Instructions**:
1. First, explore the codebase to understand the relevant files and context
2. Analyze what changes are needed to address this issue
3. Make the necessary code changes to fix the issue
4. Ensure your changes follow the project's existing patterns and style
5. Make focused, minimal changes that specifically address the issue

Please proceed with fixing this issue. When you're done, just stop - the changes will be automatically committed and turned into a PR.
`

try {
    const result = query({
        prompt,
        options: {
            cwd: repoRoot,
            permissionMode: 'acceptEdits', // Auto-accept file edits
            maxTurns: 20, // Limit agent iterations
            allowedTools: ['Read', 'Write', 'Edit', 'Bash', 'Glob', 'Grep'], // Enable code tools
            systemPrompt: {
                type: 'preset',
                preset: 'claude_code',
                append: 'Focus on making minimal, targeted changes to fix the specific issue. Follow existing code patterns and style.',
            },
        },
    })

    // Stream and log messages
    for await (const message of result) {
        if (message.type === 'assistant') {
            console.log('Claude:', message.message.content)
        } else if (message.type === 'result') {
            console.log('Result:', message)
            if (message.is_error) {
                console.error('Agent completed with errors')
                process.exit(1)
            }
        }
    }

    console.log('✅ Claude Agent completed successfully')
    process.exit(0)
} catch (error) {
    console.error('Agent failed:', error)
    process.exit(1)
}
