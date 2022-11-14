import { RouteRecordRaw } from 'vue-router';
import MainLayout from 'layouts/MainLayout.vue';
import RequestFormPage from 'pages/RequestFormPage.vue';
import PortfolioPage from 'pages/PortfolioPage.vue';

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
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
];

export default routes;
