import {routesDashboard} from '@/pages/dashboard/routes';
import {createRouter, createWebHistory} from 'vue-router';
import {routesClients} from '@/pages/clients/routes';
import {routesCars} from '@/pages/cars/routes';
import {routesDev} from '@/pages/dev/routes';
import {routesErrors} from '@/pages/errors/routes';

const routes = [
  ...routesDashboard,
  ...routesClients,
  ...routesCars,

  ...routesDev,

  // rotesErrors must be the last one
  ...routesErrors,
];


const router = createRouter({
  history: createWebHistory(),
  routes,
});

export const PAGE_TITLE_SUFFIX = `${import.meta.env?.VITE_APP_NAME}`;

router.beforeEach((to, from, next) => {

  const pageTitle = to?.meta?.pageTitle ?? '';
  document.title = pageTitle ? pageTitle + ' - ' + PAGE_TITLE_SUFFIX : PAGE_TITLE_SUFFIX;

  if (to.path === '/') {
    next('/dashboard');
  } else {
    next();
  }

  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth',
  });
});


export default router;
