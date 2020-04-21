import { createApp } from 'vue'

import App from './views/app.vue'
import { router } from './routes'
import 'normalize.css'
import './assets/less/index.less'

createApp(App).use(router).mount('#app')
