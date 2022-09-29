const fg = require('fast-glob')

const ignoreList = ['projects', 'store', 'projects.md', 'contact.md']
const files = fg.sync(['**/*.md', '!**/node_modules', '!README.md'])
const sidebarGroupTitles = files
  .map(file => {
    const f = file.split('/')

    if (f.length === 2 && !ignoreList.some(el => f.indexOf(el) >= 0)) {
      return f[1].replace('.md', '.html')
    }
  })
  .filter(file => {
    if (file !== undefined) {
      return file
    }
  })

module.exports = {
  ci: {
    collect: {
      startServerCommand: 'yarn build && yarn serve',
      url: sidebarGroupTitles,
      startServerReadyPattern: 'Server is running on PORT 4000',
      startServerReadyTimeout: 20000,
      numberOfRuns: 1,
      staticDistDir: 'src/.vitepress/dist',
    },
    upload: {
      target: 'lhci',
      serverBaseUrl: 'https://blog-lhci.herokuapp.com/',
      token: '0803ba6d-5674-4d2f-8c4a-7112df52274f',
    },
    assert: {
      preset: 'lighthouse:no-pwa',
      assertions: {
        'dom-size': ['error', { maxNumericValue: 3000 }],
        'offscreen-images': 'off',
        'color-contrast': 'off',
        'tap-targets': 'off',
        'csp-xss': 'off',
        'errors-in-console': 'off',
        'image-alt': 'off',
        'image-size-responsive': 'off',
        'unsized-images': 'off',
        'unused-css-rules': 'off',
        'unused-javascript': 'off',
        'render-blocking-resources': 'off',
        'uses-rel-preload': 'off',
        'aria-hidden-focus': 'off',
        'heading-order': 'off',
        'uses-long-cache-ttl': 'off',
        'button-name': 'off',
        'link-text': 'off',
        'max-potential-fid': 'off',
        'uses-responsive-images': 'off',
        'modern-image-formats': 'off',
        'efficient-animated-content': 'off',
        'first-contentful-paint': 'off',
        'external-anchors-use-rel-noopener': 'off',
        'cumulative-layout-shift': 'off',
        'speed-index': 'off',
        'mainthread-work-breakdown': 'off',
        interactive: 'off',
        'bootup-time': 'off',
        'uses-passive-event-listeners': 'off',
        'third-party-facades': 'off',
        'non-composited-animations': 'off',
        'font-display': 'off',
      },
    },
  },
}
