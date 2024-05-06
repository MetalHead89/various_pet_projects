<template>
  <UiCard
    :title="$t('dashboard_page.titles.year_data', { year })"
    class="donut-card"
  >
    <div
      v-if="isShowChart"
      class="chart-wrapper"
    >
      <UiDonutChart
        :series="data"
        :custom-options="options"
      />
    </div>
  </UiCard>
</template>

<script setup lang="ts">
import UiDonutChart from '@/components/ui/charts/DonutChart.vue'

const MONTHS_COUNT = 12
const { getShortMonthName } = useData()

export interface Props {
  data: Array<number>
  year: number
}

const props = defineProps<Props>()

const options = computed(() => {
  return {
    plotOptions: {
      pie: {
        donut: {
          size: '70%'
        }
      }
    },
    labels: new Array(MONTHS_COUNT).fill(0).map((_, index) => getShortMonthName(index + 1))
  }
})

const isShowChart = computed(() => {
  return props.data.reduce((acc, current) => acc + current, 0) > 0
})
</script>

<style lang="scss" scoped>
.chart-wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
}
</style>
