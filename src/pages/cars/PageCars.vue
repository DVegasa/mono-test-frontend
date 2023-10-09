<template>
  <div class="PageCars appPage">
    <h1>
      Автомобили
      <el-button
          class="btnCreate"
          type="primary"
          @click="createClient"
      >
        <Icon icon="bx:plus" class="icon"/>
        Добавить
      </el-button>
    </h1>
  </div>
</template>


<script setup>

import {Icon} from "@iconify/vue";
</script>


<style scoped lang="scss">
.PageCars {
}
</style>
