<template>
  <div class="donuts">
    <FeatureDonutCard
      v-for="year in years"
      :key="year"
      :year="year"
      :data="data[year]"
    />
  </div>
</template>

<script setup lang="ts">
import FeatureDonutCard from './DonutCard.vue'

export interface Props {
  data?: TDashboardChartData
  years?: Array<number>
}

withDefaults(defineProps<Props>(), {
  data: () => ({}),
  years: () => []
})
</script>

<style lang="scss" scoped>
.donuts {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;

  .donut-card {
    flex-grow: 1;
  }
}
</style>
