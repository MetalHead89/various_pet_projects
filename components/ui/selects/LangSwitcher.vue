<template>
  <UiSelect
    :model-value="locale"
    :options="locales"
    track-by="code"
    show-by="name"
    :searchable="false"
    :class="classes"
    @update:model-value="handleModelUpdate"
  >
    <template #singleLabel="{ option: { code, name }}">
      {{ isMinimized ? setFirstLetterToUppercase(code) : name }}
    </template>
  </UiSelect>
</template>

<script lang="ts" setup>
import { SIDEBAR_STATE } from '@/config/constants'

const { locale, locales, setLocale } = useI18n()
const sidebarStore = useSidebarStore()

const BASE_CLASS = 'lang-switcher'

const handleModelUpdate = (value: string) => {
  setLocale(value)
}

const isMinimized = computed(() => {
  return sidebarStore.state === SIDEBAR_STATE.minimized
})

const classes = computed(() => {
  return [
    BASE_CLASS,
    isMinimized.value && `${BASE_CLASS}_is-minimized`
  ]
})
</script>

<style lang="scss" scoped>
$minimized-switcher-width: 45px;

.lang-switcher {
  &_is-minimized {
    ::v-deep(.multiselect__content-wrapper) {
      min-width: 200px;
    }

    ::v-deep(.multiselect__select) {
      display: none;
    }

    ::v-deep(.multiselect__tags) {
      padding: 0;
      display: flex;
      align-items: center;
    }

    ::v-deep(.multiselect__single) {
      padding: 0;
      margin: 0;
      width: $minimized-switcher-width;
      display: flex;
      justify-content: center;
    }
  }
}
</style>
