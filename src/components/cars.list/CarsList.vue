<template>
  <div class="CarsList" v-loading="carsRepo.isLoading.value">
    <div class="search">
      <el-input
          v-model="search"
          placeholder="Поиск по марке, модели или рег.знаку"
          clearable
          @clear="loadCars"
          @keydown.enter="loadCars"
      />
      <el-button
          type="primary"
          v-if="showSearchButton"
          @click="loadCars"
      >
        Искать
      </el-button>
    </div>

    <el-scrollbar class="cars" height="none">
      <ListElementCar
          v-for="car in cars"
          :key="car?.id"
          :car="car"
          :selected="props?.selectedId == car?.id"
          @click="emit('car-clicked', car?.id)"
      />
    </el-scrollbar>

    <div class="footer">
      <el-pagination
          v-model:current-page="curPage"
          v-model:page-size="pageSize"
          :page-sizes="[10, 25, 50, 100]"
          :small="true"
          :background="true"
          layout="total, sizes, prev, pager, next"
          :total="totalSize"
      />
    </div>
  </div>
</template>


<script setup>
import {computed, onMounted, ref, watch} from "vue";
import ListElementClient from "@/components/listElement.client/ListElementClient.vue";
import {useCarsRepository} from "@/repositories/cars";
import ListElementCar from "@/components/listElement.car/ListElementCar.vue";

const carsRepo = useCarsRepository();

const props = defineProps({
  selectedId: {
    type: Number,
    required: true,
  },
  ownerId: {
    type: Number,
    required: false,
  }
})
const _prevOwnerId = ref(null);

defineExpose({
  refreshData: async () => {
    await loadCars()
  }
})

const emit = defineEmits(['car-clicked'])

const curPage = ref(1);
const pageSize = ref(25);
const totalSize = ref(0);

const search = ref('');

const cars = ref([]);

onMounted(() => {
  loadCars();
})

watch([curPage, pageSize], () => {
  loadCars();
})

watch([props], () => {
  if (_prevOwnerId.value !== props?.ownerId) {
    curPage.value = 1;
    totalSize.value = 0;
    loadCars();
  }
  _prevOwnerId.value = props?.ownerId;
})

async function loadCars() {
  const res = await carsRepo.getList({
    currentPage: curPage.value,
    perPage: pageSize.value,
    q: search.value,
    ownerId: props?.ownerId,
  })

  cars.value = res.data.items;
  totalSize.value = res.data.pagination.total;
}

const showSearchButton = computed(() => {
  return search.value.length > 0;
})
</script>


<style scoped lang="scss">
@import "@/styles/app/colors.scss";

.CarsList {
  position: relative;

  .search {
    padding: 12px;
    display: flex;
    align-items: center;
    gap: 12px;

    position: absolute;
    top: 0;
    left: 0;
    right: 0;
  }

  .cars {
    position: absolute;
    top: 50px;
    left: 0;
    right: 0;
    bottom: 50px;

    &.el-scrollbar {
      height: unset;
    }
  }

  .footer {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;

    border-top: 1px solid $color-border;

    display: flex;
    align-items: center;
    justify-content: start;
    padding: 12px;
    background-color: white;

    -webkit-box-shadow: 2px -7px 35px 4px rgba(34, 60, 80, 0.18);
    -moz-box-shadow: 2px -7px 35px 4px rgba(34, 60, 80, 0.18);
    box-shadow: 2px -7px 35px 4px rgba(34, 60, 80, 0.18);
  }
}
</style>
