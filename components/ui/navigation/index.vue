<template>
  <nav class="navigation">
    <div
      v-for="(group, groupIndex) in navigation"
      :key="groupIndex"
      class="navigation-group"
    >
      <NavigationItem
        v-for="(item, itemIndex) in group"
        :key="itemIndex"
        :item="item"
      />
    </div>
  </nav>
</template>

<script lang="ts" setup>
import NavigationItem from './NavigationItem.vue'

const { t } = useI18n()

const navigation = computed(() => {
  return [
    [
      {
        icon: 'ic-line-chart',
        label: t('sidebar.top_section.navigation.dashboard'),
        link: { name: 'dashboard' }
      }
    ],
    [
      {
        icon: 'ic-logout',
        label: t('sidebar.top_section.navigation.logout'),
        component: 'button',
        action: () => { console.dir('!!!!') }
      }
    ]
  ]
})
</script>

<style lang="scss" scoped>
  .navigation {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
</style>
