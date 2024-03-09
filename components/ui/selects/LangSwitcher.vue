<template>
  <UiSelect
    :model-value="locale"
    :options="locales"
    track-by="code"
    show-by="name"
    @update:model-value="handleModelUpdate"
  />

  {{ locale }}
</template>

<script lang="ts" setup>
const { locale, locales, setLocale } = useI18n()

const handleModelUpdate = (value: string) => {
  setLocale(value)
}
</script>
