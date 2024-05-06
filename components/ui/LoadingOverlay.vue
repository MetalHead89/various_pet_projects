<template>
  <ClientOnly>
    <loading
      :width="width"
      :height="height"
      :color="color"
      :opacity="opacity"
      :is-full-page="false"
      v-bind="$attrs"
    />
  </ClientOnly>
</template>

<script lang="ts" setup>
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/css/index.css'

defineOptions({
  inheritAttrs: false
})

export interface Props {
  width?: number,
  height?: number,
  color?: string,
  opacity?: number
}

withDefaults(defineProps<Props>(), {
  width: 200,
  height: 200,
  color: '#6fc5a5',
  opacity: 0.7
})
</script>
