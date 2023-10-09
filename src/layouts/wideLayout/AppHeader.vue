<template>
  <div class="AppHeader">
    <router-link to="/" class="logo">
      <img src="@/assets/logo.png" height="40"/>
      <div class="title">Моя парковка</div>
    </router-link>

    <div class="stats">
      <transition appear>
        <div class="stat" v-if="stats?.carsParked">
          Автомобилей на парковке: {{ stats?.carsParked }}
        </div>
      </transition>
    </div>
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
  refreshStats()
})


async function loadStats() {
  const res = await statsRepo.getAll();
  stats.carsAll = res.data.cars.all;
  stats.carsParked = res.data.cars.parked;
  stats.clientsAll = res.data.clients.all;
}

async function refreshStats() {
  await loadStats();
  setTimeout(refreshStats, 5000);
}
</script>


<style scoped lang="scss">
@import "@/styles/app/colors.scss";
@import "@/styles/app/global.scss";
@import "@/styles/app/sizes.scss";

.AppHeader {
  display: flex;
  align-items: center;
  -webkit-box-shadow: 0px -7px 35px 4px rgba(34, 60, 80, 0.18);
  -moz-box-shadow: 0px -7px 35px 4px rgba(34, 60, 80, 0.18);
  box-shadow: 0px -7px 35px 4px rgba(34, 60, 80, 0.18);
  border-bottom: 1px solid $color-border;
  background-color: $color-bg;

  .logo {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: $logoPadding;
    height: $logoSize;
  }

  .title {
    font-weight: 500;
    color: black;
    padding-left: 12px;
    font-size: 18px;
  }

  .stats {
    margin-left: 10px;
    padding-left: 14px;
    font-size: 12px;
    border-left: 1px solid $color-border;

    .v-enter-active,
    .v-leave-active {
      transition: opacity 0.5s ease;
    }

    .v-enter-from,
    .v-leave-to {
      opacity: 0;
    }
  }
}
</style>
