<template>
  <UiCard
    :title="$t('dashboard_page.titles.some_data')"
    class="all-data-card"
  >
    <div
      v-if="series.length > 0"
      class="chart-wrapper"
    >
      <UiLineChart
        :series="series"
        :custom-options="options"
      />
    </div>
  </UiCard>
</template>

<script setup lang="ts">
import UiLineChart from '@/components/ui/charts/LineChart.vue'

const { getShortMonthName } = useData()

const MONTHS_COUNT = 12

export interface Props {
  data?: TDashboardChartData
  years?: Array<number>
}

const props = withDefaults(defineProps<Props>(), {
  data: () => ({}),
  years: () => []
})

const series = computed(() => {
  return props.years.map(year => ({
    name: year,
    data: props.data[year]
  }))
})

const options = computed(() => {
  return {
    xaxis: {
      categories: new Array(MONTHS_COUNT)
        .fill(0)
        .map((_, index) => getShortMonthName(index + 1))
    }
  }
})
</script>

<style lang="scss" scoped>
.all-data-card {
  .chart-wrapper {
    width: 100%;
    display: flex;
    align-items: flex-end;
    overflow: hidden;
    overflow-x: auto;
  }

  ::v-deep(.vue-apexcharts) {
    width: 100%;
    min-width: 600px;
  }
}
</style>
