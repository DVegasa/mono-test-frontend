<template>
  <div class="CarsDetailed">
    <div class="car" v-loading="carsRepo.isLoading.value">
      <div class="top">
        <UiPlate :plate="car?.plate" size="20px"/>

        <div class="parked">
          <Icon icon="uil:parking-square" v-if="car?.isParked" class="icon"/>
          <div class="text" v-if="car?.isParked">Припаркован</div>
          <div class="text" v-else>Не на парковке</div>
        </div>

        <el-button
            type="primary"
            size="small"
            :plain="!car?.isParked"
            @click="switchParking"
        >
          <template v-if="car?.isParked">Снять с парковки</template>
          <template v-else>Поставить на парковку</template>
        </el-button>
      </div>
      <div class="name">
        {{ car?.brand }}
        {{ car?.model }}
      </div>
      <div class="color">
        {{ car?.color }}
      </div>
    </div>

    <div class="owner" v-loading="clientsRepo.isLoading.value">
      <h2>Владелец</h2>
      <ListElementClient :client="owner" @click="ownerClicked(owner?.id)"/>
    </div>
  </div>
</template>


<script setup>
import {useClientsRepository} from "@/repositories/clients";
import {useCarsRepository} from "@/repositories/cars";
import {computed, onMounted, reactive, ref, watch} from "vue";
import {clientValidationRules} from "@/rules/clientValidationRules";
import UiPlate from "@/components/ui.plate/UiPlate.vue";
import {Icon} from "@iconify/vue";
import {useParkingRepository} from "@/repositories/parking";
import ListElementClient from "@/components/listElement.client/ListElementClient.vue";
import {useRouter} from "vue-router";
import {RouterClients} from "@/pages/clients/routes";

const props = defineProps({
  carId: {
    required: true,
    type: Number,
  },
  creationMode: {
    required: false,
    type: Boolean,
  }
})

const emit = defineEmits(['deleted', 'updated', 'created', 'parkSwitched']);

const router = useRouter();

onMounted(() => {
  refreshData();
})

watch([props], () => {
  refreshData();
  isEditMode.value = false;
})

const isEditable = computed(() => {
  return (props?.carId && isEditMode) || (props?.creationMode)
});

async function refreshData() {
  await loadCar();
  await loadOwner();
}

const clientsRepo = useClientsRepository();
const carsRepo = useCarsRepository();
const parkingRepo = useParkingRepository();

const owner = ref(null);
const car = ref(null);

const isEditMode = ref(false);
const refForm = ref(null);
const formData = reactive({
  brand: '',
  model: '',
  color: '',
  plate: '',
  isParked: '',
  ownerId: '',
});

const formRules = reactive({});

async function loadCar() {
  if (props?.carId) {
    const res = await carsRepo.get({id: props?.carId});
    car.value = res.data
  } else {
    car.value = null;
  }

  formData.brand = car?.brand;
  formData.model = car?.model;
  formData.color = car?.color;
  formData.plate = car?.plate;
  formData.isParked = car?.isParked ?? false;
  formData.ownerId = car?.ownerId;
}

async function loadOwner() {
  if (car.value?.ownerId) {
    const res = await clientsRepo.get({id: car.value?.ownerId});
    owner.value = res.data;
  }
}

async function switchParking() {
  if (!car.value) return;
  const res = await parkingRepo.switchParking({carId: car?.value?.id});
  await refreshData();
  emit('parkSwitched');
}

function ownerClicked(clientId) {
  router.push(RouterClients.clientsDetailed(clientId));
}

</script>


<style scoped lang="scss">
@import "@/styles/app/colors.scss";

.CarsDetailed {

  .car {
    display: flex;
    flex-direction: column;
    gap: 4px;

    .top {
      display: flex;
      align-items: center;
      gap: 12px;

      .parked {
        display: flex;
        align-items: center;
        gap: 4px;
        border-left: 1px solid black;
        padding-left: 8px;

        .text {
          font-size: 14px;
        }
      }
    }

    .name {
      font-size: 20px;
      font-weight: 500;
    }
  }

  .owner {
    margin-top: 20px;

    h2 {
      margin-bottom: 5px;
    }
  }
}
</style>
