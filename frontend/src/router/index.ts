import { route } from 'quasar/wrappers';
import { useUserStore } from 'src/stores/user';
import {
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router';

import routes from './routes';
import { ROLES } from 'src/enums';
/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : (process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory);

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.VUE_ROUTER_BASE),
  });

  const userStore = useUserStore();

  Router.beforeEach(async (to,) => {
    const isLoggedIn = userStore.checkLoginStatus();
    const userRole = userStore.role;

    if (to.meta.requiresAdmin && userRole !== ROLES.ADMIN && userRole !== ROLES.SUPERADMIN) {
      return {
        path: '/login',
      }
    }
    
    if (to.path === '/login' && isLoggedIn) {
      return {
        path: '/'
      }
    }
  });

  return Router;
});
