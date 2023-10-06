export const routesCars = [
  {
    path: "/",
    component: () => import("@/layouts/wideLayout/WideLayout.vue"),
    children: [
      {
        path: 'cars',
        name: 'cars',
        component: () => import("@/pages/cars/PageCars.vue"),
        meta: {
          pageTitle: 'Автомобили',
        },
      }
    ]
  }
];
