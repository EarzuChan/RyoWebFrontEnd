<template>
  <div class="ryo-app">
    <TopAppBar @refresh-file-tree="refreshFileTree"/>
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
        label: 'Sometext'
      },
    ],
  },
  {
    label: 'Main',
    children: [
      {
        label: 'Sometext'
      },
      {
        label: 'Sometext 2'
      },
    ],
  },
  {
    label: 'Emojis',
    children: [
      {
        label: 'Sometext'
      },
    ],
  },
  {
    label: 'New File',
  },
])

// 测试选择
const onSelectFileTreeNode = async (p: number, i: number) => {
  // console.log(`${p}-${i}`)
  if (i != -1) {
    let mass = fileTreeData.value[p]
    try {
      fileTreeNodeInfo.value = {
        itemObj: await DataManager.getInstance().getItemData(mass.label, mass.children![i].label),
        itemName: mass.children![i].label,
      }
    } catch (e: any) {
      await new AlertBuilder().setTitle("Error").setMessage(e.toString()).setActiveButton("Got It").show()
    }
  }
}

// 测试信息
const fileTreeNodeInfo = ref<Info>()

const initView = async () => {
  // 各种还原（配置）状态的操作
  // 由数据Manager负责罢，先检测API版本
  // 拉取数据

  await new AlertBuilder().setTitle("Notice").setMessage("Early Trial Version").setActiveButton("Got It").show()

  await refreshFileTree()
}

const refreshFileTree = async () => {
  try {
    fileTreeData.value = await DataManager.getInstance().getFileTreeData()
  } catch (e: any) {
    // alert("未能刷新数据！")
    await new AlertBuilder().setTitle("Warning").setMessage(e.toString()).setActiveButton("Got It").show()
    console.error("Couldn't refresh the File Tree Data: " + e)
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