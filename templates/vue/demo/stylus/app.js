import Vue from 'vue'

import App from './views/app.vue'
import './components'
import 'normalize.css'
import './assets/scss/index.styl'
import router from './routes'

const vm = new Vue({
  el: '#app',
  router,
  render (h) {
    return h(App)
  }
})

Vue.use(vm)
