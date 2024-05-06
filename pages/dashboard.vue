<template>
  <div class="dashboard">
    <div class="line-chart-wrapper">
      <FeatureAllDataCard
        :data="allYearsData"
        :years="allYears"
      />
    </div>

    <div class="line-chart-wrapper">
      <FeatureCurrentMonthDataCard
        :data="currentMonthData"
        :years="allYears"
      />
    </div>

    <FeatureDonuts
      :data="allYearsData"
      :years="allYears"
    />
  </div>
</template>

<script lang="ts" setup>
import { DateTime } from 'luxon'

import FeatureAllDataCard from '@/components/features/dashboard/AllDataCard.vue'
import FeatureCurrentMonthDataCard from '@/components/features/dashboard/CurrentMonthDataCard.vue'
import FeatureDonuts from '@/components/features/dashboard/Donuts.vue'

const { $api } = useNuxtApp()

const dashboardData = ref<TDashboardData>([])
const allYearsData = ref<TDashboardChartData>([])
const currentMonthData = ref<TDashboardChartData>([])

const { setIsLoading } = usePageLoadingOverlay()

const allYears = computed(() => {
  if (!dashboardData.value.length) {
    return []
  }

  const years = []
  const minYear = Number(dashboardData.value[0].date.slice(0, 4))

  for(let year = minYear; year <= DateTime.now().year; year++) {
    years.push(year)
  }

  return years
})

onMounted(() => {
  setIsLoading(true)

  $api.dashboard.get()
    .then(data => {
      dashboardData.value = data
      setChartsData()
    })
    .finally(() => { setIsLoading(false) })
})

const setChartsData = () => {
  allYearsData.value = allYears.value.reduce((acc, year) => {
    return { ...acc, [year]: new Array(12).fill(0) }
  }, {})

  currentMonthData.value = allYears.value.reduce((acc, year) => {
    return { ...acc, [year]: new Array(DateTime.now().daysInMonth).fill(0) }
  }, {})

  dashboardData.value.forEach(record => {
    const [year, month, day] = record.date.split('-')

    allYearsData.value[Number(year)][Number(month) - 1] += record.value

    if (Number(month) === DateTime.now().month) {
      currentMonthData.value[Number(year)][Number(day) - 1] += record.value
    }
  })
}
</script>

<style lang="scss" scoped>
.dashboard {
  @include page();

  display: flex;
  flex-wrap: wrap;
  gap: 10px;

  .line-charts-wrapper {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }

  .line-chart-wrapper {
    width: 100%;

    @media screen and (min-width: $lg) {
      width: calc(100% / 2 - 10px / 2);
      height: 100%;
    }
  }

  .card {
    min-height: 400px;
  }

  .donuts {
    width: 100%;
  }
}
</style>
