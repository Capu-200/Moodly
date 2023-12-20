import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: () => import('../views/Login.vue')
    },
    {
      path: '/GraphManager',
      name: 'GraphManager',
      component: () => import('../views/GraphManager.vue')
    },
    {
      path: '/Mood',
      name: 'mood',
      component: () => import('../views/Mood.vue')
    },
  ]
})

export default router
