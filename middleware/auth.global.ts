export default defineNuxtRouteMiddleware(to => {
  const userStore = useUserStore()

  if (to.name === 'login' && userStore.name) {
    return process.server ? navigateTo('/') : abortNavigation()
  }

  if (to.name !== 'login' && !userStore.name) {
    return navigateTo('/login')
  }
})
