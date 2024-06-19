// 引入模板的全局样式
import '@/style/index.scss'

import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// 配置element-plus国际化
// eslint-disable-next-line @typescript-eslint/prefer-ts-expect-error
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import 'element-plus/theme-chalk/dark/css-vars.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
// 引入仓库
import pinia from './stores'

import App from './App.vue'
import router from './router'
// 引入路由鉴权文件
import '@/utils/permisstion'

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
// 安装element-plus插件
app.use(ElementPlus, {
  locale: zhCn, // element-plus国际化配置
})

app.use(pinia)
app.use(router)

app.mount('#app')
