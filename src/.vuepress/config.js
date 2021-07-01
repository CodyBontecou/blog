const { description } = require('../../package')

module.exports = {
  title: 'Cody Bontecou',
  description: description,
  head: [
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    [
      'meta',
      { name: 'apple-mobile-web-app-status-bar-style', content: 'black' },
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
              '/tailwindcss-with-vitepress',
              'Configuring TailwindCSS to work with Vitepress',
            ],
            ['/vuepress-styles', 'Overriding VuePress CSS Styles'],
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
        {
          title: 'Thoughts',
          collapsable: false,
          children: [['/subtle-pollutants', 'Subtle Pollutants']],
        },
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

  plugins: ['@vuepress/plugin-back-to-top', '@vuepress/plugin-medium-zoom'],
  postcss: {
    plugins: [
      require('tailwindcss')('./tailwind.config.js'),
      require('autoprefixer'),
    ],
  },
}
