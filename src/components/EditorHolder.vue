<template>
  <div class="use-flex"
       :class="{'with-margin':isComplexEditor&&prop.withMargin,'editor-holder-card':isComplexEditor||useCard,'fulfill':!isComplexEditor}">
    <component class="fulfill" :is="editorType" :model-value="prop.modelValue"
               @update:model-value="a=>updateData(a)"/>
    <slot/>
  </div>
</template>

<script lang="ts" setup>
import FieldEditor from "./editors/FieldEditor.vue"
import StringEditor from "./editors/StringEditor.vue"
import {ref} from "vue";
import {sleepFor} from "../utils/UsefulUtils";
import NumberEditor from "./editors/NumberEditor.vue"
import BooleanEditor from "./editors/BooleanEditor.vue";
import ArrayEditor from "./editors/ArrayEditor.vue";

const prop = defineProps({'modelValue': {}, 'withMargin': Boolean, 'useCard': Boolean})
const emit = defineEmits(['update:modelValue'])

function updateData(data: any) {
  // console.log(data)
  emit('update:modelValue', data)
}

const isComplexEditor = ref(false) // 感觉没必要ref，没想好怎么办

function getEditorType(item: any) {
  // console.log(typeof item)

  isComplexEditor.value = false

  switch (typeof item) {
    case "string":
      return StringEditor
    case "number":
      return NumberEditor
    case "boolean":
      return BooleanEditor
    default: // Or Array
      if (Array.isArray(item)) return ArrayEditor
      isComplexEditor.value = true
      return FieldEditor
  }
}

const editorType = getEditorType(prop.modelValue) // 临时解决堆栈爆的权宜之计，太丑了
</script>

<style scoped>
.editor-holder-card {
  border-radius: 12px;
  box-shadow: var(--ryo-elevation-2);

  background-color: var(--ryo-color-surface-container);

  flex-direction: column;
  overflow: hidden;

  flex: 1;
}

.use-flex {
  display: flex;
}

.fulfill {
  flex: 1;
}

.with-margin {
  margin: 6px;
}
</style>