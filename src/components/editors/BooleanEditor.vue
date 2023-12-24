<template>
  <div class="boolean-editor" @click="switchState">
    <div id="current-state">{{ currentState }}</div>
    <div id="another-state">/{{ anotherState }}</div>
  </div>
</template>

<script lang="ts" setup>
import {computed, onMounted, ref, watch} from "vue"
import IconButton from "../IconButton.vue"
import {sleepFor} from "../../utils/UsefulUtils";

//TODO:向上级转达当前非法状态

const prop = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue',])

const currentState = ref(null)
const anotherState = ref(null)

function switchState() {
  emit('update:modelValue', !prop.modelValue)
}

onMounted(() => watch(() => prop.modelValue, (newValue) => {
  if (newValue) {
    currentState.value = "真"
    anotherState.value = "假"
  } else {
    currentState.value = "假"
    anotherState.value = "真"
  }
}, {immediate: true}))
</script>

<style scoped>
#current-state {
  color: white;
  font-size: 14px;
  flex: 1;
}

#another-state {
  color: var(--ryo-color-on-surface);
  font-size: 14px;
}

.boolean-editor {
  display: flex;

  padding: 6px;
  min-height: 20px;

  align-items: center;
}
</style>