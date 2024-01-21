<template>
  <div class="text-button"
       :class="[buttonStyle, {'disabled' : disabled}]"
       ref="button"
       :style="'padding: '+paddingVertical+'px '+paddingHorizontal+'px'"
       tabindex="0">
    <div class="text" :style="'font-size: '+textSize+'px'">
      <slot/>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  disabled: {
    type: Boolean,
    default: false,
  },
  paddingVertical: {
    type: Number,
    default: 10,
  },
  paddingHorizontal: {
    type: Number,
    default: 24,
  },
  // 其他样式
  buttonStyle: {
    type: String,
    default: 'standard',
  },
  textSize: {
    type: Number,
    default: 14,
  }
})
</script>

<style scoped>
.text-button {
  border-radius: 100px;
  display: flex;
  position: relative;

  justify-content: center;
  align-items: center;
  cursor: pointer;

  overflow: hidden;
}

.text-button.disabled {
  cursor: not-allowed;
}

.text-button::after {
  content: "";
  position: absolute;

  transition: all var(--ryo-motion-standard);

  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
}

.text-button:not(.disabled):hover::after {
  background-color: rgba(var(--ryo-color-state-layers-on-surface-variant), var(--ryo-opacity-state-layers-008));
}

.text-button:not(.disabled):active::after {
  background-color: rgba(var(--ryo-color-state-layers-on-surface-variant), var(--ryo-opacity-state-layers-012));
  /*background-color: rgba(256,0,0,0.5);*/
}

.text-button.filled:not(.disabled) {
  background-color: var(--ryo-color-primary);
}

.text-button.filled.disabled::after {
  background-color: rgba(var(--ryo-color-state-layers-on-surface-variant), var(--ryo-opacity-state-layers-012));
}

.text-button.disabled > .text {
  opacity: 0.38;
}

.text-button.standard > .text {
  color: var(--ryo-color-on-surface-variant)
}

.text-button:not(.disabled).filled > .text {
  color: var(--ryo-color-on-primary)
}

.text-button.filled.disabled > .text {
  color: var(--ryo-color-on-surface)
}
</style>
