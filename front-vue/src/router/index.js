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
      path: '/Mood',
      name: 'mood',
      component: () => import('../views/Mood.vue')
    },
    {
      path: '/Test',
      name: 'test',
      component: () => import('../views/Test.vue')
    },
  ]
})

export default router
