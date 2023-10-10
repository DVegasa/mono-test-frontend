import {MenuSections} from "@/layouts/wideLayout/MenuSections";

export const RouterClients = {
  clients: () => {
    return {
      name: 'clients',
    }
  },
  clientsDetailed: (clientId) => {
    return {
      name: 'clients.detailed',
      params: {
        id: clientId,
      }
    }
  }
}

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
          menuSection: MenuSections.Clients,
        },
      },
      {
        path: 'clients/:id',
        name: 'clients.detailed',
        component: () => import("@/pages/clients/PageClients.vue" ),
        meta: {
          pageTitle: 'Клиенты',
          menuSection: MenuSections.Clients,
        },
      }
    ]
  }
];
