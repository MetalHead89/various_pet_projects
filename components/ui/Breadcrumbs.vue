<template>
  <div class="breadcrumbs">
    <div
      v-for="(item, index) in breadcrumbsStore.breadcrumbs"
      :key="index"
      class="item"
    >
      <NuxtLink
        v-if="item.routeName"
        class="link"
        :to="{ name: item.routeName }"
      >
        {{ item.label }}
      </NuxtLink>

      <span
        v-else
        class="label"
      >
        {{ item.label }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
const breadcrumbsStore = useBreadcrumbsStore()
</script>

<style lang="scss" scoped>
.breadcrumbs {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  font-size: 13px;

  .link {
    color: $text-color;
    font-weight: 600;
  }

  & > *:not(:last-child)::after {
    display: inline-block;
    content: '';
    width: 5px;
    height: 5px;
    background: $text-color;
    border-radius: 50%;
    margin-left: 8px;
  }

  .item {
    display: flex;
    align-items: center;
  }

  @media screen and (min-width: $sm) {
    font-size: 1rem;

    & > *:not(:last-child)::after {
      width: 8px;
      height: 8px;
    }
  }
}
</style>
