<template>
  <div
      class="PageDashboard appPage"
  >
    <h1>Дашборд</h1>

    <el-scrollbar class="page">
      <div class="stats">
        <el-statistic value="20" class="stat">
          <template #title>
            Клиентов в системе
          </template>
        </el-statistic>
        <el-statistic value="20" class="stat">
          <template #title>
            Автомобилей в системе
          </template>
        </el-statistic>
        <el-statistic value="20" class="stat">
          <template #title>
            Автомобилей на парковке сейчас
          </template>
        </el-statistic>
      </div>
    </el-scrollbar>
  </div>
</template>


<script setup>

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
