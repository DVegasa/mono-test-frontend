<template>
  <div
      class="PageDashboard appPage"
  >
    <h1>Дашборд</h1>

    <el-scrollbar class="page">
      <div class="stats">
        <el-statistic v-loading="statsRepo.isLoading.value" :value="stats.clientsAll" class="stat">
          <template #title>
            Клиентов в системе
          </template>
        </el-statistic>
        <el-statistic v-loading="statsRepo.isLoading.value" :value="stats.carsAll" class="stat">
          <template #title>
            Автомобилей в системе
          </template>
        </el-statistic>
        <el-statistic v-loading="statsRepo.isLoading.value" :value="stats.carsParked" class="stat">
          <template #title>
            Автомобилей на парковке сейчас
          </template>
        </el-statistic>
      </div>
    </el-scrollbar>
  </div>
</template>


<script setup>

import {useStatsRepository} from "@/repositories/stats";
import {onMounted, reactive} from "vue";

const statsRepo = useStatsRepository();

const stats = reactive({
  carsAll: null,
  carsParked: null,
  clientsAll: null,
});

onMounted(() => {
  loadStats()
})

async function loadStats() {
  const res = await statsRepo.getAll();
  stats.carsAll = res.data.cars.all;
  stats.carsParked = res.data.cars.parked;
  stats.clientsAll = res.data.clients.all;
}

</script>


<style scoped lang="scss">
@import "@/styles/app/global.scss";
@import "@/styles/app/colors.scss";

.PageDashboard {
  display: flex;
  flex-direction: column;

  .page {
    margin: 20px;

    .stats {
      display: flex;
      align-items: start;
      gap: 12px;

      .stat {
        @extend .niceShadow;
        padding: 20px;
        border-radius: 6px;
        border: 1px solid $color-border;
      }
    }
  }
}
</style>
