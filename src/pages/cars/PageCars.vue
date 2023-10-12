<template>
  <div class="PageCars appPage">
    <div class="left">
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

      <CarsList
          ref="refCarsList"
          class="list"
          @car-clicked="carSelected"
          :selected-id="selectedCarId"
      />
    </div>

    <div class="right">
      <el-scrollbar>
        <CarsDetailed
            v-if="selectedCarId || creationMode"
            class="detailed"
            :car-id="selectedCarId"
            @deleted="carDeleted"
            @updated="carUpdated"
            @created="carCreated"
            @park-switched="carParkSwitched"
        />
      </el-scrollbar>
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
  selectedCarId.value = null;
  creationMode.value = true;
  router.push(RouterCars.cars());
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

  .left {
    width: 560px;
    display: flex;
    flex-direction: column;

    .btnCreate {
      margin-left: 12px;
    }

    .list {
      border-right: 1px solid $color-border;
      height: 100%;
    }
  }

  .right {
    flex: 1;
    padding-left: 20px;
    padding-top: 20px;
    margin-top: 64px;

    .detailed {
      max-width: 700px;
    }
  }
}
</style>
