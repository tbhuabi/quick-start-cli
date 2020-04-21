import { createApp } from 'vue'

import App from './views/app.vue'
import { router } from './routes'
import 'normalize.css'
import './assets/scss/index.scss'

createApp(App).use(router).mount('#app')
