<template>
  <div class="icon-button"
       :style="{height : size + 'px' , width : size + 'px'}"
       :class="style, {'disabled' : disabled}"
       ref="button"
       tabindex="0">
    <div class="icon" :class="style"
         :style="{height : iconSize + 'px' , width : iconSize + 'px','-webkit-mask-image': `url(/src/assets/icons/icon_${icon}.svg)`}"/>
  </div>
</template>

<script lang="ts" setup>
import {defineProps} from 'vue';

const props = defineProps({
  disabled: {
    type: Boolean,
    default: false,
  },
  icon: {
    type: String,
    default: 'default',
  },
  // 其他样式
  style: {
    type: String,
    default: 'standard',
  },
  size: {
    type: Number,
    default: 40,
  },
  iconSize: {
    type: Number,
    default: 24,
  }
})

// TODO:这这
function handleClick() {
  if (!props.disabled) {
  }
}
</script>

<style scoped>
.icon-button {
  border-radius: 50%;
  display: flex;

  justify-content: center;
  align-items: center;
  cursor: pointer;

  transition: all var(--ryo-motion-standard);
}

.icon-button.standard:not(.disabled):hover {
  background-color: rgba(var(--ryo-color-state-layers-dark-on-surface-variant), var(--ryo-opacity-state-layers-008));
}

.icon-button.standard:not(.disabled):active {
  background-color: rgba(var(--ryo-color-state-layers-dark-on-surface-variant), var(--ryo-opacity-state-layers-012));
}

.icon-button.standard.disabled {
  opacity: 0.38;
  cursor: not-allowed;
}

.icon {
  -webkit-mask-size: contain;
  -webkit-mask-position: center;
}

.icon.standard {
  background-color: var(--ryo-color-on-surface-variant)
}
</style>
