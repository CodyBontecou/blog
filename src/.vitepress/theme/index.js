import DefaultTheme from 'vitepress/theme'

import Comments from '../components/Comments.vue'
import SimpleNewsletter from '../components/SimpleNewsletter.vue'
import ZapierLogo from '../components/ZapierLogo.vue'
import Popup from '../components/Popup.vue'
import Github from '../components/icons/Github.vue'
import Discord from '../components/icons/Discord.vue'
import Youtube from '../components/icons/Youtube.vue'
import Twitter from '../components/icons/Twitter.vue'
import Facebook from '../components/icons/Facebook.vue'
import Email from '../components/icons/Email.vue'

import { useNewsletterStore } from './store/NewsletterStore'

import MyLayout from './MyLayout.vue'
import { createPinia } from 'pinia'

import './custom.css'

const pinia = createPinia()

export default {
  ...DefaultTheme,
  Layout: MyLayout,
  enhanceApp({ app }) {
    app.use(pinia)

    app.component('Comments', Comments)
    app.component('SimpleNewsletter', SimpleNewsletter)
    app.component('Popup', Popup)
    app.component('ZapierLogo', ZapierLogo)

    // Icons
    app.component('Github', Github)
    app.component('Discord', Discord)
    app.component('Youtube', Youtube)
    app.component('Twitter', Twitter)
    app.component('Facebook', Facebook)
    app.component('Email', Email)

    const store = useNewsletterStore()
  },
}
