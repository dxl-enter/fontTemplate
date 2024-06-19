import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
// 导入router配置文件
import router from "./router"
import vant from 'vant';
import { Icon } from 'vant';
import 'vant/lib/index.css';

// 导入vuex
// import store from './store'
createApp(App).use(router).use(vant).use(Icon).mount('#app')
