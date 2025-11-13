import { createRouter, createWebHistory } from 'vue-router'
import MainView from '../views/MainView.vue'
import LoginView from '../views/LoginView.vue'
import AdminLayout from '../layouts/admin/AdminLayout.vue'
import DriverLayout from '../layouts/driver/DriverLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/main',
      name: 'main',
      component: MainView,
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   component: () => import('../views/AboutView.vue'),
    // },
    // 관리자 페이지들 (사이드바 레이아웃 적용)
    {
      path: '/admin',
      redirect: 'admin/dashboard',
      component: AdminLayout,
      children: [
        {
          path: 'dashboard',
          name: 'dashboard',
          component: () => import('../views/DashboardView.vue'),
        },
        {
          path: 'lockers',
          name: 'lockers',
          component: () => import('../views/DashboardView.vue'), // 임시로 Dashboard 사용
        },
        {
          path: 'reservations',
          name: 'reservations',
          component: () => import('../views/DashboardView.vue'), // 임시로 Dashboard 사용
        },
        {
          path: 'customers',
          name: 'customers',
          component: () => import('../views/DashboardView.vue'), // 임시로 Dashboard 사용
        },
        {
          path: 'statistics',
          name: 'statistics',
          component: () => import('../views/DashboardView.vue'), // 임시로 Dashboard 사용
        },
        {
          path: 'demo',
          name: 'demo',
          component: () => import('../views/ComponentDemo.vue'),
        },
        {
          path: 'settings',
          name: 'settings',
          component: () => import('../views/AboutView.vue'), // 임시로 About 사용
        },
        {
          path: 'icon-demo',
          name: 'icon-demo',
          component: () => import('../views/IconDemo.vue'),
        },
      ],
    },
    {
      path: '/driver',
      component: DriverLayout,
      children: [
        {
          path: 'dashboard',
          name: 'dashboard',
          component: () => import('../views/DashboardView.vue'),
        },
        {
          path: 'lockers',
          name: 'lockers',
          component: () => import('../views/DashboardView.vue'), // 임시로 Dashboard 사용
        },
        {
          path: 'reservations',
          name: 'reservations',
          component: () => import('../views/DashboardView.vue'), // 임시로 Dashboard 사용
        },
        {
          path: 'customers',
          name: 'customers',
          component: () => import('../views/DashboardView.vue'), // 임시로 Dashboard 사용
        },
        {
          path: 'statistics',
          name: 'statistics',
          component: () => import('../views/DashboardView.vue'), // 임시로 Dashboard 사용
        },
        {
          path: 'demo',
          name: 'demo',
          component: () => import('../views/ComponentDemo.vue'),
        },
        {
          path: 'settings',
          name: 'settings',
          component: () => import('../views/AboutView.vue'), // 임시로 About 사용
        },
        {
          path: 'icon-demo',
          name: 'icon-demo',
          component: () => import('../views/IconDemo.vue'),
        },
      ],
    },
  ],
})

export default router
