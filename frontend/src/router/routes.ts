import { RouteRecordRaw } from 'vue-router';
import MainLayout from 'layouts/MainLayout.vue';
import RequestFormPage from 'pages/RequestFormPage.vue';
import PortfolioPage from 'pages/PortfolioPage.vue';
import LoginPage from 'pages/LoginPage.vue';
import AdminDashboardPage from 'pages/AdminDashboardPage.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: MainLayout,
    children: [
      {
        path: 'request-form',
        component: RequestFormPage,
      },
      {
        path: 'portfolio',
        component: PortfolioPage,
      },
      {
        path: 'login',
        component: LoginPage
      },
      {
        path: 'dashboard',
        component: AdminDashboardPage,
        meta: { requiresAuth: true }
      }
    ]
  },
];

export default routes;
