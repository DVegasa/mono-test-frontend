import {MenuSections} from "@/layouts/wideLayout/MenuSections";

export const RouterCars = {
  cars: () => {
    return {
      name: 'cars',
    }
  },
  carsDetailed: (carId) => {
    return {
      name: 'cars.detailed',
      params: {
        id: carId,
      }
    }
  },
  carsNew: () => {
    return {
      name: 'cars.new',
    }
  }
}

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
          menuSection: MenuSections.Cars,
        },
      },
      {
        path: 'cars/new',
        name: 'cars.new',
        component: () => import("@/pages/cars/PageCars.vue"),
        meta: {
          pageTitle: 'Новый авто',
          menuSection: MenuSections.Cars,
        }
      },
      {
        path: 'cars/:id',
        name: 'cars.detailed',
        component: () => import("@/pages/cars/PageCars.vue"),
        meta: {
          pageTitle: 'Автомобили',
          menuSection: MenuSections.Cars,
        }
      },
    ]
  }
];
