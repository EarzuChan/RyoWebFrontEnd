<template>
  <!--TODO:添加、文本框宽度最窄、文本框清空按钮状态修复、右键删除、文本框文字选取-->
  <div class="array-holder array-editor">
    <draggable class="array-holder"
               :modelValue="modelValue"
               @update:model-value="a=>updateData(a)"
               @start="drag=true"
               :animation="200"
               @end="drag=false">
      <template #item="{ element,index }">
        <div class="array-item"><!--:class="{ 'not-draggable': !enabled" }-->
          <EditorHolder not-use-card v-model="modelValue[index]"/>
        </div>
      </template>
      <template #footer>
        <div id="add-item-button" @click="addItem">
          <IconButton :size="32" id="add-item-icon" icon="add"/>
        </div>
      </template>
    </draggable>
  </div>
</template>

<script lang="ts" setup>
import draggable from "vuedraggable"
import {ref} from "vue";
import IconButton from "../IconButton.vue";
import EditorHolder from "../EditorHolder.vue";

// TODO：再加上文本编辑器的宽度自适应（作为atom时最小），数字编辑器的父级传递错误，右键删除，添加

const prop = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])
const drag = ref(false)

function updateData(data: any) {
  // console.log(data)
  emit('update:modelValue', data)
}

function addItem() {
  // TODO:这这不能，必须等到有数组强类型保障才行
}
</script>

<style scoped>
.array-holder {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  gap: 6px;
}

.array-editor {
  padding: 6px;
  flex-direction: column;
  gap: 0;
}

.array-item {
  background-color: var(--ryo-color-surface-container-high);
  overflow: hidden;
  border-radius: 12px;
  /*padding: 6px;
  font-size: 14px;
  color: white;*/
  box-shadow: var(--ryo-elevation-2);
  align-items: center;
  display: flex;
}

#add-item-button {
  box-shadow: var(--ryo-elevation-2);
  background-color: var(--ryo-color-surface-container-high);
  overflow: hidden;
  border-radius: 12px;
  min-width: 32px;
}

#add-item-icon {
  --ryo-color-on-surface-variant: white;
  border-radius: 0;
  height: 100% !important;
}
</style>