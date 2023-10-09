import {ref} from "vue";
import {useApi} from "@/services/useApi";

export const useStatsRepository = () => {
  const isLoading = ref(false)
  const api = useApi();

  return {
    isLoading,

    getAll: async () => {
      try {
        isLoading.value = true;

        const res = await api.get('stats/all');
        return res.data;
      } finally {
        isLoading.value = false;
      }
    }
  }
}
