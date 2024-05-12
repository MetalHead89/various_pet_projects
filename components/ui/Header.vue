<template>
  <header
    ref="headerRef"
    :class="classes"
  >
    <UiBurger />
    <UiBreadcrumbs />
  </header>
</template>

<script lang="ts" setup>
const headerStore = useHeaderStore()
const headerRef = ref<HTMLElement | null>(null)
const sidebarStore = useSidebarStore()
const screen = useScreen()

const BASE_CLASS = 'header'

const classes = computed(() => {
  return [
    BASE_CLASS,
    !screen.isMobileScreen.value && sidebarStore.isMinimized && `${BASE_CLASS}_is-long`,
    !screen.isMobileScreen.value && sidebarStore.isOpened && `${BASE_CLASS}_is-short`
  ]
})

defineOptions({
  inheritAttrs: false
})

const handleHeaderResize = () => {
  if (!headerRef.value) {
    return
  }

  headerStore.setHeaderHeight(headerRef.value.offsetHeight)
}

let resizeObserver: ResizeObserver | null = null

if (process.browser) {
  resizeObserver = new ResizeObserver(handleHeaderResize)
}

onMounted(() => {
  if (headerRef.value && resizeObserver) {
    resizeObserver.observe(headerRef.value)
  }
})

onDeactivated(() => {
  if (headerRef.value && resizeObserver) {
    resizeObserver.unobserve(headerRef.value)
  }
})
</script>

<style lang="scss">
.header {
  grid-column: 1 / span 2;
  padding: 20px $base-content-padding;
  display: flex;
  align-items: center;
  background: rgba($main-bg-color, 0.7);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  backdrop-filter: blur(7px);
  z-index: 100;
  transition: margin 0.3s;
  gap: 30px;

  &_is-long {
    margin-left: $sidebar-minimized-width;
  }

  &_is-short {
    margin-left: $sidebar-max-width;
  }
}
</style>
