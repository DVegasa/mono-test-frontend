import {ref} from "vue";
import {useApi} from "@/services/useApi";

export const useClientsRepository = () => {
  const isLoading = ref(false)
  const api = useApi();

  return {
    isLoading,

    getList: async ({
      currentPage = 1,
      perPage = 10,
      q = null,
    }) => {
      try {
        isLoading.value = true;

        const res = await api.get('clients/getList', {
          currentPage,
          perPage,
          q,
        });
        return res.data;
      } finally {
        isLoading.value = false;
      }
    },

    get: async ({
      id,
    }) => {
      try {
        isLoading.value = true;
        const res = await api.get('clients/get', {
          clientId: id,
        });
        return res.data;
      } finally {
        isLoading.value = false;
      }
    },

    delete: async ({
      id,
    }) => {
      try {
        isLoading.value = true;
        const res = await api.post('clients/delete', {}, {
          clientId: id,
        })
        return res.data;
      } finally {
        isLoading.value = false;
      }
    },

    update: async ({
      id,
      name,
      sex,
      phone,
      address,
    }) => {
      try {
        isLoading.value = true;
        const res = await api.post('clients/update', {}, {
          clientId: id,
          name,
          sex,
          phone,
          address,
        });
        return res.data;
      } finally {
        isLoading.value = false;
      }
    },

    create: async ({
      name,
      sex,
      phone,
      address,
    }) => {
      try {
        isLoading.value = true;
        const res = await api.post('clients/create', {}, {
          name,
          sex,
          phone,
          address,
        });
        return res.data;
      } finally {
        isLoading.value = false;
      }
    }
  }
}
