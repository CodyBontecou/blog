import DefaultTheme from 'vitepress/theme'
import VueUtterances from 'vue-utterances'
import './custom.css'

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.component('Post', VueUtterances)
  },
}
