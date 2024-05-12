export const useBreadcrumbsStore = defineStore('breadcrumbs', () => {
  const breadcrumbs = ref<TBreadcrumbs>([])

  const buildBreadcrumbs = (value: TBreadcrumbs) => {
    breadcrumbs.value = value
  }

  return { breadcrumbs, buildBreadcrumbs }
})
