<template>
  <div class="ryo-app">
    <TopAppBar/>
    <div class="content-container">
      <SidePanel/>
      <div class="data-container">
        <div class="data-display-container">
          <InfoPage :info="info"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {ref} from "vue";

import 'element-plus/theme-chalk/dark/css-vars.css' // For Dark Supporting

import './styles/color-default.css'
import './styles/style-default.css'
import './styles/element-patches.css'

import TopAppBar from "./components/TopAppBar.vue"
import SidePanel from "./components/SidePanel.vue";
import InfoPage from "./components/InfoPage.vue";

const info=ref()
</script>

<style scoped>
.ryo-app {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.content-container {
  overflow: hidden;
  display: grid;
  flex: 1;
  grid-template-columns: 384px 1fr;
  background-color: var(--ryo-color-surface-container-high);
}

.data-container {
  overflow: auto;
  padding: 24px;
}

.data-display-container {
  min-width: 400px;
}
</style>