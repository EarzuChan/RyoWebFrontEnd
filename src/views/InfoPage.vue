<template>
  <div class="info-page">
    <h1>Metadata</h1>
    <div class="horizontal-layout">
      <!--TODO:更多信息-->
      <p>Name: {{ prop.info.itemName }}</p>
      <p>Type: Unsupported</p>
    </div>
    <EditorHolder class="element-margin" useCard v-model="editorData" v-if="canShowEditor">
      <div class="editor-area-action-bar">
        <!--我的IconButton:<IconButton icon="reload" button-style="filled" />-->
        <md-filled-icon-button id="editor-reload-button" @click="showNotFinishedAlert">
          <md-icon>change_circle</md-icon>
        </md-filled-icon-button>
        <div class="editor-status-text">{{
            isUnsaved === true ? "Unsaved" : /*Well*/"Unsaved Checker Unavailable"
          }}
        </div>
        <md-filled-button id="editor-save-button" @click="testSave">Save</md-filled-button>
      </div>
    </EditorHolder>
    <div class="debug-panel element-margin" v-if="allowPageDebug">
      <md-filled-text-field class="debug-field" ref="debugField" label="Json Data"
                            type="textarea" rows="12"
                            :value="debugFieldData"></md-filled-text-field>
      <div class="debug-button-panel">
        <md-filled-button @click="allowPageDebug=false">Hide</md-filled-button>
        <md-filled-button class="element-margin" @click="applyDebugData">Apply</md-filled-button>
        <md-filled-button class="element-margin" @click="superApplyDebugData">Super</md-filled-button>
      </div>
    </div>
    <!--<StringEditor class="element-margin" v-model="edi"/>-->
    <!--<StringEditor v-model="edi"/>
    <div>{{edi}}</div>-->
  </div>
</template>

<script lang="ts" setup>
/*import IconButton from "../components/IconButton.vue"*/
import '@material/web/button/filled-button.js'
import '@material/web/icon/icon.js'
import '@material/web/textfield/filled-text-field.js'
import '@material/web/iconbutton/filled-icon-button.js'
import AlertBuilder from "../utils/AlertBuilder"
import {nextTick, onMounted, ref, toRef, watch} from "vue"
import EditorHolder from "../components/EditorHolder.vue"
import DataManager from "../manager/DataManager";

export interface InfoOldPageModel {
  itemName: string,
  fileName: string,
  itemObj: any,
}

// 传入参数
// TODO:改成页面主动请求信息，下次重做之
const prop = defineProps({
  info: {
    type: Object as () => InfoOldPageModel,
    default: {itemName: 'No Name', fileName: 'No File', itemObj: {item: 'empty'}}
  }
})
// TODO:虽然说以后有状态管理器，先凑合着用吧
onMounted(() => watch(() => prop.info, (newValue) => {
  info("推送Prop新资源")
  pushEditorData(newValue.itemObj)
}, {immediate: true}))

// 便捷方法
const info = (info: String) => console.log("信息页：" + info)

// 事件
const emit = defineEmits(['refresh-data', 'save-data', 'super-push']);

// 基本数据
const allowPageDebug = ref(true)
const editorData = ref({})
const canShowEditor = ref(true)

/*async*/
function pushEditorData(data: any) {
  info("编辑器推送数据")
  try {
    // canShowEditor.value = false
    editorData.value = data

    /*await nextTick()
    canShowEditor.value = true*/
  } catch (e: any) {
    info("编辑器推送数据失败")
    console.log(e.message)
  }
}

const notFinishedAlert = new AlertBuilder().setTitle("Not Finished").setMessage("As soon as possible!").setNegativeButton("Oops").setActiveButton("Yes Babe!").build();
const showNotFinishedAlert = () => notFinishedAlert.show()

function checkStatus() {
  info("当前数据")
  console.log(editorData.value)
}

function testSave() {
  checkStatus()
  DataManager.getInstance().setItemData(prop.info?.fileName, prop.info?.itemName, editorData.value)
}

// TODO:追踪是否有未保存的更改
const isUnsaved = ref(false)
/*watch(editorData,
    (newValue) => {
      console.log("Editing: ")
      console.log(newValue)
      // 判断是否有未保存的更改
      isUnsaved.value = newValue != props.info!.itemObj
    }
)*/

// 调试相关
const debugFieldData = ref("[\"太美丽\",\"只有为你感激\"]")
const debugField = ref<any>(null)

function applyDebugData() {
  info("应用数据：")
  debugFieldData.value = debugField.value.value

  parseAndPushData(debugFieldData.value)
}

function superApplyDebugData() {
  info("父级数据：")
  debugFieldData.value = debugField.value.value

  emit('super-push', debugFieldData.value)
}

async function parseAndPushData(data: string) {
  try {
    info("解析数据")
    /*await*/
    pushEditorData(JSON.parse(data))
  } catch (e: any) {
    info("解析数据失败")
    console.log(e.message)
  }
}
</script>

<style scoped>
.info-page {
  display: flex;
  flex-direction: column;

  min-height: 100%;
}

h1 {
  font-size: 14px;
  color: white;
  margin-bottom: 8px;
  font-weight: normal;
}

p {
  font-size: 16px;
  color: white;

  margin: 0;
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

  flex: 1 /*1 200px*/;
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

/*.editor-holder {
  background-color: var(--ryo-color-surface-container);

  !*padding: 12px;*!
  font-size: 14px;
  color: white;

  flex: 1;
}*/

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

.debug-panel {
  display: flex;
  flex-direction: row;

  align-items: center;
}

.debug-button-panel {
  display: flex;
  flex-direction: column;

  align-items: center;
}

.element-margin {
  margin-top: 24px;
}

.debug-field {
  flex: 1;
  margin-right: 16px;
}
</style>