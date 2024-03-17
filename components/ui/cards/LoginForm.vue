<template>
  <UiGlassCard class="login-form">
    <div class="card-body">
      <h1 class="title">
        {{ $t('login_form.title') }}
      </h1>

      <div class="enter-name-text">
        {{ $t('login_form.enter_name') }}
      </div>

      <UiInput
        v-model:model-value="name"
        :placeholder="$t('login_form.fields.name')"
      />

      <UiButton
        :is-disabled="isDisabledLogInButton"
        :is-loading="isLoading"
        @click="handleEntryButtonClick"
      >
        {{ $t('login_form.entry') }}
      </UiButton>
    </div>
  </UiGlassCard>
</template>

<script lang="ts" setup>
const userStore = useUserStore()

const name = ref('')
const isLoading = ref(false)
const timer = ref<null | ReturnType<typeof setTimeout>>(null)
const emit = defineEmits(['successful-auth'])

const isDisabledLogInButton = computed(() => {
  return !(name.value || '').trim()
})

const handleEntryButtonClick = () => {
  isLoading.value = true

  timer.value = setTimeout(logIn, 3000)
}

const logIn = () => {
  userStore.setUserName(name.value)
  emit('successful-auth')
  isLoading.value = false
}

onUnmounted(() => {
  if (timer.value) {
    clearTimeout(timer.value)
  }
})
</script>

<style lang="scss" scoped>
.login-form {
  height: 100vh;
  height: 100svh;
  max-height: 100vh;
  width: 100%;
  padding: 15px;
  color: #ffffff;
  border-radius: unset;
  border: unset;
  overflow: auto;

  @media screen and (min-width: $sm) {
    height: unset;
    max-width: 450px;
    padding: 50px;
    border-radius: 16px;
    border: 2px solid #ffffff68;
    box-shadow: 0, 0, 20px 10px #00000026;
  }

  @media screen and (max-height: 400px) {
    height: 100vh;
    height: 100svh;
    border-radius: 0;
  }

  .card-body {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 20px;
  }

  .title {
    margin: 0 0 20px 0;
    text-align: center;
  }

  .enter-name-text {
    text-align: center;
  }

  .input {
    background: #ffffff33;
    outline: 2px solid transparent;
    transition: outline 0.3s;
    color: #ffffff;
    max-width: 350px;

    &::placeholder {
      color: #ffffff99;
    }

    &:focus {
      outline: 2px solid #ffffff68;
    }
  }

  .button {
    width: 100%;
    max-width: 350px;
  }
}
</style>
