import { createRouter, createWebHistory } from 'vue-router'

import { useMainStore }from '../store'


const routes = [
  {
    path: '/',
    name:'unlabeled',
    component: () => import('../views/UnlabeledView.vue'),
  },
  {
    path: '/labeledbyothers',
    component: () => import('../views/LabeledByOthersView.vue'),
    name: 'labeled by others'
    // example of route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import('./views/About.vue'), meta: { title: 'Home' }
  },
  {
    path: '/allComments',
    component: () => import('../views/AllCommentsView.vue'),
    name: 'all comments'
    // example of route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import('./views/About.vue'), meta: { title: 'Home' }
  },
  {
    path: '/discussions',
    component: () => import('../views/DiscussionsView.vue'),
    name: 'discussions'
    // example of route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import('./views/About.vue'), meta: { title: 'Home' }
  },
  {
    path: '/conflicts',
    component: () => import('../views/ConflictsView.vue'),
    name: 'conflicts'
    // example of route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import('./views/About.vue'), meta: { title: 'Home' }
  },
  {
    path: '/link/:id',
    component: () => import('../views/LinkView.vue'),
    name: 'link',
    props: true

    // example of route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import('./views/About.vue'), meta: { title: 'Home' }
  },
  {
    path: '/login',
    component: () => import('../views/LoginPage.vue'),
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
    next({ name: 'Login' ,query:{redirect: to.fullPath}})
  } else {
    const store = useMainStore()
    store.current_user = store.current_user === null ? JSON.parse(localStorage.getItem('current_user')) : store.current_user
    next()
  }
 
})

export default router
