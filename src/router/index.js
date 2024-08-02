import Login from '@/pages/Login.vue'
import Home from '@/pages/Home.vue'
import { createRouter, createWebHistory, RouterView } from 'vue-router'
import checkAuthMiddleware from './checkAuthMiddleware'
import { h } from 'vue'
import checkPermissionsMiddleware from './checkPermissionsMiddleware'

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
      meta: {
        permissions: [{ can: 'read', a: 'Products' }]
      }
    },
    {
      path: '/product',
      component: { render: () => h(RouterView) },
      children: [
        {
          path: 'create',
          name: 'product-create',
          component: () => import('@/pages/products/ProductCreate.vue'),
          meta: {
            permissions: [{ can: 'create', a: 'Product' }]
          }
        },
        {
          path: ':id',
          name: 'product-edit',
          alias: '/products/:id',
          component: () => import('@/pages/products/ProductEdit.vue'),
          meta: {
            permissions: [{ can: 'edit', a: 'Product' }]
          }
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
          component: () => import('@/pages/categories/CategoriesTable.vue'),
          meta: {
            permissions: [{ can: 'read', a: 'Categories' }]
          }

        },
        {
          path: "create",
          name: "categories-create",
          component: () => import('@/pages/categories/CategoryCreate.vue'),
          meta: {
            permissions: [{ can: 'create', a: 'Category' }]
          }
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


router.afterEach((to) => checkPermissionsMiddleware(to))
router.afterEach((to) => checkAuthMiddleware(to, router))

export default router
