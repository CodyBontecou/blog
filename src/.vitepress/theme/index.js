import DefaultTheme from 'vitepress/theme'
import VueUtterances from 'vue-utterances'
import SimpleNewsletter from '../components/SimpleNewsletter.vue'
import ZapierLogo from '../components/ZapierLogo.vue'
import Popup from '../components/Popup.vue'
import { createPinia } from 'pinia'
import MyLayout from './MyLayout.vue'
import { useNewsletterStore } from './store/NewsletterStore'
import './custom.css'

const pinia = createPinia()

export default {
  ...DefaultTheme,
  Layout: MyLayout,
  enhanceApp({ app }) {
    app.use(pinia)
    app.component('Post', VueUtterances)
    app.component('SimpleNewsletter', SimpleNewsletter)
    app.component('Popup', Popup)
    app.component('ZapierLogo', ZapierLogo)

    const store = useNewsletterStore()
  },
}
