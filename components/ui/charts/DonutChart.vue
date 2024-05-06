<template>
  <ClientOnly>
    <VueApexCharts
      :options="options"
      :series="series"
      height="300px"
      class="donut-chart"
    />
  </ClientOnly>
</template>

<script lang="ts" setup>
// @ts-ignore
import VueApexCharts from 'vue3-apexcharts'

const DEFAULT_OPTIONS = reactive({
  chart: {
    id: 'donut-chart',
    type: 'donut',
    toolbar: {
      show: false
    }
  },
  dataLabels: {
    enabled: false
  },
  legend: {
    position: 'bottom'
  },
  fill: {
    type: 'gradient'
  }
})

export interface Props {
  customOptions?: TAnyObject,
  series?: Array<number>
}

const props = withDefaults(defineProps<Props>(), {
  customOptions: () => ({}),
  series: () => []
})

const options = computed(() => {
  return { ...DEFAULT_OPTIONS, ...props.customOptions }
})
</script>

<style lang="scss" scoped>
.donut-chart {
  width: 300px;
}
</style>
