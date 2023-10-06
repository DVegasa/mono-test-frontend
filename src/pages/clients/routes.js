export const routesClients = [
  {
    path: "/",
    component: () => import("@/layouts/wideLayout/WideLayout.vue"),
    children: [
      {
        path: 'clients',
        name: 'clients',
        component: () => import("@/pages/clients/PageClients.vue"),
        meta: {
          pageTitle: 'Клиенты',
        },
      }
    ]
  }
];
