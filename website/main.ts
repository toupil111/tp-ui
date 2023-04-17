import {createApp} from 'vue'
import App from './App.vue'
import router from './router/router'
//引入 组件 全局
import tpUI from 'tp-ui'

//全局引入样式
import "theme-chalk/index.scss"
createApp(App).use(tpUI).use(router).mount("#app")