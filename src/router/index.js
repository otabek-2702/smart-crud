import Login from '@/pages/Login.vue'
import Products from '@/pages/Products.vue'
import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/',
      name: 'products',
      component: Products
    },
    {
      path: '/categories',
      name: 'categories',
      component: import('@/pages/Categories.vue')
    },

  ]
})

export default router
