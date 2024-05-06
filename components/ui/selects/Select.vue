<template>
  <VueMultiselect
    :model-value="selected"
    v-bind="$attrs"
    :options="options"
    :label="showBy"
    :track-by="trackBy"
    :show-labels="false"
    class="select"
    :multiple="isMultiple"
    @update:model-value="handleSelectInput"
  />
</template>

<script lang="ts" setup>
import VueMultiselect from 'vue-multiselect'

defineOptions({
  inheritAttrs: false
})

export interface Props {
  modelValue: string | string[],
  options: TAnyObject[],
  isMultiple?: boolean,
  trackBy?: string,
  showBy?: string
}

const props = withDefaults(defineProps<Props>(), {
  isMultiple: false,
  trackBy: 'id',
  showBy: 'value'
})

const emit = defineEmits([
  'update:model-value'
])

const selected = computed(() => {
  if (props.isMultiple) {
    return props.options.filter(option => props.modelValue.includes(option[props.trackBy]))
  }

  return props.options.find(option => option[props.trackBy] === props.modelValue)
})

const handleSelectInput = (value: TAnyObject | TAnyObject[]) => {
  if (Array.isArray(value)) {
    emit('update:model-value', value.map(item => item[props.trackBy]) || [])
    return null
  }

  emit('update:model-value', value ? value[props.trackBy] : '')
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.css"></style>
