import { query } from '@anthropic-ai/claude-agent-sdk'

// AIDEV-NOTE: This script runs Claude Agent SDK to autonomously fix the GitHub issue
// It's executed inside a Vercel Sandbox with the repository already cloned

const issueNumber = 86
const issueTitle = `[Feedback] Add a newsletter subscription form at the bottom of each ...`
const issueBody = `## Feedback

Add a newsletter subscription form at the bottom of each blog post. Include email validation and a success message after submission.

**Page URL**: https://codybontecou.com/blog/post
**User Email**: newsletter@example.com

---
*Submitted via [Pullreque.st](https://pullreque.st)*`
const issueUrl = 'https://github.com/CodyBontecou/blog/issues/86'
const repoRoot = process.env.REPO_ROOT || '/vercel/sandbox'

console.log('Starting Claude Agent SDK...')
console.log(`Working directory: ${repoRoot}`)
console.log(`Issue #${issueNumber}: ${issueTitle}`)

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
