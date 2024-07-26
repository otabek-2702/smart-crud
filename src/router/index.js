import Login from '@/pages/Login.vue'
import Home from '@/pages/Home.vue'
import { createRouter, createWebHistory, RouterView } from 'vue-router'
import checkAuthMiddleware from './checkAuthMiddleware'
import { h } from 'vue'

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
      name: 'home',
      component: Home
    },
    {
      path: '/products/',
      component: { render: () => h(RouterView) },
      children: [
        {
          path: '',
          name: 'products',
          component: () => import('@/pages/ProductsTable.vue'),
        },
        {
          path: ':id',
          name: 'products-view',
          component: () => import('@/pages/ProductView.vue'),
        },
      ]
    },
    {
      path: '/product',
      component: { render: () => h(RouterView) },
      children: [
        {
          path: 'create',
          name: 'product-create',
          component: () => import('@/pages/ProductCreate.vue'),
        },
        {
          path: ':id',
          name: 'product-edit',
          component: () => import('@/pages/ProductEdit.vue'),
        },
      ]
    },
    {
      path: '/categories',
      name: 'categories',
      component: () => import('@/pages/Categories.vue')
    },


    {
      path: '/loading',
      name: 'loading',
      component: import('@/components/loading-spinner/LoadingSpinner.vue')
    },

  ]
})


router.afterEach((to, from, failure) => checkAuthMiddleware(to, from, failure, router))

export default router
