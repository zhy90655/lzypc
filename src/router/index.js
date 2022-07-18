import { createRouter, createWebHashHistory } from 'vue-router'
import Store from '../store/index'
const routes = [
  {
    path: '/',
    name: 'login',
    component: import('../views/login.vue')
  },
  {
    path: '/main',
    meta: { needlogin: 1 },
    name: 'main',
    component: () => import('../views/main.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.needlogin) {
    if (Store.state.login) next()
    else next('/')
  } else if (to.path === '/' && Store.state.login) next('/main')
  else next()
})
export default router
