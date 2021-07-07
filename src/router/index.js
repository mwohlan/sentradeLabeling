import { createRouter, createWebHistory } from 'vue-router'

import UnlabeledView from "../views/UnlabeledView.vue"
import LabeledByOthersView from "../views/LabeledByOthersView.vue"
import LoginPage from '../views/LoginPage.vue'
import AllCommentsView from '../views/AllCommentsView.vue'
import { useMainStore }from '../store'


const routes = [
  {
    path: '/',
    component: UnlabeledView,
    name:'UnlabeledView'
    // example of route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import('./views/About.vue'), meta: { title: 'Home' }
  },
  {
    path: '/labeledbyothers',
    component: LabeledByOthersView,
    name: 'LabeledByOthersView'
    // example of route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import('./views/About.vue'), meta: { title: 'Home' }
  },
  {
    path: '/allComments',
    component: AllCommentsView,
    name: 'AllCommentsView'
    // example of route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import('./views/About.vue'), meta: { title: 'Home' }
  },
  {
    path: '/login',
    component: LoginPage,
    name: 'Login'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})




router.beforeEach((to, from, next) => {
 
  const isAuthenticated = localStorage.getItem('user') !== null;
  if (!isAuthenticated && to.name !== 'Login') {
    next({ name: 'Login' })
  } else {
    const store = useMainStore()
    store.user = store.user === null ? JSON.parse(localStorage.getItem('user')) : store.user
    next()
  }
 
})

export default router
