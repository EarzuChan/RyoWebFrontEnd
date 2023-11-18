<template>
  <h1>Metadata</h1>
  <div class="horizontal-layout">
    <p>Name: {{ props.info.itemName }}</p>
    <p>Type: {{ props.info.itemType }}</p>
  </div>
  <div class="editor-area-card">
    <div class="editor-holder"/>
    <div class="editor-area-action-bar">
      <!--      <IconButton icon="reload" button-style="filled" />-->
      <md-filled-icon-button id="editor-reload-button">
        <md-icon>change_circle</md-icon>
      </md-filled-icon-button>
      <div class="editor-status-text">Status</div>
      <md-filled-button id="editor-save-button" @click="showNotFinishedAlert">Save</md-filled-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
/*import IconButton from "../components/IconButton.vue"*/
import '@material/web/button/filled-button.js'
import '@material/web/icon/icon.js'
import '@material/web/iconbutton/filled-icon-button.js'
import AlertBuilder from "../utils/AlertBuilder"

export interface Info {
  itemName: string
  itemType: string
}

const props = defineProps({
  info: {
    type: Object as () => Info,
    default: {itemName: 'No Name', itemType: 'No Type'}
  }
})

/*const emit =*/ defineEmits(['refresh-data', 'save-data']);

const notFinishedAlert = new AlertBuilder().setTitle("Not Finished").setMessage("As soon as possible!").setNegativeButton("Oops").setActiveButton("Yes Babe!").build();
const showNotFinishedAlert = () => notFinishedAlert.show()
</script>

<style scoped>
h1 {
  font-size: 14px;
  color: white;
  margin-bottom: 8px;
  font-weight: normal;
}

p {
  font-size: 16px;
  color: white;
}

.horizontal-layout {
  display: flex;
}

.horizontal-layout * {
  flex: 1;
}

.editor-area-card {
  border-radius: 12px;
  box-shadow: var(--ryo-elevation-2);

  display: flex;
  flex-direction: column;
  overflow: hidden;
  margin-top: 24px;

  flex: 1;
}

.editor-area-action-bar {
  display: flex;
  height: 40px;
  padding: 16px;
  align-items: center;
  gap: 16px;
  align-self: stretch;

  background-color: var(--ryo-color-surface);
}

.editor-holder {
  background-color: var(--ryo-color-surface-container);

  flex: 1;
}

.editor-status-text {
  color: var(--ryo-color-on-primary-container);
  flex: 1;
}

/*特定按钮颜色*/
#editor-reload-button {
  --md-sys-color-primary: var(--ryo-color-secondary);
  --md-sys-color-on-primary: var(--ryo-color-on-secondary);
}

#editor-save-button {
  --md-sys-color-primary: var(--ryo-color-tertiary);
  --md-sys-color-on-primary: var(--ryo-color-on-tertiary);
}
</style>