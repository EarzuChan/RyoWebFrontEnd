<template>
  <div class="top-app-bar">
    <div class="title-bar"></div>
    <div class="menu-bar"></div>
  </div>
</template>

<script lang="ts" setup>
</script>

<style scoped>
.top-app-bar {
  display: flex;
  flex-direction: column;
  background-color: var(--ryo-surface);
}

.title-bar {
  height: 64px;
  padding: 0 16px;
}

.menu-bar {
  height: 32px;
  padding: 0 8px 8px;
}
</style>