<template>
  <div class="top-app-bar">
    <div class="menu-bar">
      <md-text-button class="menu-bar-button" id="file" @click="openFileMenu">文件</md-text-button>
      <md-menu id="usage-menu" anchor="file" ref="fileMenu">
        <md-menu-item id="new">
          <div slot="headline">新建</div>
        </md-menu-item>
        <md-menu-item id="open" @click="clickOpen">
          <div slot="headline">打开</div>
        </md-menu-item>
        <md-menu-item id="exit">
          <div slot="headline">退出</div>
        </md-menu-item>
      </md-menu>
    </div>
  </div>
</template>

<script lang="ts" setup>
import '@material/web/button/text-button.js'
import '@material/web/menu/menu.js'
import '@material/web/menu/menu-item.js'
import {ref} from "vue";

const fileMenu = ref<any>()

const openFileMenu = () => {
  fileMenu.value.open = !fileMenu.value.open;
}

const clickOpen = () => {

}
</script>

<style scoped>
.top-app-bar {
  display: flex;
  height: 48px;
  background-color: var(--ryo-color-surface);
}

.menu-bar {
  display: flex;
  align-items: center;
  row-gap: 8px;
}

.menu-bar-button {
  align-items: center;
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