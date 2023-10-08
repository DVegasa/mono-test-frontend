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
    }
  }
}
