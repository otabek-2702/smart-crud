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
      path: '/products',
      name: 'products',
      component: () => import('@/pages/products/ProductsTable.vue'),

    },
    {
      path: '/product',
      component: { render: () => h(RouterView) },
      children: [
        {
          path: 'create',
          name: 'product-create',
          component: () => import('@/pages/products/ProductCreate.vue'),
        },
        {
          path: ':id',
          name: 'product-edit',
          alias: '/products/:id',
          component: () => import('@/pages/products/ProductEdit.vue'),
        },
      ]
    },
    {
      path: '/categories',
      component: { render: () => h(RouterView) },
      children: [
        {
          path: "",
          name: 'categories',
          component: () => import('@/pages/categories/CategoriesTable.vue')

        },
        {
          path: "create",
          name: "categories-create",
          component: () => import('@/pages/categories/CategoryCreate.vue')
        }
      ],
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
