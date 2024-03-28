import { DEFAULT_ROUTE_PATH } from '@/config/constants'

export default defineNuxtRouteMiddleware(to => {
  const userStore = useUserStore()

  if (to.name === 'login' && userStore.name) {
    return process.server ? navigateTo(DEFAULT_ROUTE_PATH) : abortNavigation()
  }

  if (to.name !== 'login' && !userStore.name) {
    return navigateTo('/login')
  }
})
