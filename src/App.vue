<template>
  <div class="ryo-app">
    <TopAppBar @refresh="initView"/>
    <div class="content-container">
      <SidePanel :data="fileTreeData" @node-select="onSelectFileTreeNode"/>
      <div class="data-container">
        <div class="data-display-container">
          <InfoPage :info="fileTreeNodeInfo"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {ref} from "vue";

import 'element-plus/theme-chalk/dark/css-vars.css' // For Dark Supporting

import './styles/style-default.scss'
import './styles/color-default.scss'
import './styles/element-patches.scss'
import './styles/material-web-patches.scss'

import TopAppBar from "./views/TopAppBar.vue"
import SidePanel, {TreeParent} from "./views/SidePanel.vue"

// 以后InfoPage交给TabPager管理，TabPager交给AppLogic管理
import InfoPage, {Info} from "./views/InfoPage.vue"
import AlertBuilder from "./utils/AlertBuilder"
import DataManager from "./manager/DataManager"

// 测试数据
const fileTreeData = ref<TreeParent[]>([
  {
    label: 'Contents',
    children: [
      {
        label: 'Sometext',
        type: "对话树",
      },
    ],
  },
  {
    label: 'Main',
    children: [
      {
        label: 'Sometext',
        type: "对话树",
      },
      {
        label: 'Sometext 2',
        type: "对话树",
      },
    ],
  },
  {
    label: 'Emojis',
    children: [
      {
        label: 'Sometext',
        type: "对话树",
      },
    ],
  },
])

// 测试选择
const onSelectFileTreeNode = (p: number, i: number) => {
  // console.log(`${p}-${i}`)
  if (i != -1) fileTreeNodeInfo.value = {
    itemName: fileTreeData.value[p].children![i].label,
    itemType: fileTreeData.value[p].children![i].type
  }
}

// 测试信息
const fileTreeNodeInfo = ref<Info>()

const initView = async () => {
  // 各种还原（配置）状态的操作
  // 由数据Manager负责罢，先检测API版本
  // 拉取数据
  try {
    fileTreeData.value = await DataManager.getInstance().getFileTreeData()
  } catch (e) {
    // alert("未能刷新数据！")
    await new AlertBuilder().setTitle("警告").setMessage(e.toString()).setActiveButton("了解").show()
    console.error("未能刷新数据：" + e)
  }
}

initView()
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
  grid-template-columns: 336px 1fr;
  background-color: var(--ryo-color-surface-container-high);
}

.data-container {
  overflow: auto;
  padding: 24px;

  display: flex;
}

.data-display-container {
  min-width: 400px;
  min-height: 400px;

  display: flex;
  flex-direction: column;
  flex: 1;
}
</style>