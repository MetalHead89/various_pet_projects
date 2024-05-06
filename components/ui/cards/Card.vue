<template>
  <div class="card">
    <h2
      v-if="title"
      class="title"
    >
      {{ title }}
    </h2>

    <div class="body">
      <slot>
        <div class="no-data">
          Нет данных
        </div>
      </slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
export interface Props {
  title?: string
}

withDefaults(defineProps<Props>(), {
  title: ''
})
</script>

<style lang="scss" scoped>
.card {
  display: flex;
  flex-direction: column;
  padding: 10px;
  background: #ffffff;
  border-radius: $base-radius;

  .title {
    text-align: center;
  }

  .body {
    width: 100%;
    flex-grow: 1;
    display: flex;
  }

  .no-data {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: $muted;
  }
}
</style>
