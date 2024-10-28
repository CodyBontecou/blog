import eng_Latn from './i18n/eng_Latn.json'

export default defineI18nConfig(() => ({
    legacy: false,
    locale: 'en',
    messages: {
        eng_Latn: eng_Latn,
    },
}))
