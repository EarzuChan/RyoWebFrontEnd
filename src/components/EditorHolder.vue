<template>
  <div class="use-flex"
       :class="{'with-margin':isComplexEditor&&prop.withMargin,'editor-holder-card':isComplexEditor && !notUseCard || useCard,'fulfill':!isComplexEditor}">
    <component class="fulfill" :is="editorType" v-if="canShow" :model-value="prop.modelValue"
               @update:model-value="(a:any)=>updateData(a)"/>
    <slot/>
  </div>
</template>

<script lang="ts" setup>
import FieldEditor from "./editors/FieldEditor.vue"
import StringEditor from "./editors/StringEditor.vue"
import {nextTick, onMounted, ref, watch} from "vue";
import {sleepFor} from "../utils/UsefulUtils";
import NumberEditor from "./editors/NumberEditor.vue"
import BooleanEditor from "./editors/BooleanEditor.vue";
import ArrayEditor from "./editors/ArrayEditor.vue";

// TODO:优化性能？小改不重载！

const prop = defineProps({'modelValue': {}, 'withMargin': Boolean, 'useCard': Boolean, 'notUseCard': Boolean})
const emit = defineEmits(['update:modelValue'])

function updateData(data: any) {
  // console.log(data)
  emit('update:modelValue', data)
}

const isComplexEditor = ref(false) // 感觉没必要ref，没想好怎么办
const updateTemp = ref<any>(null)
const canShow = ref(false)

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

const editorType = ref<any>() // 临时解决堆栈爆的权宜之计，太丑了

onMounted(() => watch(() => prop.modelValue, async () => {
  console.log("Holder 接到新数据")

  canShow.value = false
  editorType.value = getEditorType(prop.modelValue)
  await nextTick()
  canShow.value = true
}, {immediate: true}))
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