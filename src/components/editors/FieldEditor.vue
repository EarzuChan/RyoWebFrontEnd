<template>
  <div class="field-editor">
    <div class="field-holder">
      <div v-for="(item,index) in keys" class="field-list-item" :class="{ 'even': isEven(index) }">
        <div class="item-name">{{ item }}</div>
        <div class="item-value-holder" :class="{ 'even': isEven(index) }">
          <!--FIXME:你知道吧，我怀疑下面的v-model绑定不太行，但是想不到解决方法-->
          <EditorHolder with-margin v-model="modelValue[item]"/>
          <!--:model-value="modelValue[item]" @update:model-value="a=>updateItem(item,a)"-->
          <!--我本来是想拷贝并缓存modelValue对象为temp，然后给temp[item]赋值，然后再emit字段更新了的temp过去，感觉也不太对，就没动-->
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
// TODO:撤回重做：栈式操作

import EditorHolder from "../EditorHolder.vue"

const prop = defineProps(['modelValue'])
/*const emit =*/
defineEmits(['update:modelValue'])

// const reffedEditorData = ref(props.modelValue)

console.log("编辑器：组件加载")
const keys = Object.keys(prop.modelValue)

/*function updateItem(key, value) {
  // prop.modelValue不能直接写：prop.modelValue[key]=value
  // 更新prop.modelValue的值要调用emit('update:modelValue',newModelValue)
  // 我想通过这个函数更新prop.modelValue[key]的值
  let temp=prop.modelValue
  temp[key]=value
  emit('update:modelValue',temp)
}*/

/*const keys = ref()
watch(
    reffedEditorData,
    (newValue) => {
      console.log("编辑器：更新源数据")
      console.log(newValue)

      keys.value = Object.keys(newValue)
    },
    {immediate: true}
)*/

const isEven = (index: number) => index % 2 != 0
</script>

<style scoped>
.field-editor {
  display: flex;
  flex-direction: column;

  overflow-x: auto;
}

.field-holder {
  flex: 1;
  display: flex;
  flex-direction: column;

  min-width: 100%;
  width: fit-content;

  overflow-x: visible;
}

.field-list-item {
  min-height: 32px;
  color: white;
  font-size: 14px;
  display: flex;

  background-color: var(--ryo-color-surface-container-high);
}

/*上面是否需要再考虑？*/

.field-list-item.even {
  background-color: var(--ryo-color-surface-container-highest);
}

.item-name {
  min-width: 188px;
  padding-left: 12px;
  padding-top: 6px;
  padding-bottom: 6px;

  font-size: 14px;
  color: white;
}

.item-value-holder {
  flex: 1;
  background-color: var(--ryo-color-surface-container-highest);
  /*padding-left: 12px;*/

  display: flex;
  /*align-items: center;*/
}

/*.sub-editor-card {
  border-radius: 12px;
  box-shadow: var(--ryo-elevation-2);

  margin: 6px;

  overflow: hidden;
}*/

.item-value-holder.even {
  background-color: var(--ryo-color-surface-container-high);
}

.full-flex {
  flex: 1;
}
</style>