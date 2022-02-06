import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    alias: '/logout',
    component: () => import('../views/Home')
  },
  {
    path: '/start/:gameID',
    name: 'start',
    component: () => import('../views/Start.vue')
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/About.vue')
  },
  {
    path: '/play',
    name: 'play',
    component: () => import('../views/Play.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
