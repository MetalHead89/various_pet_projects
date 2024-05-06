<template>
  <UiCard
    :title="title"
    class="current-month-data-card"
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
import { DateTime } from 'luxon'

import UiLineChart from '@/components/ui/charts/LineChart.vue'

const { getFullMonthName } = useData()
const { t } = useI18n()

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
      categories: new Array(DateTime.now().daysInMonth).reduce((acc, _, index) => [...acc, index + 1], [])
    }
  }
})

const title = computed(() => {
  return t('dashboard_page.titles.current_month_data', { month: getFullMonthName(DateTime.now().month) })
})
</script>

<style lang="scss" scoped>
.current-month-data-card {
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
