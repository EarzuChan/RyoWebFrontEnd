<template>
  <div class="string-editor">
    <textarea ref="textField" class="string-editor-field" :value="modelValue" @input="updateText($event.target)"/>
    <div class="button-container" v-if="showButton">
      <IconButton icon="close" :size="24" id="clear-button" @click="clearText"/>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {nextTick, onMounted, ref} from "vue"
import IconButton from "../IconButton.vue"
import {sleepFor} from "../../utils/UsefulUtils";

const prop = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])
const textField = ref<any>(null)

const showButton = ref(prop.modelValue.length !== 0)

//FIXME:修复文字删除最后一个，Prop清空，但是文本框又有原文
function updateText(target: any) {
  const text = target.value
  // console.log("触发：" + text)
  emit('update:modelValue', text)
  fitHeight()
  showButton.value = text.length !== 0
}

async function clearText() {
  emit('update:modelValue', '')
  // console.log("结构：" + prop.modelValue)
  showButton.value = false

  await nextTick()

  fitHeight()
}

const fitHeight = () => {
  // console.log("调教")
  textField.value.style.height = '14px'
  textField.value.style.height = (textField.value.scrollHeight + 2) + 'px'
}

onMounted(() => {
  // console.log("创建")
  fitHeight()
})

</script>

<style scoped>
.string-editor-field {
  color: white;
  font-family: inherit;
  font-size: 14px;
  resize: none;
  overflow-y: hidden;
  padding: 0;
  flex: 1;
  border: none;
  background-color: transparent;

  --ryo-color-on-surface-variant: white;
}

#clear-button {
  --ryo-color-on-surface-variant: white;
}

.button-container {
  height: 20px;
  display: flex;
  align-items: center;
}

.string-editor {
  margin: 6px;
  display: flex;
  flex-direction: row;

  align-items: center;
}
</style>