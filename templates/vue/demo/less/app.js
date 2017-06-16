import Vue from 'vue'
import VueRouter from 'vue-router'

import App from './views/app.vue'
import './components'
import 'normalize.css'
import './assets/less/index.less'
import routes from './routes'

Vue.use(VueRouter)

let router = new VueRouter({
  mode: 'history',
  routes: [{
    path: '/',
    redirect: '/home',
    component: App,
    children: routes
  }]
})

new Vue({
  router
}).$mount('#app')
