<template>
  <div class="top-app-bar">
    <IconButton icon="ryo" id="logo" :size="48"/>
    <div class="menu-bar" @mousedown.self.left="dragWindow" @mouseup.self.left="dragWindowOver">
      <TextButton :padding-horizontal="8" :padding-vertical="6" class="menu-bar-button" id="file" @click="openFileMenu">
        File
      </TextButton>
      <TextButton :padding-horizontal="8" :padding-vertical="6" class="menu-bar-button" id="file">
        Edit
      </TextButton>
      <TextButton :padding-horizontal="8" :padding-vertical="6" class="menu-bar-button" id="file">
        View
      </TextButton>
      <TextButton :padding-horizontal="8" :padding-vertical="6" class="menu-bar-button" id="file">
        Help
      </TextButton>
      <md-menu id="usage-menu" anchor="file" ref="fileMenu">
        <md-menu-item id="new" @click="clickNew">
          <div slot="headline">New</div>
        </md-menu-item>
        <md-menu-item id="open" @click="clickOpen">
          <div slot="headline">Open</div>
        </md-menu-item>
        <md-menu-item id="exit" @click="exitApp">
          <div slot="headline">Exit</div>
        </md-menu-item>
      </md-menu>
    </div>
    <IconButton icon="minimize" @click="minimize" :size="48"/>
    <IconButton :icon="(isRestored?'fullscreen':'restore')" @click="switchWindowState" :size="48"/>
    <IconButton icon="close" :size="48" @click="exitApp"/>
  </div>
</template>

<script lang="ts" setup>
import '@material/web/button/text-button.js'
import '@material/web/menu/menu.js'
import '@material/web/menu/menu-item.js'
import {ref} from "vue";
import DataManager from "../manager/DataManager"
import AlertBuilder from "../utils/AlertBuilder"
import TextButton from "../components/TextButton.vue";
import IconButton from "../components/IconButton.vue";

const emit = defineEmits(['refresh-file-tree'])

const isRestored = ref(true)

const fileMenu = ref<any>()

const openFileMenu = () => {
  fileMenu.value.open = !fileMenu.value.open;
}

async function exitApp() {
  try {
    await DataManager.getInstance().exitApp()
  } catch (e: any) {
    await new AlertBuilder().setTitle("Warning").setMessage(e.toString()).setActiveButton("Got It").show()
  }
}

async function clickOpen() {
  try {
    await DataManager.getInstance().openFile()
    emit("refresh-file-tree")
  } catch (e: any) {
    await new AlertBuilder().setTitle("Warning").setMessage(e.toString()).setActiveButton("Got It").show()
  }
}

async function clickNew() {
  try {
    await DataManager.getInstance().newFile()
    emit("refresh-file-tree")
  } catch (e: any) {
    await new AlertBuilder().setTitle("Warning").setMessage(e.toString()).setActiveButton("Got It").show()
  }
}

async function dragWindow() {
  try {
    console.log("非常好移动")
    await DataManager.getInstance().dragWindow()
  } catch (e: any) {
    await new AlertBuilder().setTitle("Warning").setMessage(e.toString()).setActiveButton("Got It").show()
  }
}

async function dragWindowOver() {
  try {
    console.log("非常不好移动")
    await DataManager.getInstance().dragWindowOver()
  } catch (e: any) {
    await new AlertBuilder().setTitle("Warning").setMessage(e.toString()).setActiveButton("Got It").show()
  }
}

async function minimize() {
  try {
    await DataManager.getInstance().minimizeWindow()
  } catch (e: any) {
    await new AlertBuilder().setTitle("Warning").setMessage(e.toString()).setActiveButton("Got It").show()
  }
}

async function maximize() {
  try {
    await DataManager.getInstance().maximizeWindow()
  } catch (e: any) {
    await new AlertBuilder().setTitle("Warning").setMessage(e.toString()).setActiveButton("Got It").show()
  }
}

async function switchWindowState() {
  if (isRestored.value) {
    await maximize()
  } else {
    await restore()
  }
  isRestored.value = !isRestored.value
}


async function restore() {
  try {
    await DataManager.getInstance().restoreWindow()
  } catch (e: any) {
    await new AlertBuilder().setTitle("Warning").setMessage(e.toString()).setActiveButton("Got It").show()
  }
}
</script>

<style scoped>
.top-app-bar {
  display: flex;
  height: 48px;
}

.menu-bar {
  display: flex;
  align-items: center;
  gap: 8px;

  flex: 1;
}

.menu-bar-button {
  --ryo-color-on-surface-variant: var(--ryo-color-primary);
}

/*FIXME: 按钮和菜单样式*/
/*选择不上阴影元素 可能得自己实现按钮 {
  height: 32px;
  padding-left: 8px;
  padding-right: 8px;
  min-inline-size: 0;

  background-color: red;
}*/
</style>