import {routesDashboard} from "@/pages/dashboard/routes";
import {createRouter, createWebHistory} from "vue-router";

const routes = [
  ...routesDashboard
];


const router = createRouter({
  history: createWebHistory(),
  routes,
});

export const PAGE_TITLE_SUFFIX = ` - ${import.meta.env?.VITE_APP_NAME}`;

router.beforeEach((to, from, next) => {

  document.title = `${to.meta?.pageTitle}` + PAGE_TITLE_SUFFIX;

  if (to.path === '/') {
    next('/dashboard')
  } else {
    next();
  }

  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
});


export default router;
