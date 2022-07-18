import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import icon from './components/common/icon'
import { $mqtt } from './api/mqtt/requst'
import './assets/theme/index.scss'
import './assets/theme'
import './assets/style/base.scss'
import './assets/font/iconfont'
import './components/common/scrollbar/scrollbar.css'
import LlScrollbar from './components/common/scrollbar/scrollbar'
const app = createApp(App)
app.config.globalProperties.$mqtt = $mqtt
app.use(store).use(router).use(icon).use(LlScrollbar).mount('#app')
