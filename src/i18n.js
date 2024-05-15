import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import translationEN from './locales/en/translation.json'
import translationCN from './locales/cn/translation.json'

const resources = {
  en: {
    translation: translationEN,
  },
  cn: {
    translation: translationCN,
  },
}

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // 默认语言
    fallbackLng: 'en',

    interpolation: {
      escapeValue: false,
    },
  })

export default i18n;

