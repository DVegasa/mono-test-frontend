<template>
  <div
      class="PageDashboard appPage"
  >
    <h1 class="header">
      Дашборд
      <div v-loading="serviceStat.isLoading.value" class="loading"/>
    </h1>

    <el-scrollbar class="page">
      <div class="stats">
        <el-statistic :value="serviceStat.stats?.clientsAll" class="stat">
          <template #title>
            Клиентов в системе
          </template>
        </el-statistic>
        <el-statistic :value="serviceStat.stats?.carsAll" class="stat">
          <template #title>
            Автомобилей в системе
          </template>
        </el-statistic>
        <el-statistic :value="serviceStat.stats?.carsParked" class="stat">
          <template #title>
            Автомобилей на парковке сейчас
          </template>
        </el-statistic>
      </div>
    </el-scrollbar>
  </div>
</template>


<script setup>

import {serviceStats} from '@/services/serviceStats';

const serviceStat = serviceStats();

</script>


<style scoped lang="scss">
@import "@/styles/app/global.scss";
@import "@/styles/app/colors.scss";

.PageDashboard {
  display: flex;
  flex-direction: column;

  .header {
    display: flex;
    align-items: center;
    gap: 10px;

    .loading {
      height: 50px;
      width: 50px;
    }
  }

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
