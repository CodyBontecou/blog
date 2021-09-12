const { description } = require('../../package')
require('dotenv').config()

module.exports = {
  title: 'Cody Bontecou',
  description: description,
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
        text: 'Contact',
        link: '/contact',
      },
    ],
    sidebar: {
      '/': [
        {
          title: 'Code Articles',
          collapsable: false,
          children: [
            ['/selenium-movie-picker', 'Selenium Movie Picker'],
            [
              '/convert-reactjs-component-to-vuejs',
              'Convert ReactJS Component to VueJS',
            ],
            [
              '/vuejs-emit-multiple-values-from-child-to-parent',
              'Vuejs Emit Multiple Values from Child to Parent',
            ],
            [
              'mocking-api-with-msw-and-typescript',
              'Mocking an API request with MSW and Typescript',
            ],
            [
              'post-to-reddit-with-nodejs-and-typescript',
              'Post to Reddit with NodeJS and Typescript',
            ],
            [
              'programmatically-tweeting-with-nodejs',
              'Programmatically Tweeting with NodeJS',
            ],
            [
              '/dopamine-fasting-with-100-days-of-code',
              'Dopamine Fasting with #100DaysOfCode',
            ],
            [
              '/programmatically-posting-to-your-favorite-blogs',
              'Post to Dev, Hashnode, and Medium using their APIs',
            ],
            [
              '/generating-a-code-snippet-with-carbon',
              'Generating a Code Snippet with Carbon',
            ],
            [
              '/time-to-read-article-component',
              'Building a time-to-read-article Component',
            ],
            ['/vuepress-styles', 'Overriding VuePress CSS Styles'],
            [
              '/tailwindcss-with-vitepress',
              'Configuring TailwindCSS to work with Vitepress',
            ],
          ],
        },
        {
          title: process.env.title,
          collapsable: false,
          children: [
            [
              '/marketing/automate-with-zapier',
              'Automate Twitter Tweets with Zapier',
            ],
          ],
        },
        // {
        //   title: 'Thoughts',
        //   collapsable: false,
        //   children: [
        //     ['/subtle-pollutants', 'Subtle Pollutants'],
        //     ['/thoughts/why', 'Why?'],
        //   ],
        // },
      ],
    },
  },

  plugins: [
    '@vuepress/plugin-back-to-top',
    '@vuepress/plugin-medium-zoom',
    [
      '@vuepress/blog',
      {
        comment: {
          service: 'vssue',
          owner: 'CodyBontecou',
          repo: 'blog',
          // The clientId & clientSecret introduced in OAuth2 spec.
          clientId: process.env.GITHUB_CLIENT_ID,
          clientSecret: process.env.GITHUB_CLIENT_SECRET,
        },
        sitemap: {
          hostname: 'https://codybontecou.com',
        },
        feed: {
          canonical_base: 'https://codybontecou.com',
        },
        newsletter: {
          endpoint:
            'https://codybontecou.us6.list-manage.com/subscribe/post?u=859d7d456e33a2afd508093ec&amp;id=70832a6daf',
        },
      },
    ],
  ],
  postcss: {
    plugins: [
      require('tailwindcss')('./tailwind.config.js'),
      require('autoprefixer'),
    ],
  },
}
