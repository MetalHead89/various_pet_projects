export const usePageLoadingOverlay = defineStore('pageLoadingOverlay', () => {
  const isLoading = ref(false)

  const setIsLoading = (value: boolean) => {
    isLoading.value = value
  }

  return { isLoading, setIsLoading }
})
