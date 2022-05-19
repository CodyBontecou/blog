import DefaultTheme from 'vitepress/dist/client/theme-default'
import './tailwind.postcss'
import './custom.css'

// import Vssue from 'vssue'
// import GithubV3 from '@vssue/api-github-v3'
import 'vssue/dist/vssue.css'
// import Post from '../components/Post.vue'
import HeaderMeta from '../components/HeaderMeta.vue'
import ReadingTime from '../components/ReadingTime.vue'

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    // register global components
    // app.component('Vssue', Vssue, {
    //   // set the platform api
    //   api: GithubV3,
    //   // here set the default options for your OAuth App
    //   owner: 'CodyBontecou',
    //   repo: 'blog',
    //   clientId: process.env.GITHUB_CLIENT_ID,
    //   clientSecret: process.env.GITHUB_CLIENT_SECRET,
    // })
    // app.component('Post', Post)
    app.component('HeaderMeta', HeaderMeta)
    app.component('ReadingTime', ReadingTime)
  },
}
