<template>
  <div class="side-panel">
    <SidePanelLabel ref="fileTreeHeadline" editable v-model:edit-text="fileTreeFilterText">文件视图</SidePanelLabel>
    <!--TODO:右侧信息-->
    <el-tree ref="fileTree" accordion :data="props.data" :indent="24" :props="defaultProps"
             :filter-node-method="filterNode" @node-click="handleNodeClick"/>
  </div>
</template>

<script lang="ts" setup>
import {ref, watch} from 'vue'
import SidePanelLabel from '../components/SidePanelLabel.vue'

const fileTreeHeadline = ref<any>()
const fileTree = ref<any>()
const lastTimeClick = ref([-1, -1])

export interface TreeItem {
  label: string
  type: string
}

export interface TreeParent {
  label: string
  children?: TreeItem[]
}

const props = defineProps({
  data: {
    type: Array as () => TreeParent[],
    default: []
  }
})

const emit = defineEmits(['node-select']);

// 处理点击
const handleNodeClick = (a: any) => {
  let [parentId, itemId] = calcId(a["$treeNodeId"])

  // console.log(`${parentId}-${itemId} old:${lastTimeClick.value} ${parentId != lastTimeClick.value[0]} ${itemId != lastTimeClick.value[1]}`)
  if (parentId != lastTimeClick.value[0] || itemId != lastTimeClick.value[1]) {
    lastTimeClick.value = [parentId, itemId]

    emit('node-select', parentId, itemId)
  }
}

// 计算点击项
const calcId = (id: number) => {
  let a = 0
  for (let i = 0; i < props.data!.length; i++) {
    a++

    if (a == id) return [i, -1]
    let it = props.data![i]
    if (it.children != undefined) {
      for (let j = 0; j < it.children.length; j++) {
        a++

        if (a == id) return [i, j]
      }
    }
  }

  // 没找到
  return [-1, -1]
}

// 数据对位
const defaultProps = {
  children: 'children',
  label: 'label',
}

const fileTreeFilterText = ref('')
watch(fileTreeFilterText, (val) => {
  fileTree.value.filter(val)
})

const filterNode = (value: string, data: any) => {
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