import ru from './locales/ru/common'
import en from './locales/en/common'

export default defineI18nConfig(() => ({
  legacy: false,
  messages: {
    ru,
    en
  }
}))
