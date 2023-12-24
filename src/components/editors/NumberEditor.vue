<template>
  <div class="number-editor">
    <!--type="number"-->
    <input ref="textField" id="number-editor-field"
           @input="updateNumber($event.target)"/>
    <div id="number-state-error-line" v-if="numberStateError"/>
  </div>
</template>

<script lang="ts" setup>
import {computed, onMounted, ref, watch} from "vue"
import IconButton from "../IconButton.vue"
import {sleepFor} from "../../utils/UsefulUtils";

//TODO:向上级转达当前非法状态

const prop = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue',])
const textField = ref<any>(null)

const numberStateError = ref(false)

const oldValue = ref(null)

function updateNumber(target: any) {
  try {
    const txt = target.value
    const num = Number.parseInt(txt)
    // console.log(target.value, num)
    if (num !== num || num.toString() !== txt) throw "NaN "

    // console.log("upt " + num)
    oldValue.value = num
    emit('update:modelValue', num)
    numberStateError.value = false
  } catch (e: any) {
    numberStateError.value = true
    // console.log("err fmt " + e.toString())
  }
}

onMounted(() => watch(() => prop.modelValue, (newValue) => {
  if (numberStateError.value && newValue !== oldValue || newValue === oldValue.value) {
    // console.log("nal")
    return
  }
  // console.log("apl " + newValue)
  textField.value.value = newValue
}, {immediate: true}))

</script>

<style scoped>
#number-editor-field {
  color: white;
  font-family: inherit;
  font-size: 14px;
  padding: 0;
  flex: 1;
  border: none;
  background-color: transparent;

  --ryo-color-on-surface-variant: white;

  margin: 6px;
  min-height: 20px;
}

#number-state-error-line {
  content: '';
  height: 3px;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: var(--ryo-color-error-container);
  position: absolute;
}

.number-editor {
  display: flex;
  position: relative;
}
</style>