import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'

// Vite配置文件：https://vitejs.dev/config/

export default defineConfig({
    plugins: [vue({
        template: {
            compilerOptions: {
                isCustomElement: (tag) => tag.startsWith("md-")
            }
        }
    })],
    assetsInclude: ['src/assets/icons/**'],
})