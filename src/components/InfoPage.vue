<template>
  <h1>项目元数据</h1>
  <div class="horizontal-layout">
    <p>内容1</p>
    <p>内容2</p>
  </div>
  <div class="editor" style="background-color: red;height: 30px;"/>
</template>

<script lang="ts" setup>
const props = defineProps({
  editable: {
    type: Boolean,
    default: false
  }
})
</script>

<style scoped>
h1 {
  font-size: 14px;
  color: white;
  margin-bottom: 8px;
}

p {
  font-size: 16px;
  color: white;
}

.horizontal-layout {
  display: flex;
}

.horizontal-layout * {
  flex: 1;
}

.editor {
  margin-top: 24px;
}
</style>