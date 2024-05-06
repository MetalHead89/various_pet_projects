<template>
  <input
    v-bind="$attrs"
    type="text"
    class="input"
    @input="handleTextInput"
  />
</template>

<script lang="ts" setup>
defineOptions({
  inheritAttrs: false
})

export interface Props {
  modelValue: string
}

defineProps<Props>()

const emit = defineEmits(['update:model-value'])

const handleTextInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:model-value', target.value)
}
</script>

<style lang="scss" scoped>
.input {
  border: none;
  border-radius: $control-radius;
  padding: 10px 20px;
  width: 100%;
  box-sizing: border-box;
  font-weight: 500;
}
</style>
