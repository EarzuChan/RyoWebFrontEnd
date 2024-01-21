<template>
  <div class="side-panel-bar">
    <div class="panel-buttons">
      <IconButton :size="36" id="tree-view-button" icon="list_filled" button-style="filled"/>
    </div>
    <IconButton :size="48" icon="panel_narrow"/>
  </div>
</template>

<script setup lang="ts">

import IconButton from "../components/IconButton.vue";
</script>

<style scoped>
.side-panel-bar {
  flex-direction: column;
  width: 48px;
  display: flex;
  background-color: var(--ryo-color-surface);
}

.panel-buttons {
  align-items: center;
  flex: 1;
  flex-direction: column;
  display: flex;
  gap: 16px;
}

#tree-view-button {
--ryo-color-on-primary: var(--ryo-color-on-secondary-container);
--ryo-color-primary: var(--ryo-color-secondary-container  );
}
</style>