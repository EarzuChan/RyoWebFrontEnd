<template>
  <div class="field-editor">
    <div v-for="(item,index) in keys" class="field-list-item" :class="{ 'even': isEven(index) }">
      <div class="item-name">{{ item }}</div>
      <div class="item-value-holder" :class="{ 'even': isEven(index) }">
        <EditorHolder with-margin v-model="modelValue[item]"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
// TODO:撤回重做：栈式操作

import TextEditor from "./StringEditor.vue";
import EditorHolder from "../EditorHolder.vue";

const prop = defineProps(['modelValue'])
defineEmits(['update:modelValue'])

// const reffedEditorData = ref(props.modelValue)

console.log("编辑器：组件加载")
const keys = Object.keys(prop.modelValue)

/*const keys = ref()
watch(
    reffedEditorData,
    (newValue) => {
      console.log("编辑器：更新源数据")
      console.log(newValue)

      keys.value = Object.keys(newValue)
    },
    {immediate: true}
)*/

const isEven = (index: number) => index % 2 != 0
</script>

<style scoped>
.field-editor {
  display: flex;
  flex-direction: column;
}

.field-list-item {
  min-height: 32px;
  color: white;
  font-size: 14px;
  display: flex;

  background-color: var(--ryo-color-surface-container-high);
}

.field-list-item.even {
  background-color: var(--ryo-color-surface-container-highest);
}

.item-name {
  min-width: 188px;
  padding-left: 12px;
  padding-top: 6px;
  padding-bottom: 6px;

  font-size: 14px;
  color: white;
}

.item-value-holder {
  flex: 1;
  background-color: var(--ryo-color-surface-container-highest);
  /*padding-left: 12px;*/

  display: flex;
  /*align-items: center;*/
}

/*.sub-editor-card {
  border-radius: 12px;
  box-shadow: var(--ryo-elevation-2);

  margin: 6px;

  overflow: hidden;
}*/

.item-value-holder.even {
  background-color: var(--ryo-color-surface-container-high);
}

.full-flex {
  flex: 1;
}
</style>