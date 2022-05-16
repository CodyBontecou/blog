require('dotenv').config()

module.exports = {
  title: 'Cody Bontecou',
  head: [
    [
      'link',
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: '/images/logo.png',
      },
    ],
    ['meta', { name: 'theme-color', content: '#4979ff' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    [
      'meta',
      { name: 'apple-mobile-web-app-status-bar-style', content: 'black' },
    ],
    [
      'meta',
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
    ],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:site', content: '@Codybontecou' }],
    ['meta', { name: 'twitter:creator', content: '@Codybontecou' }],
    ['meta', { property: 'og:site_name', content: 'codybontecou.com' }],
    [
      'script',
      {
        async: true,
        src: 'https://www.googletagmanager.com/gtag/js?id=G-3NM0E524EK',
      },
    ],
    [
      'script',
      {},
      [
        "window.dataLayer = window.dataLayer || [];\nfunction gtag(){dataLayer.push(arguments);}\ngtag('js', new Date());\ngtag('config', 'G-3NM0E524EK');",
      ],
    ],
  ],
  themeConfig: {
    repo: '',
    editLinks: false,
    smoothScrolling: true,
    docsDir: '',
    logo: '/images/navLogo.png',
    editLinkText: '',
    lastUpdated: 'Last Updated',
    nav: [
      {
        text: 'Home',
        link: '/',
      },
      {
        text: 'Projects',
        link: 'projects',
      },
      {
        text: 'Contact',
        link: '/contact',
      },
    ],
    sidebar: {
      '/projects': [
        { link: '/projects', text: 'Projects' },
        { link: '/projects/e-sports-ai-app', text: 'E-Sports AI App' },
      ],
      '/': [
        {
          text: 'NuxtJS',
          collapsable: true,
          children: [
            {
              link: 'how-to-use-vuetify-with-nuxt-3',
              text: 'How to use Vuetify with Nuxt 3',
            },
            { link: 'nuxt3-and-pinia', text: 'Nuxt 3 and Pinia' },
            {
              link: 'using-url-query-params-in-nuxt-3',
              text: 'Using URL Query Params in Nuxt 3',
            },
            {
              link: 'silently-update-url-nuxt-3',
              text: 'Silently Update URL in Nuxt 3',
            },
          ],
        },
        {
          text: 'VueJS',
          collapsable: true,
          children: [
            {
              link: 'convert-reactjs-component-to-vuejs',
              text: 'Convert ReactJS Component to VueJS',
            },
            {
              link: 'vuejs-emit-multiple-values-from-child-to-parent',
              text: 'Vuejs Emit Multiple Values from Child to Parent',
            },
            {
              link: 'electron-app-with-vue-devtools',
              text: 'Electron App with Vue Devtools',
            },
            {
              link: 'global-state-management-in-an-electron-app',
              text: 'Global State Management in an Electron App',
            },
            {
              link: 'electron-app-with-vuejs-and-vite',
              text: 'Building an Electron App with VueJS and Vite',
            },
            {
              link: '/time-to-read-article-component',
              text: 'Building a time-to-read-article Component',
            },
            { link: 'vuepress-styles', text: 'Overriding VuePress CSS Styles' },
            {
              link: 'tailwindcss-with-vitepress',
              text: 'Configuring TailwindCSS to work with Vitepress',
            },
          ],
        },
        {
          text: 'Electron',
          collapsable: true,
          children: [
            {
              link: 'electron-app-with-vue-devtools',
              text: 'Electron App with Vue Devtools',
            },
            {
              link: 'global-state-management-in-an-electron-app',
              text: 'Global State Management in an Electron App',
            },
            {
              link: 'electron-app-with-vuejs-and-vite',
              text: 'Building an Electron App with VueJS and Vite',
            },
          ],
        },
        {
          text: 'NodeJS',
          collapsable: true,
          children: [
            {
              link: 'mocking-api-with-msw-and-typescript',
              text: 'Mocking an API request with MSW and Typescript',
            },
            {
              link: 'post-to-reddit-with-nodejs-and-typescript',
              text: 'Post to Reddit with NodeJS and Typescript',
            },
            {
              link: 'programmatically-tweeting-with-nodejs',
              text: 'Programmatically Tweeting with NodeJS',
            },
            {
              link: 'programmatically-posting-to-your-favorite-blogs',
              text: 'Post to Dev, Hashnode, and Medium using their APIs',
            },
          ],
        },
        {
          text: 'Python',
          collapsable: true,
          children: [
            {
              link: 'generate-twitter-lists-with-python',
              text: 'Generate Twitter Lists with Python',
            },
            { link: 'selenium-movie-picker', text: 'Selenium Movie Picker' },
          ],
        },
        {
          text: 'Misc',
          collapsable: true,
          children: [
            {
              link: 'dopamine-fasting-with-100-days-of-code',
              text: 'Dopamine Fasting with #100DaysOfCode',
            },
            {
              link: 'generating-a-code-snippet-with-carbon',
              text: 'Generating a Code Snippet with Carbon',
            },
            {
              link: 'marketing/automate-with-zapier',
              text: 'Automate Twitter Tweets with Zapier',
            },
          ],
        },
      ],
    },
  },

  // plugins: [
  //   '@vuepress/plugin-back-to-top',
  //   '@vuepress/plugin-medium-zoom',
  //   [
  //     '@vuepress/blog',
  //     {
  //       comment: {
  //         service: 'vssue',
  //         owner: 'CodyBontecou',
  //         repo: 'blog',
  //         // The clientId & clientSecret introduced in OAuth2 spec.
  //         clientId: process.env.GITHUB_CLIENT_ID,
  //         clientSecret: process.env.GITHUB_CLIENT_SECRET,
  //       },
  //       sitemap: {
  //         hostname: 'https://codybontecou.com',
  //       },
  //       feed: {
  //         canonical_base: 'https://codybontecou.com',
  //       },
  //       newsletter: {
  //         endpoint:
  //           'https://codybontecou.us6.list-manage.com/subscribe/post?u=859d7d456e33a2afd508093ec&amp;id=70832a6daf',
  //       },
  //     },
  //   ],
  // ],
  // postcss: {
  //   plugins: [
  //     require('tailwindcss')('./tailwind.config.js'),
  //     require('autoprefixer'),
  //   ],
  // },
}
