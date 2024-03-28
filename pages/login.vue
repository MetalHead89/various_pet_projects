<template>
  <div class="login-page">
    <Transition name="moving">
      <UiLoginForm
        v-if="isMounted && !isAuthenticated"
        @successful-auth="handleSuccessAuth"
      />
    </Transition>

    <Transition name="moving">
      <UiGlassCard
        v-if="isMounted && isAuthenticated"
        class="greeting"
      >
        {{ $t('login_page.greeting', { name: userStore.name } ) }}
      </UiGlassCard>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { DEFAULT_ROUTE_PATH } from '@/config/constants'

definePageMeta({
  layout: 'empty'
})

const userStore = useUserStore()
const isMounted = ref(false)
const timer = ref<null | ReturnType<typeof setTimeout>>(null)
const isAuthenticated = ref(false)
const router = useRouter()

onMounted(() => {
  nextTick(() => {
    timer.value = setTimeout(() => { isMounted.value = true }, 500)
  })
})

const handleSuccessAuth = () => {
  isAuthenticated.value = true
  timer.value = setTimeout(() => { router.push(DEFAULT_ROUTE_PATH) }, 4000)
}
</script>

<style lang="scss" scoped>
.login-page {
  min-height: 100vh;
  min-height: 100svh;
  overflow-y: hidden;
  background: url('/assets/images/mountains.svg');
  background-position: center;
  background-size: cover;

  .login-form {
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  .greeting {
    height: 100vh;
    height: 100svh;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 0;
    border: 0;
    color: #ffffff;
    font-size: 1.5rem;
    font-weight: 700;
    text-align: center;

    @media screen and (min-width: $sm) {
      position: fixed;
      left: 50%;
      top: 50%;
      height: unset;
      max-width: 450px;
      padding: 50px;
      border-radius: 16px;
      border: 2px solid #ffffff68;
      box-shadow: 0, 0, 20px 10px #00000026;
      transform: translate(-50%, -50%);
    }
  }

  .moving-enter-active {
    transition: all 0.3s 0.5s;
  }

  .moving-leave-active {
    transition: all 0.3s;
  }

  .moving-enter-from {
    opacity: 0;
  }

  .moving-leave-to {
    opacity: 0;
  }

  @media screen and (min-width: $sm) {
    .moving-enter-active,
    .moving-leave-active {
      transition: all 0.9s cubic-bezier(.59,1.68,.48,.88);
    }

    .moving-enter-from {
      transform: translate(-50%, 50vh);
      opacity: 0;
    }

    .moving-leave-to {
      transform: translate(-50%, -70vh);
      opacity: 0;
    }
  }
}
</style>
