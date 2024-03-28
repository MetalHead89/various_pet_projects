<template>
  <aside :class="classes">
    <div
      ref="topSectionRef"
      class="top-section"
    >
      <i class="ic-web-application logo" />

      <span class="logo-text">
        {{ $t('sidebar.top_section.logo_text') }}
      </span>

      <i
        v-if="screen.isMobileScreen.value"
        class="ic-close"
        @click="handleCloseClick"
      />
    </div>

    <UiNavigation />

    <!-- <button @click="handleLogOutClick">
      {{ $t('sidebar.top_section.logo_text') }}
    </button> -->
  </aside>

  <Transition name="fade">
    <div
      v-if="isShowOverlay"
      class="overlay"
      @click="handleSidebarClick"
    />
  </Transition>
</template>

<script lang="ts" setup>
import { SIDEBAR_STATE } from '@/config/constants'
import { useSidebarStore } from '@/stores/sidebar'

const topSectionRef = ref<HTMLElement | null>(null)
const screen = useScreen()
const sidebarStore = useSidebarStore()

const BASE_CLASS = 'sidebar'

const classes = computed(() => [
  BASE_CLASS,
  sidebarStore.state === SIDEBAR_STATE.minimized && `${BASE_CLASS}_is-minimized`,
  sidebarStore.state === SIDEBAR_STATE.opened && `${BASE_CLASS}_is-opened`
])

const closeSidebar = () => {
  sidebarStore.toggleState()
}

const isShowOverlay = computed(() => {
  return sidebarStore.state === SIDEBAR_STATE.opened &&
    screen.isMobileScreen.value
})

watch(() => screen.isMobileScreen.value, value  => {
  sidebarStore.setState(value ? SIDEBAR_STATE.closed : SIDEBAR_STATE.opened)
})

const handleSidebarClick = () => {
  closeSidebar()
}

const handleCloseClick = () => {
  closeSidebar()
}
</script>

<style lang="scss">
.sidebar {
  position: fixed;
  overflow: hidden;
  top: 0;
  bottom: 0;
  left: 0;
  width: $sidebar-max-width;
  background: #ffffff;
  z-index: 102;
  transform: translateX(-100%);
  transition: all 0.3s;

  .top-section {
    padding: 10px $sidebar-side-padding;
    display: flex;
    align-items: center;
    gap: 10px;
    color: $primary;
  }

  .logo {
    transition: font-size 0.3s;
    font-size: 55px;
  }

  .logo-text {
    transition: opacity 0.2s;
    white-space: nowrap;
  }

  .ic-close {
    color: $text-color;
    margin-left: auto;
    font-size: 30px;
  }

  &_is-minimized {
    transform: translateX(0);
    width: $sidebar-minimized-width;

    .logo {
      font-size: 45px;
    }

    .logo-text {
      opacity: 0;
    }
  }

  &_is-opened {
    transform: translateX(0);
  }
}

.overlay {
  position: fixed;
  z-index: 101;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: #00000080;
  backdrop-filter: blur(7px);
}

.fade-enter-active {
  transition: all 0.3s;
}

.fade-leave-active {
  transition: all 0.3s;
}

.fade-enter-from {
  opacity: 0;
}

.fade-leave-to {
  opacity: 0;
}
</style>
