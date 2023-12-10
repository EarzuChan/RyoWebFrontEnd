<template>
  <div class="string-editor">
    <textarea ref="textField" class="string-editor-field" :value="modelValue" @input="updateText($event.target)"/>
    <div class="button-container" v-if="showButton">
      <IconButton icon="close" :size="24" id="clear-button" @click="clearText"/>
    </div>
    <!--TODO:清除-->
  </div>
</template>

<script lang="ts" setup>
import {nextTick, onMounted, ref} from "vue"
import IconButton from "../IconButton.vue"

const prop = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])
const textField = ref<any>(null)

const showButton = ref(prop.modelValue.length !== 0)

//FIXME:修复文字删除最后一个，Prop清空，但是文本框又有原文
const updateText = (target: any) => {
  const text = (target as HTMLInputElement).value
  console.log("触发：" + text)
  emit('update:modelValue', text)
  fitHeight()
  showButton.value = text.length !== 0
}

const clearText = () => {
  emit('update:modelValue', "a")
  console.log("清除：" + prop.modelValue)
}

const fitHeight = () => {
  console.log("调教")
  textField.value.style.height = '14px'
  textField.value.style.height = textField.value.scrollHeight + 'px'
}

onMounted(() => {
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
}
</style>