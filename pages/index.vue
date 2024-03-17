<template>
  <div class="main-page">
    <button @click="handleLogOutClick">выход</button>
  </div>
</template>

<script lang="ts" setup>
const userStore = useUserStore()
const router = useRouter()

const handleLogOutClick = () => {
  userStore.setUserName(null)
  router.push({ name: 'login' })
}
</script>
