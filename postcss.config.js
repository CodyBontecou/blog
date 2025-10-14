import purgecssPlugin from '@fullhuman/postcss-purgecss'

const purgecss = purgecssPlugin.default || purgecssPlugin

export default {
  plugins: [
    purgecss({
      content: [
        './.vitepress/**/*.{vue,js,ts,jsx,tsx}',
        './content/**/*.md',
        './components/**/*.{vue,js,ts,jsx,tsx}',
      ],
      safelist: {
        // VitePress default classes
        standard: [
          /^vp-/,
          /^VPDoc/,
          /^VPHome/,
          /^VPNav/,
          /^VPSidebar/,
          /^VPFooter/,
          /^VPButton/,
          /^VPBadge/,
          /^VPLink/,
          /^container/,
          /^language-/,
          /^line-numbers/,
          /^lang-/,
          // Code highlighting
          /^shiki/,
          /^token/,
          // Mermaid
          /^mermaid/,
          /^node/,
          /^edge/,
          /^cluster/,
          // Common utility classes
          /^text-/,
          /^bg-/,
          /^flex/,
          /^grid/,
        ],
        // Classes added dynamically
        deep: [/.*-active$/, /.*-enter$/, /.*-leave$/],
        greedy: [/^router-/, /^transition-/]
      },
      // Only apply PurgeCSS in production builds
      rejected: process.env.NODE_ENV === 'production',
      // Extract from template attributes
      defaultExtractor: content => {
        const broadMatches = content.match(/[^<>"'`\s]*[^<>"'`\s:]/g) || []
        const innerMatches = content.match(/[^<>"'`\s.()]*[^<>"'`\s.():]/g) || []
        return broadMatches.concat(innerMatches)
      }
    })
  ]
}
