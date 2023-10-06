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
        },
      }
    ]
  }
];
