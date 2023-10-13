import {useApi} from '@/services/useApi';
import {ref} from 'vue';

export const useParkingRepository = () => {
  const isLoading = ref(false);
  const api = useApi();

  return {
    isLoading,

    switchParking: async ({
      carId,
    }) => {
      try {
        isLoading.value = true;
        const res = await api.post('parking/switchParking', {}, {
          carId,
        });
        return res.data;
      } finally {
        isLoading.value = false;
      }
    }
  };
};
