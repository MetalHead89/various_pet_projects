import { COOKIE_USER_NAME } from '@/config/constants'

export const useUserStore = defineStore('user', () => {
  const usernameCookie = useCookie(
    COOKIE_USER_NAME,
    { maxAge: 30 * 24 * 60 * 60 }
  )
  const name = ref<null | string>(usernameCookie.value || null)

  const setUserName = (value: string | null) => {
    name.value = value
    usernameCookie.value = value
  }

  return { name, setUserName }
})
