import DefaultTheme from 'vitepress/theme'
import VueUtterances from 'vue-utterances'
import SimpleNewsletter from '../components/SimpleNewsletter.vue'
import Popup from '../components/Popup.vue'
import { createPinia } from 'pinia'
import { useNewsletterStore } from './store/NewsletterStore'
import './custom.css'

const pinia = createPinia()

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.use(pinia)
    app.component('Post', VueUtterances)
    app.component('SimpleNewsletter', SimpleNewsletter)
    app.component('Popup', Popup)

    const store = useNewsletterStore()
  },
}
