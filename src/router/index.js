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
    name: 'labeled by others',
    meta: {
      hideSentiments: true,
    }
  },
  {
    path: '/allComments',
    component: () => import('../views/AllCommentsView.vue'),
    name: 'all comments'
  },
  {
    path: '/discussions',
    component: () => import('../views/DiscussionsView.vue'),
    name: 'discussions'
  },
  {
    path: '/conflicts',
    component: () => import('../views/ConflictsView.vue'),
    name: 'conflicts'
  },
  {
    path: '/recentlyLabeled',
    component: () => import('../views/RecentlyLabeledView.vue'),
    name: 'recently labeled' //
  },
  {
    path: '/link/:id',
    component: () => import('../views/LinkView.vue'),
    name: 'link',
    props: true

  },
  {
    path: '/login',
    component: () => import('../views/LoginPage.vue'),
    name: 'Login'
  },
  {
    path: '/stats',
    component: () => import('../views/Stats.vue'),
    name: 'stats'
  },
  {
    path: '/queryTest',
    component: () => import('../views/TestQueries.vue'),
    name: 'queryTest'
  }

]

const router = createRouter({
  history: createWebHistory(),
  routes
})




router.beforeEach((to, from) => {
 
  const isAuthenticated = localStorage.getItem('current_user') !== null;
  if (!isAuthenticated && to.name !== 'Login') {
    return { name: 'Login' ,query:{redirect: to.path}}
  } else {
    const store = useMainStore()
    store.current_user = store.current_user === null ? JSON.parse(localStorage.getItem('current_user')) : store.current_user
  }
 
})

export default router
