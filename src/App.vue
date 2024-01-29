<template>
  <div class="ryo-app">
    <TopAppBar @refresh-file-tree="refreshFileTree"/>
    <div class="content-container">
      <div class="side-panel-container">
        <SidePanelBar/>
        <SidePanel class="side-panel-itself" :data="fileTreeData" @node-select="onSelectFileTreeNode"
                   @node-right-click="onRightClickFileTreeNode"/>
      </div>
      <!--得改下结构，不然无法让没有SidePanel时也圆角-->
      <div class="main-panel-container">
        <InfoPage :info="fileTreeNodeInfo" @super-push="a=>pushDebugInfo(a)"/>
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
import InfoPage, {InfoOldPageModel} from "./views/InfoPage.vue"
import AlertBuilder, {AlertEventType} from "./utils/AlertBuilder"
import DataManager from "./manager/DataManager"
import SidePanelBar from "./views/SidePanelBar.vue";

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
])

// 测试选择
async function onSelectFileTreeNode(p: number, i: number) {
  // console.log(`${p}-${i}`)
  if (i !== -1) {
    let mass = fileTreeData.value[p]
    try {
      fileTreeNodeInfo.value = {
        itemObj: await DataManager.getInstance().getItemData(mass.label, mass.children![i].label),
        itemName: mass.children![i].label,
        fileName: mass.label,
      }
    } catch (e: any) {
      await new AlertBuilder().setTitle("Error").setMessage(e.toString()).setActiveButton("Got It").show()
    }
  }
}

async function onRightClickFileTreeNode(p: number, i: number, _: any) {
  if (i === -1) {
    let mass = fileTreeData.value[p].label
    console.log("右击：" + mass)

    let op = await new AlertBuilder().setTitle(mass).setMessage("Options").setActiveButton("Save To File").setNegativeButton("Close This File").show()
    let opr = op.toString()

    if (opr === "Positive") {
      await DataManager.getInstance().saveFile(mass)
    } else if (opr === "Negative") {
      await DataManager.getInstance().closeFile(mass)
      await refreshFileTree()
    }

    console.log("操作完成：" + mass)
  }
}

// TODO:总有一天不要这个，太丑了
function pushDebugInfo(data: string) {
  try {
    console.log("父级：解析数据")
    fileTreeNodeInfo.value = {itemObj: JSON.parse(data), itemName: "Super Push Debug", fileName: "Super Push File"}
  } catch (e: any) {
    console.log("父级：解析数据失败")
    console.log(e.message)
  }
}

// 测试信息
const fileTreeNodeInfo = ref<InfoOldPageModel>()

async function initView() {
  // 各种还原（配置）状态的操作
  // 由数据Manager负责罢，先检测API版本
  // 拉取数据

  await new AlertBuilder().setTitle("Notice").setMessage("Early Trial Version").setActiveButton("Got It").show()

  await refreshFileTree()
}

async function refreshFileTree() {
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

  background-color: var(--ryo-color-surface);
}

.content-container {
  overflow: hidden;
  display: flex;
  flex-direction: row;
  flex: 1;
}

.side-panel-itself {
  border-radius: 12px 0 0 0;
}

.side-panel-container {
  width: 336px;
  display: flex;

  overflow: hidden;
}

.main-panel-container {
  overflow: auto;
  padding: 24px;

  flex: 1;

  background-color: var(--ryo-color-surface-container-high);
}
</style>