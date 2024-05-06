import type { NuxtApp } from 'nuxt/app'

export default ({ $fetchService }: NuxtApp) => ({
  get: () => {
    return $fetchService.get({ path: '/dashboard' })
      .then((data: TDashboardData) => data)
      .catch((error: any) => Promise.reject(error))
  }
})
