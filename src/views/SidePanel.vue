<template>
  <div class="side-panel">
    <SidePanelLabel ref="fileTreeHeadline" editable v-model:edit-text="fileTreeFilterText">File Tree</SidePanelLabel>
    <!--TODO:右侧信息-->
    <el-tree ref="fileTree" accordion :data="props.data" :indent="24" :props="defaultProps"
             :filter-node-method="filterNode" @node-click="handleNodeClick"/>
    <!--TODO:咱就是说上面的数据刷新会导致键增加而找不到选项-->
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
const handleNodeClick = (_: any, thisNode: any) => {
  // let id = thisNodeData["$treeNodeId"]
  let [parentId, itemId] = calcId(thisNode)//oldCalcId(id)

  // console.log(`${parentId}-${itemId} old:${lastTimeClick.value} ${parentId != lastTimeClick.value[0]} ${itemId != lastTimeClick.value[1]}`)
  if (parentId != lastTimeClick.value[0] || itemId != lastTimeClick.value[1]) {
    lastTimeClick.value = [parentId, itemId]

    emit('node-select', parentId, itemId)
  }
}

// 计算点击项
/*const oldCalcId = (id: number) => {
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
}*/

const calcId = (node: any) => {
  // 获取当前节点
  let nodeData = node.data;

  // 获取信息
  let isRootNode = node.parent.parent === null
  // console.log("是腹肌：" + isRootNode)
  let rootData = isRootNode ? node.parent.data : node.parent.parent.data

  // 获取当前父节点
  let parentData = isRootNode ? nodeData : node.parent.data
  // console.log(parentData)

  // 坐标编号数组
  let index = []
  let valueToBePushed = -1

  // 遍历根节点的子级，找到当前父节点的索引值
  for (let i = 0; i < rootData.length; i++) {
    if (rootData[i] === parentData) {
      valueToBePushed = i
      // console.log("找到父：" + i)
      break
    }
  }
  index.push(valueToBePushed)

  valueToBePushed = -1
  if (!isRootNode) {
    // 遍历父节点的子级，找到当前节点的索引值
    for (let j = 0; j < parentData.children.length; j++) {
      if (parentData.children[j] === nodeData) {
        valueToBePushed = j
        // console.log("找到子：" + j)
        break
      }
    }
  }
  index.push(valueToBePushed)

  // 返回index数组
  // console.log(index)
  return index
}


// 数据对位
const defaultProps = {
  children: 'children',
  label: 'label',
  /*isLeaf: (_: any, b: any) => {
    console.log(b)
    if (b.parent) {
      if (b.parent.parent === null) {
        console.log("这是根")
        return false
      }
    }
  },*/
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

  flex: 1;
}
</style>