<template>
  <div
      :class="{'with-margin':isFieldEditor&&prop.withMargin,'editor-holder-card':isFieldEditor,'fulfill':!isFieldEditor}">
    <component class="fulfill" :is="getEditorType(prop.modelValue)" :model-value="prop.modelValue"
               @update:model-value="a=>updateData(a)"/>
    <slot/>
  </div>
</template>

<script lang="ts" setup>
import FieldEditor from "./editors/FieldEditor.vue";
import StringEditor from "./editors/StringEditor.vue";
import {ref} from "vue";

const prop = defineProps({'modelValue': {}, 'withMargin': Boolean})
const emit = defineEmits(['update:modelValue'])

const updateData = (data: any) => emit('update:modelValue', data)

const isFieldEditor = ref(false)
const getEditorType = (item: any) => {
  isFieldEditor.value = false
  switch (typeof item) {
    case "string":
      return StringEditor
      /*case "number":
        return "NumberEditor"
      case "boolean":
        return "BooleanEditor"
      case "array":
        return "ArrayEditor"*/
    default: // Or Object
      isFieldEditor.value = true
      return FieldEditor
  }
}
</script>

<style scoped>
.editor-holder-card {
  border-radius: 12px;
  box-shadow: var(--ryo-elevation-2);

  background-color: var(--ryo-color-surface-container);

  display: flex;
  flex-direction: column;
  overflow: hidden;

  flex: 1;
}

.fulfill {
  display: flex;
  flex: 1;
}

.with-margin {
  margin: 6px;
}
</style>