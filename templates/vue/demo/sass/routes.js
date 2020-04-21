import { createRouter, createWebHashHistory } from 'vue-router'
import Home from './views/home/home.vue'

const routes = [{
  path: '/',
  component: Home
}]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export {
  router
}
