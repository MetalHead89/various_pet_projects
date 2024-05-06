import type { NuxtApp } from 'nuxt/app'
import dashboard from '@/api/dashboard'

export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.provide('api', {
    dashboard: dashboard(nuxtApp as NuxtApp)
  })
})
