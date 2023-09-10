<template>
  <div class="label-holder" :class="{'hover-able' : editable && !notHoverAble, 'focusing' : holderFocusing}"
       @mouseleave="handleMouseLeave" ref="labelHolder" tabindex="0" @focus="handleFocus(true)">
    <div v-if="editable && holderFocusing" class="input-holder"
         @focusout="handleFocus(false)">
      <input class="label" ref="input"
             type="text" :value="editText"
             @input="$emit('update:editText', $event.target.value)"
             @keydown.enter.prevent="handlePressEnter"/>
      <IconButton icon="close" :size="28" @mousedown.left="clearText"/>
    </div>
    <div v-else class="label">
      <slot/>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {ref, nextTick} from 'vue'
import IconButton from "./IconButton.vue";

const props = defineProps({
  editable: {
    type: Boolean,
    default: false
  },
  editText: {
    type: String,
    default: '请绑定编辑文本'
  }
})
const emits = defineEmits(['update:editText'])

const notHoverAble = ref(false)
const holderFocusing = ref(false)

const input = ref<any>(null)
const labelHolder = ref<any>(null)

function handleMouseLeave() {
  if (!holderFocusing.value) notHoverAble.value = false
}

function clearText() {
  // console.log('Cleared')
  emits('update:editText', '')
}

function handlePressEnter() {
  input.value.blur()
}

async function handleFocus(isFocusing: boolean) {
  if (!props.editable) return

  // console.log("专注：" + isFocusing)

  if (isFocusing) {
    holderFocusing.value = true

    // 切换焦点
    await nextTick()
    if (input.value) {
      notHoverAble.value = true
      input.value.focus()
    }
  } else {
    // 防止阻止事件
    holderFocusing.value = false
  }
}

// console.log("可编辑：" + props.editable)
</script>

<style scoped>
.label-holder {
  display: flex;
  transition: all var(--ryo-motion-standard);

  height: 20px;
  padding: 8px 16px 8px 16px;
  justify-content: left;
  align-items: center;
}

.input-holder {
  display: flex;
  flex-direction: row;

  flex: 1;
}

.label-holder.hover-able:hover, .label-holder.focusing {
  border-radius: 18px;
  background-color: var(--ryo-color-surface-container-high);
}

.label {
  color: var(--ryo-color-on-surface-variant);
  display: flex;
  white-space: nowrap;
  background: none;
  border: none;

  flex: 1;

  font-size: 14px;
}
</style>