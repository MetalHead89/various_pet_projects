import { BREAKPOINTS } from '@/config/constants'

export function useScreen() {
  const currentScreenWidth = ref(BREAKPOINTS.xs)

  const isMobileScreen = computed(() => currentScreenWidth.value < BREAKPOINTS.md)

  const handleWindowResize = () => {
    if (!process.browser) {
      return
    }

    currentScreenWidth.value = window.innerWidth
  }

  onMounted(() => {
    handleWindowResize()
    window.addEventListener('resize', handleWindowResize)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', handleWindowResize)
  })

  return { isMobileScreen }
}
