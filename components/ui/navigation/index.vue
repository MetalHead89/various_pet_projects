<template>
  <nav>
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
import type { TNavigationItem } from './NavigationItem.vue'

const { t } = useI18n()

const navigation: TNavigationItem[][] = [
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
</script>
