<template>
  <button
    v-wave="!isDisabled && !isLoading"
    v-bind="$attrs"
    :type="type"
    :class="classes"
    :disabled="isDisabled || isLoading"
  >
    <UiSpinner v-if="isLoading" />

    <span class="text">
      <slot />
    </span>
  </button>
</template>

<script lang="ts" setup>
const BASE_CLASS = 'button'

defineOptions({
  inheritAttrs: false
})

export interface Props {
  type?: 'submit' | 'button',
  isDisabled?: boolean,
  isLoading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  type: 'button',
  isDisabled: false,
  isLoading: false
})

const classes = computed(() => {
  return [
    BASE_CLASS,
    props.isLoading && `${BASE_CLASS}_is-loading`
  ]
})
</script>

<style lang="scss" scoped>
.button {
  position: relative;
  display: flex;
  justify-content: center;
  background: $primary;
  border-radius: $base-radius;
  padding: 10px 20px;
  border: none;
  color: #ffffff;
  cursor: pointer;
  font-weight: 500;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.7;
  }

  &:not(:disabled):hover {
    background: darken($primary, 5%);
  }

  &_is-loading {
    .text {
      visibility: hidden;
    }
  }

  .spinner {
    position: absolute;
    height: 80%;
    top: 10%;
  }
}
</style>
