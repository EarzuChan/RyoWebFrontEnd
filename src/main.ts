import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'

const app = createApp(App)

// noinspection TypeScriptValidateTypes
app.use(ElementPlus)
app.mount('body')