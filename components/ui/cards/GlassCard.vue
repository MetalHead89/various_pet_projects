<template>
  <div class="glass-card">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.glass-card {
  box-sizing: border-box;
  background: #40404026;
  backdrop-filter: blur(25px);
  padding: 50px;
  border-radius: 16px;
  border: 2px solid #ffffff68;
  box-shadow: 0, 0, 20px 10px #00000026;
}
</style>
