<template>
  <md-dialog open id="dialog" :type.attr="'alert'" ref="dialog" @close="dialogClose">
    <div v-show="title!=null" slot="headline">
      {{ title }}
    </div>
    <form v-show="message!=null" slot="content" id="form-id" method="dialog">
      {{ message }}
    </form>
    <div slot="actions" v-show="buttons.length!=0">
      <md-text-button form="form-id" :value.attr="button.type" v-for="button in buttons">
        {{ button.label }}
      </md-text-button>
    </div>
  </md-dialog>
</template>

<script lang="ts" setup>
import '@material/web/dialog/dialog.js'
import '@material/web/button/text-button.js'
import {AlertButton, AlertEventType} from "../utils/AlertBuilder"
import {ref} from "vue"

/*const props =*/ defineProps({
  title: String,
  message: String,
  buttons: {
    type: Array as () => AlertButton[],
    default: []
  },
  dismissible: Boolean
})
const emit = defineEmits(['close-alert', 'close-alert-animation-finished'])
const dialog = ref<any>()

const dialogClose = () => {
  let {returnValue: result} = dialog.value
  if (result == "") result = "3"
  emit('close-alert', AlertEventType[parseInt(result)])
  setTimeout(() => emit('close-alert-animation-finished'), 200);
}
</script>

<style scoped>
</style>