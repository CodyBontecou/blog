import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import Layout from './Layout.vue'
import Newsletter from './components/NewsletterWrapper.vue'
import Comments from './components/Comments.vue'
// UI Components
import Card from '../../components/ui/card/Card.vue'
import CardHeader from '../../components/ui/card/CardHeader.vue'
import CardTitle from '../../components/ui/card/CardTitle.vue'
import CardDescription from '../../components/ui/card/CardDescription.vue'
import CardContent from '../../components/ui/card/CardContent.vue'
import Input from '../../components/ui/input/Input.vue'
import Button from '../../components/ui/button/Button.vue'
// Toast components
import ToastProvider from '../../components/ui/toast/ToastProvider.vue'
import Toaster from '../../components/ui/toast/Toaster.vue'
import './style.css'

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app, router, siteData }) {
    // Register Newsletter and Comments
    app.component('Newsletter', Newsletter)
    app.component('Comments', Comments)
    
    // Register UI components needed by Newsletter
    app.component('Card', Card)
    app.component('CardHeader', CardHeader)
    app.component('CardTitle', CardTitle)
    app.component('CardDescription', CardDescription)
    app.component('CardContent', CardContent)
    app.component('Input', Input)
    app.component('Button', Button)
    
    // Register toast components
    app.component('ToastProvider', ToastProvider)
    app.component('Toaster', Toaster)
  }
} satisfies Theme