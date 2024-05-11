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
  >
    <template
      v-for="slotName in Object.keys($slots)"
      #[slotName]="slotScope"
    >
      <slot
        :name="slotName"
        v-bind="slotScope"
      />
    </template>
  </VueMultiselect>
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

<style lang="scss">
@import 'vue-multiselect/dist/vue-multiselect.css';

.select {
  .multiselect {
    &__content-wrapper {
      display: block !important;
      visibility: hidden;
      opacity: 0;
      transition: all 0.3s ease;
      margin: 50px 0;
      border: 1px solid $field-border-color;
      border-radius: $base-control-radius;
    }

    &__tags {
      border: 1px solid $field-border-color;
      border-radius: $base-control-radius;
    }

    &__single {
      cursor: pointer;
    }

    &__option--selected {
      &.multiselect__option--highlight {
        background: #f3f3f3;
        color: #35495e;
      }
    }
  }

  &.multiselect--active {
    .multiselect {
      &__content-wrapper {
        visibility: visible;
        opacity: 1;
        margin: 5px 0;
      }

      &__tags {
        border-radius: $base-control-radius;
      }
    }
  }
}
</style>
