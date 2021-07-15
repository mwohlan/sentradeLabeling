import { createRouter, createWebHistory } from 'vue-router'

import UnlabeledView from "../views/UnlabeledView.vue"
import LabeledByOthersView from "../views/LabeledByOthersView.vue"
import LoginPage from '../views/LoginPage.vue'
import AllCommentsView from '../views/AllCommentsView.vue'
import DiscussionsView from '../views/DiscussionsView.vue'
import ConflictsView from "../views/ConflictsView.vue"
import LinkView from "../views/LinkView.vue"
import { useMainStore }from '../store'


const routes = [
  {
    path: '/',
    component: UnlabeledView,
    name:'unlabeled'
    // example of route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import('./views/About.vue'), meta: { title: 'Home' }
  },
  {
    path: '/labeledbyothers',
    component: LabeledByOthersView,
    name: 'labeled by others'
    // example of route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import('./views/About.vue'), meta: { title: 'Home' }
  },
  {
    path: '/allComments',
    component: AllCommentsView,
    name: 'all comments'
    // example of route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import('./views/About.vue'), meta: { title: 'Home' }
  },
  {
    path: '/discussions',
    component: DiscussionsView,
    name: 'discussions'
    // example of route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import('./views/About.vue'), meta: { title: 'Home' }
  },
  {
    path: '/conflicts',
    component: ConflictsView,
    name: 'conflicts'
    // example of route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import('./views/About.vue'), meta: { title: 'Home' }
  },
  {
    path: '/link/:id',
    component: LinkView,
    name: 'link',
    props: true

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
 
  const isAuthenticated = localStorage.getItem('current_user') !== null;
  if (!isAuthenticated && to.name !== 'Login') {
    next({ name: 'Login' })
  } else {
    const store = useMainStore()
    store.current_user = store.current_user === null ? JSON.parse(localStorage.getItem('current_user')) : store.current_user
    next()
  }
 
})

export default router
