import { query } from '@anthropic-ai/claude-agent-sdk'

// AIDEV-NOTE: This script runs Claude Agent SDK to autonomously fix the GitHub issue
// It's executed inside a Vercel Sandbox with the repository already cloned

const issueNumber = 77
const issueTitle = `[Feedback] automate-with-zapier.md:6 [Vue warn]: Failed to resolve c...`
const issueBody = `## Feedback

automate-with-zapier.md:6 [Vue warn]: Failed to resolve component: ZapierLogo
If this is a native custom element, make sure to exclude it from component resolution via compilerOptions.isCustomElement. 
  at <AutomateWithZapier.md onVnodeMounted=fn<runCbs> onVnodeUpdated=fn<runCbs> onVnodeUnmounted=fn<runCbs> > 
  at <VitePressContent key="/automate-with-zapier" > 
  at <Layout> 
  at <VitePressApp>
warn\$1 @ runtime-core.esm-bundler.js:51
resolveAsset @ runtime-core.esm-bundler.js:2899
resolveComponent @ runtime-core.esm-bundler.js:2861
_sfc_render @ automate-with-zapier.md:6
renderComponentRoot @ runtime-core.esm-bundler.js:6560
componentUpdateFn @ runtime-core.esm-bundler.js:5351
run @ reactivity.esm-bundler.js:237
setupRenderEffect @ runtime-core.esm-bundler.js:5486
mountComponent @ runtime-core.esm-bundler.js:5260
processComponent @ runtime-core.esm-bundler.js:5213
patch @ runtime-core.esm-bundler.js:4729
mountChildren @ runtime-core.esm-bundler.js:4963
mountElement @ runtime-core.esm-bundler.js:4886
processElement @ runtime-core.esm-bundler.js:4851
patch @ runtime-core.esm-bundler.js:4717
componentUpdateFn @ runtime-core.esm-bundler.js:5358
run @ reactivity.esm-bundler.js:237
setupRenderEffect @ runtime-core.esm-bundler.js:5486
mountComponent @ runtime-core.esm-bundler.js:5260
processComponent @ runtime-core.esm-bundler.js:5213
patch @ runtime-core.esm-bundler.js:4729
mountChildren @ runtime-core.esm-bundler.js:4963
mountElement @ runtime-core.esm-bundler.js:4886
processElement @ runtime-core.esm-bundler.js:4851
patch @ runtime-core.esm-bundler.js:4717
mountChildren @ runtime-core.esm-bundler.js:4963
mountElement @ runtime-core.esm-bundler.js:4886
processElement @ runtime-core.esm-bundler.js:4851
patch @ runtime-core.esm-bundler.js:4717
mountChildren @ runtime-core.esm-bundler.js:4963
mountElement @ runtime-core.esm-bundler.js:4886
processElement @ runtime-core.esm-bundler.js:4851
patch @ runtime-core.esm-bundler.js:4717
componentUpdateFn @ runtime-core.esm-bundler.js:5358
run @ reactivity.esm-bundler.js:237
setupRenderEffect @ runtime-core.esm-bundler.js:5486
mountComponent @ runtime-core.esm-bundler.js:5260
processComponent @ runtime-core.esm-bundler.js:5213
patch @ runtime-core.esm-bundler.js:4729
componentUpdateFn @ runtime-core.esm-bundler.js:5358
run @ reactivity.esm-bundler.js:237
setupRenderEffect @ runtime-core.esm-bundler.js:5486
mountComponent @ runtime-core.esm-bundler.js:5260
processComponent @ runtime-core.esm-bundler.js:5213
patch @ runtime-core.esm-bundler.js:4729
render2 @ runtime-core.esm-bundler.js:6034
mount @ runtime-core.esm-bundler.js:3962
app.mount @ runtime-dom.esm-bundler.js:1775
(anonymous) @ index.js:134
Promise.then
(anonymous) @ index.js:131
Promise.then
(anonymous) @ index.js:129

**Page URL**: http://localhost:5173/automate-with-zapier
**User Agent**: \`Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36\`

---
*Submitted via [Pullreque.st](https://pullreque.st)*`
const issueUrl = 'https://github.com/CodyBontecou/blog/issues/77'
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
