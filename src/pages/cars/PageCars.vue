<template>
  <div class="PageCars appPage">
    <h1>
      Автомобили
      <el-button
          class="btnCreate"
          type="primary"
          @click="createCar"
      >
        <Icon icon="bx:plus" class="icon"/>
        Добавить
      </el-button>
    </h1>

    <div class="body">
      <CarsList
          ref="refCarsList"
          class="list"
          @car-clicked="carSelected"
          :selected-id="selectedCarId"
      />
    </div>
  </div>
</template>


<script setup>
import {Icon} from "@iconify/vue";
import {ref} from "vue";
import CarsList from "@/components/cars.list/CarsList.vue";

const selectedCarId = ref(null);
const creationMode = ref(false);
const refCarsList = ref(null);

function carDeleted() {
  refCarsList.value.refreshData();
  selectedCarId.value = null;
}

function carUpdated() {
  refCarsList.value.refreshData();
}

function carCreated() {
  refCarsList.value.refreshData();
  selectedCarId.value = null;
  creationMode.value = false;
}

function createCar() {
  selectedCarId.value = null;
  creationMode.value = true;
}

function carSelected(clientId) {
  creationMode.value = false;
  selectedCarId.value = clientId;
}
</script>


<style scoped lang="scss">
@import "@/styles/app/colors.scss";

.PageCars {
  display: flex;
  flex-direction: column;

  .btnCreate {
    margin-left: 12px;
  }

  .body {
    display: flex;
    flex-direction: row;
    gap: 12px;
    //height: 100%;
    flex: 1;

    .list {
      width: 560px;
      border-right: 1px solid $color-border;
    }

    .detailed {
      flex: 1;
    }
  }
}
</style>
