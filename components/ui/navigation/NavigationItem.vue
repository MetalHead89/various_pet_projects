<template>
  <NuxtLink
    :class="classes"
    :to="item.link"
    exact-active-class="is-active"
  >
    <i :class="['icon', item.icon]" />

    <span class="label">
      {{ item.label }}
    </span>
  </NuxtLink>
</template>

<script lang="ts" setup>
const sidebarStore = useSidebarStore()

export type TNavigationItem = {
  icon?: string,
  class?: string,
  label: string,
  link?: { name: string },
  component?: string,
  action?: Function
}

export interface Props {
  item: TNavigationItem
}

const props = defineProps<Props>()

const BASE_CLASS = 'navigation-item'

const classes = computed(() => [
  BASE_CLASS,
  sidebarStore.isMinimized && `${BASE_CLASS}_is-minimized`,
  props.item.class
])
</script>

<style lang="scss" scoped>
.navigation-item {
  padding: 10px;
  display: flex;
  align-items: center;
  gap: 20px;
  margin: 0 $sidebar-side-padding;
  transition: all 0.3s;
  border-radius: 10px;
  cursor: pointer;
  text-decoration: none;
  color: $text-color;

  .icon {
    font-size: 25px;
  }

  .label {
    transition: opacity 0.2s;
  }

  &.is-active,
  &:hover {
    background: $primary;
    color: #ffffff;
  }

  &_is-minimized {
    .label {
      opacity: 0;
    }
  }
}
</style>
