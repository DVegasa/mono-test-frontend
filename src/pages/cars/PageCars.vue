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
      <CarsDetailed
          v-if="selectedCarId || creationMode"
          class="detailed"
          :car-id="selectedCarId"
          @deleted="carDeleted"
          @updated="carUpdated"
          @created="carCreated"
          @park-switched="carParkSwitched"
          :creation-mode="creationMode"
      />
    </div>
  </div>
</template>


<script setup>
import {Icon} from "@iconify/vue";
import {computed, ref} from "vue";
import CarsList from "@/components/cars.list/CarsList.vue";
import CarsDetailed from "@/components/cars.detailed/CarsDetailed.vue";
import ClientsDetailed from "@/components/clients.detailed/ClientsDetailed.vue";
import {useRoute, useRouter} from "vue-router";
import {RouterCars} from "@/pages/cars/routes";
import {RouterClients} from "@/pages/clients/routes";

const route = useRoute();
const router = useRouter();

const selectedCarId = computed(() => {
  return route.params?.id;
});
const creationMode = ref(false);
const refCarsList = ref(null);

function carDeleted() {
  refCarsList.value.refreshData();
  router.push(RouterCars.cars());
}

function carUpdated() {
  refCarsList.value.refreshData();
}

function carCreated() {
  refCarsList.value.refreshData();
  router.push(RouterCars.cars());
  creationMode.value = false;
}

function carParkSwitched() {
  refCarsList.value.refreshData();
}

function createCar() {
  router.push(RouterCars.cars());
  creationMode.value = true;
}

function carSelected(carId) {
  creationMode.value = false;
  router.push(RouterCars.carsDetailed(carId))
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
      max-width: 600px;
    }
  }
}
</style>
