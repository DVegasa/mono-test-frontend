import {ref} from "vue";
import {useApi} from "@/services/useApi";

export const useCarsRepository = () => {
  const isLoading = ref(false)
  const api = useApi();

  return {
    isLoading,

    getList: async ({
      currentPage = 1,
      perPage = 10,
      q = null,
      ownerId = null,
    }) => {
      try {
        isLoading.value = true;

        const res = await api.get('cars/getList', {
          currentPage,
          perPage,
          q,
          ownerId,
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
        const res = await api.get('cars/get', {
          carId: id,
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
        const res = await api.post('cars/delete', {}, {
          carId: id,
        })
        return res.data;
      } finally {
        isLoading.value = false;
      }
    },

    update: async ({
      id,
      brand,
      model,
      color,
      plate,
      isParked,
      ownerId,
    }) => {
      try {
        isLoading.value = true;
        const res = await api.post('cars/update', {}, {
          carId: id,
          brand,
          model,
          color,
          plate,
          isParked,
          ownerId,
        });
        return res.data;
      } finally {
        isLoading.value = false;
      }
    },

    create: async ({
      brand,
      model,
      color,
      plate,
      isParked,
      ownerId,
    }) => {
      try {
        isLoading.value = true;
        const res = await api.post('cars/create', {}, {
          brand,
          model,
          color,
          plate,
          isParked,
          ownerId,
        });
        return res.data;
      } finally {
        isLoading.value = false;
      }
    }
  }
}
