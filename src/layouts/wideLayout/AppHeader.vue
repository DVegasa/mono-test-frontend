<template>
  <div class="AppHeader">
    <router-link to="/" class="logo">
      <img src="@/assets/logo.png" height="40"/>
      <div class="title">Моя парковка</div>
    </router-link>

    <el-tooltip
        content="Обновляется каждые несколько секунд"
        v-if="stats.carsParked"
    >
      <div class="stats">
        <transition appear>
          <div class="stat">
            Автомобилей на парковке: {{ stats.carsParked }}
          </div>
        </transition>
        <Icon icon="bx:help-circle" class="icon"/>
      </div>
    </el-tooltip>
  </div>
</template>


<script setup>
import {Icon} from '@iconify/vue';
import {serviceStats} from '@/services/serviceStats';

const stats = serviceStats().stats;

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
    display: flex;
    align-items: center;
    gap: 8px;

    .v-enter-active,
    .v-leave-active {
      transition: opacity 0.5s ease;
    }

    .v-enter-from,
    .v-leave-to {
      opacity: 0;
    }

    .icon {
      color: #797979;
    }
  }
}
</style>
