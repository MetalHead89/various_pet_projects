// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  app: {
    head: {
      htmlAttrs: {
        lang: 'ru'
      }
    }
  },

  components: [
    { path: '~/components/ui', prefix: 'Ui' },
    { path: '~/components/ui/selects', prefix: 'Ui' },
    { path: '~/components/ui/buttons', prefix: 'Ui' },
    { path: '~/components/ui/cards', prefix: 'Ui' },
    { path: '~/components/ui/inputs', prefix: 'Ui' },
    '~/components'
  ],

  modules: [
    '@nuxtjs/i18n',
    '@pinia/nuxt',
    'v-wave/nuxt'
  ],

  i18n: {
    defaultLocale: 'ru',
    locales: [
      {
        code: 'ru',
        iso: 'ru-RU',
        name: 'Русский'
      },
      {
        code: 'en',
        iso: 'en-US',
        name: 'English'
      }
    ],
    strategy: 'no_prefix',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_locale',
      fallbackLocale: 'ru',
      alwaysRedirect: true,
      redirectOn: 'all'
    }
  },

  css: ['@/assets/styles/global.scss'],

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData:
            '@use "@/assets/styles/functions.scss" as *;' +
              '@use "@/assets/styles/variables.scss" as *;'
        }
      }
    }
  }
})
