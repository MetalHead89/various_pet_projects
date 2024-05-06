<template>
  <ClientOnly>
    <VueApexCharts
      :options="options"
      :series="series"
      width="100%"
      height="300px"
    />
  </ClientOnly>
</template>

<script lang="ts" setup>
// @ts-ignore
import VueApexCharts from 'vue3-apexcharts'

const DEFAULT_OPTIONS = {
  chart: {
    id: 'line-chart',
    type: 'area',
    toolbar: {
      show: false
    },
    zoom: {
      enabled: false
    }
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    curve: 'straight',
    width: 1
  },
  fill: {
    gradient: {
      enabled: true,
      opacityFrom: 0.7,
      opacityTo: 0,
      stops: [0, 90, 100]
    }
  },
  markers: {
    size: 4,
    strokeColor: '#ffffff',
    strokeWidth: 1,
    hover: {
      size: 4
    }
  }
}

export interface Props {
  customOptions?: TAnyObject,
  series?: TAnyObject[]
}

const props = withDefaults(defineProps<Props>(), {
  customOptions: () => ({}),
  series: () => []
})

const options = computed(() => {
  return { ...DEFAULT_OPTIONS, ...props.customOptions }
})
</script>
