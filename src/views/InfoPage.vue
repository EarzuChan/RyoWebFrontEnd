<template>
  <div class="info-page">
    <h1>Metadata</h1>
    <div class="horizontal-layout">
      <!--更多信息-->
      <p>Name: {{ prop.info.itemName }}</p>
      <p>Type: Unsupported</p>
    </div>
    <EditorHolder class="element-margin" v-model="editorData" v-if="canShowEditor">
      <div class="editor-area-action-bar">
        <!--<IconButton icon="reload" button-style="filled" />-->
        <md-filled-icon-button id="editor-reload-button" @click="showNotFinishedAlert">
          <md-icon>change_circle</md-icon>
        </md-filled-icon-button>
        <div class="editor-status-text">{{
            isUnsaved === true ? "Unsaved" : /*Well*/"Unsaved Checker Unavailable"
          }}
        </div>
        <md-filled-button id="editor-save-button" @click="checkStatus"><!--Save-->Check Status</md-filled-button>
      </div>
    </EditorHolder>
    <div class="debug-panel element-margin" v-if="allowPageDebug">
      <md-filled-text-field class="debug-field" ref="debugField" label="Json Data"
                            type="textarea" rows="12"
                            :value="debugFieldData"></md-filled-text-field>
      <div class="debug-button-panel">
        <md-filled-button @click="allowPageDebug=false">Hide</md-filled-button>
        <md-filled-button class="element-margin" @click="applyDebugData">Apply</md-filled-button>
      </div>
    </div>
    <StringEditor class="element-margin" v-model="edi"/>
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
import FieldEditor from "../components/editors/FieldEditor.vue";
import {nextTick, reactive, ref, shallowRef/*, toRef, watch*/} from "vue"
import EditorHolder from "../components/EditorHolder.vue"
import StringEditor from "../components/editors/StringEditor.vue"
import {sleepFor} from "../utils/UsefulUtils"

export interface Info {
  itemName: string,
  itemObj: any,
}

// 传入参数
// TODO:改成页面主动请求信息
const prop = defineProps({
  info: {
    type: Object as () => Info,
    default: {itemName: 'No Name', itemObj: {item: 'empty'}}
  }
})

// 便捷方法
const info = (info: String) => console.log("信息页：" + info)

// 事件
defineEmits(['refresh-data', 'save-data']);

// 基本数据
const allowPageDebug = ref(true)
const editorData = shallowRef(prop.info?.itemObj)
const canShowEditor = ref(true)
const pushEditorData = async (data: String) => {
  info("推送数据")
  try {
    canShowEditor.value = false
    editorData.value = JSON.parse(data)

    await nextTick()
    canShowEditor.value = true
  } catch (e: Error) {
    info("推送数据失败")
    console.log(e.message)
  }
}

const notFinishedAlert = new AlertBuilder().setTitle("Not Finished").setMessage("As soon as possible!").setNegativeButton("Oops").setActiveButton("Yes Babe!").build();
const showNotFinishedAlert = () => notFinishedAlert.show()

const checkStatus = async () => {
  info("当前数据")
  console.log(editorData.value)

  await sleepFor(500)

  info("等待一会后")
  console.log(editorData.value)
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
const debugFieldData = ref("")
const debugField = ref<any>(null)
const applyDebugData = () => {
  info("应用数据：")
  debugFieldData.value = debugField.value.value

  pushEditorData(debugFieldData.value)
}

const edi = ref('文本框')
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