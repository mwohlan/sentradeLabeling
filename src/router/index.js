import { createRouter, createWebHistory } from 'vue-router'

import Home from "../views/Home.vue"


const routes = [
  {
    path: '/',
    component: Home
    // example of route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import('./views/About.vue'), meta: { title: 'Home' }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
