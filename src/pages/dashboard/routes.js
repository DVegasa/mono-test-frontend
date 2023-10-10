import {MenuSections} from "@/layouts/wideLayout/MenuSections";

export const RouterDashboard = {
  dashboard: () => {
    return {
      name: 'dashboard',
    }
  },
}

export const routesDashboard = [
  {
    path: "/",
    component: () => import("@/layouts/wideLayout/WideLayout.vue"),
    children: [
      {
        path: 'dashboard',
        name: 'dashboard',
        component: () => import("@/pages/dashboard/PageDashboard.vue"),
        meta: {
          pageTitle: 'Дашборд',
          menuSection: MenuSections.Dashboard,
        },
      }
    ]
  }
];
