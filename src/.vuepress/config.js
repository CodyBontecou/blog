const { description } = require('../../package')

module.exports = {
  title: 'Cody Bontecou',
  description: description,
  head: [
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
    docsDir: '',
    editLinkText: '',
    lastUpdated: 'Last Updated',
    nav: [
      {
        text: 'Home',
        link: '/',
      },
      {
        text: 'Contact',
        link: '/contact/',
      },
    ],
    sidebar: {
      '/': [
        {
          title: 'Code Articles',
          collapsable: false,
          children: [
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
          title: 'Marketing',
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
      '/guide/': [
        {
          title: 'Guide',
          collapsable: true,
          children: ['', 'using-vue'],
        },
      ],
    },
  },

  plugins: [
    '@vuepress/plugin-back-to-top',
    '@vuepress/plugin-medium-zoom',
    [
      '@vuepress/google-analytics',
      {
        ga: '', // UA-00000000-0
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
