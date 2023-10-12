export const routesDev = [
  {
    path: "/",
    component: () => import("@/layouts/wideLayout/WideLayout.vue"),
    children: [
      {
        path: 'dev',
        component: () => import("@/pages/dev/PageDev.vue"),
      }
    ]
  }
];
