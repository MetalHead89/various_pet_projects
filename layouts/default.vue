<template>
  <div class="default-layout">
    <UiHeader v-model:is-active="isSidebarOpened" />
    <UiSidebar />
    <main
      ref="mainRef"
      :class="mainClasses"
    >
      <slot />
    </main>

    <UiLoadingOverlay
      :active="pageLoadingOverlay.isLoading"
      :z-index="50"
    />
  </div>
</template>

<script lang="ts" setup>
const isSidebarOpened = ref(false)
const headerStore = useHeaderStore()
const mainRef = ref<HTMLElement | null>(null)
const screen = useScreen()
const sidebarStore = useSidebarStore()
const pageLoadingOverlay = usePageLoadingOverlay()

const BASE_MAIN_CLASS = 'main'

const mainClasses = computed(() => {
  return [
    BASE_MAIN_CLASS,
    !screen.isMobileScreen.value && sidebarStore.isMinimized && `${BASE_MAIN_CLASS}_is-long`,
    !screen.isMobileScreen.value && sidebarStore.isOpened && `${BASE_MAIN_CLASS}_is-short`
  ]
})

watch(() => headerStore.headerHeight, value  => {
  if (!value || !mainRef.value) {
    return
  }

  mainRef.value.style.paddingTop = value
})
</script>

<style lang="scss" scoped>
  .default-layout {
    // display: grid;
    // grid-template-columns: 200px auto;
    // grid-template-rows: 50px auto;
    background: $main-bg-color;

    .main {
      transition: margin 0.3s;

      &_is-long {
        margin-left: $sidebar-minimized-width;
        }

        &_is-short {
          margin-left: $sidebar-max-width;
        }
    }
  }
</style>
