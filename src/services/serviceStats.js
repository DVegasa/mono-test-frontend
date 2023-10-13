import {reactive} from 'vue';
import {useStatsRepository} from '@/repositories/stats';

const statsRepo = useStatsRepository();

const stats = reactive({
  carsAll: null,
  carsParked: null,
  clientsAll: null,
});

async function updateStats() {
  const res = await statsRepo.getAll();
  stats.carsAll = res.data.cars.all;
  stats.carsParked = res.data.cars.parked;
  stats.clientsAll = res.data.clients.all;
}

export const serviceStats = () => {

  return {
    stats,
    isLoading: statsRepo.isLoading,
    updateStats,
    start: async ({refreshDelayMs}) => {
      await updateStats();
      setTimeout(updateStats, refreshDelayMs);
    }
  };

};
