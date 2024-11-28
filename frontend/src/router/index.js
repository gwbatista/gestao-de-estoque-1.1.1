import { createRouter, createWebHistory } from 'vue-router';
import MainLayout from '@/views/MainLayout.vue';
import LoginPage from '@/views/LoginPage.vue';
import DashboardPage from '@/views/DashboardPage.vue';
import Product from '@/views/Product.vue';

const routes = [
  {
    path: '/dashboard',
    component: MainLayout,
    children: [
      { path: '', component: DashboardPage },
    ]
  },
  {
    path: '/produtos',
    component: MainLayout,
    children: [
      { path: '', component: Product },
    ]
  },
  {
    path: '/login',
    component: LoginPage,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
