<template>
  <div class="side-panel">
    <SidePanelLabel ref="fileTreeHeadline" editable v-model:edit-text="fileTreeFilterText">文件视图</SidePanelLabel>
    <!--TODO:右侧信息-->
    <el-tree ref="fileTree" accordion :data="data" indent="24" :props="defaultProps"
             :filter-node-method="filterNode" @node-click="handleNodeClick"/>
  </div>
</template>

<script lang="ts" setup>
import {ref, watch} from 'vue'
import SidePanelLabel from './SidePanelLabel.vue'

const fileTreeHeadline = ref<any>(null)
const fileTree = ref<any>(null)

interface Tree {
  label: string
  children?: Tree[]
}

// 处理点击
const handleNodeClick = (data: Tree) => {
  console.log(data)
}

// 默认数据
const data: Tree[] = [
  {
    label: 'Contents',
    children: [
      {
        label: 'Sometext',
      },
    ],
  },
  {
    label: 'Main',
    children: [
      {
        label: 'Sometext',
      },
      {
        label: 'Sometext 2',
      },
    ],
  },
  {
    label: 'Emojis',
    children: [
      {
        label: 'Sometext',
      },
    ],
  },
]

// 数据对位
const defaultProps = {
  children: 'children',
  label: 'label',
}

const fileTreeFilterText = ref('')
watch(fileTreeFilterText, (val) => {
  fileTree.value.filter(val)
})

const filterNode = (value: string, data: Tree) => {
  value = value.trim().toLowerCase()
  if (!value) return true
  return data.label.toLowerCase().includes(value)
}
</script>

<style scoped>
.side-panel {
  display: flex;
  flex-direction: column;
  padding: 12px;
  overflow: auto;
  background-color: var(--ryo-color-surface-container-low);
}
</style>