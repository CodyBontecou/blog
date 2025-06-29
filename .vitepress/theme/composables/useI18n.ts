// Simple i18n implementation for VitePress
const translations = {
  'newsletter.cardTitle': 'Stay Updated',
  'newsletter.cardDescription': 'Get notified about new posts and updates. No spam, unsubscribe anytime.',
  'newsletter.submit': 'Subscribe',
  'newsletter.signupError': 'Subscription Error',
  'newsletter.signupErrorDescription': 'Something went wrong. Please try again.',
  'newsletter.successTitle': 'Successfully Subscribed!',
  'newsletter.successDescription': 'Thanks for subscribing! You\'ll receive updates about new posts.'
}

export function useI18n() {
  const t = (key: string) => translations[key as keyof typeof translations] || key
  return { t }
}