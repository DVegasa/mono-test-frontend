<template>
  <div class="CarsDetailed">
    <div class="car" v-loading="carsRepo.isLoading.value">

      <el-form
          class="fields"
          label-position="top"
          :model="formData"
          :rules="formRules"
          ref="refForm"
      >

        <div class="buttons">
          <template v-if="isEditMode">
            <el-button type="primary" @click="saveEdit">Сохранить</el-button>
            <el-button type="danger" plain @click="cancelEdit">Отменить редактирование</el-button>
          </template>
          <template v-else-if="props?.creationMode">
            <el-button type="primary" @click="createCar">Добавить машину</el-button>
          </template>
          <template v-else>
            <el-button type="primary" @click="isEditMode = true">Редактировать</el-button>

            <el-popconfirm
                title="Подтвердите удаление"
                @confirm="deleteCar"
                width="250"
            >
              <template #reference>
                <el-button type="danger" plain>Удалить</el-button>
              </template>
            </el-popconfirm>
          </template>
        </div>

        <template v-if="isEditable">
          <el-form-item label="Марка" required prop="brand">
            <el-input v-model="formData.brand" :disabled="!isEditable"/>
          </el-form-item>
          <el-form-item label="Модель" required prop="model">
            <el-input v-model="formData.model" :disabled="!isEditable"/>
          </el-form-item>
          <el-form-item label="Цвет" required prop="color">
            <el-input v-model="formData.color" :disabled="!isEditable"/>
          </el-form-item>
          <el-form-item label="Гос.знак" required prop="plate">
            <el-input v-model="formData.plate" :disabled="!isEditable"/>
          </el-form-item>

          <el-form-item label="Владелец" required prop="ownerId">
            <ClientsPicker
                v-model="formData.ownerId"
            />
          </el-form-item>
        </template>

        <template v-else>
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

          <div class="owner" v-loading="clientsRepo.isLoading.value">
            <h2>Владелец</h2>
            <ListElementClient :client="owner" @click="ownerClicked(owner?.id)"/>
          </div>
        </template>

      </el-form>
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
import {useNotification} from "@/services/useNotifications";
import {carValidationRules} from "@/rules/carValidationRules";
import ClientsPicker from "@/components/clients.picker/ClientsPicker.vue";

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
  return (props?.carId && isEditMode.value) || (props?.creationMode)
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

const formRules = reactive({
  brand: carValidationRules.brand,
  model: carValidationRules.model,
  color: carValidationRules.color,
  plate: carValidationRules.plate,
  isParked: carValidationRules.isParked,
  ownerId: carValidationRules.ownerId,
});

watch([formData], () => {
  // Замена русских букв на английские
  formData.plate = formData.plate.replace('А', 'A');
  formData.plate = formData.plate.replace('В', 'B');
  formData.plate = formData.plate.replace('Е', 'E');
  formData.plate = formData.plate.replace('К', 'K');
  formData.plate = formData.plate.replace('М', 'M');
  formData.plate = formData.plate.replace('Н', 'H');
  formData.plate = formData.plate.replace('О', 'O');
  formData.plate = formData.plate.replace('Р', 'P');
  formData.plate = formData.plate.replace('С', 'C');
  formData.plate = formData.plate.replace('Т', 'T');
  formData.plate = formData.plate.replace('У', 'Y');
  formData.plate = formData.plate.replace('Х', 'X');
});

async function loadCar() {
  if (props?.carId) {
    const res = await carsRepo.get({id: props?.carId});
    car.value = res.data
  } else {
    car.value = null;
  }

  formData.brand = car.value?.brand;
  formData.model = car.value?.model;
  formData.color = car.value?.color;
  formData.plate = car.value?.plate;
  formData.isParked = car.value?.isParked ?? false;
  formData.ownerId = car.value?.ownerId;
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

async function saveEdit() {
  refForm.value?.validate(async (valid) => {
    if (!valid) return;

    isEditMode.value = false;
    const res = await carsRepo.update({
      id: props?.carId,
      brand: formData?.brand,
      model: formData?.model,
      color: formData?.color,
      plate: formData?.plate,
      isParked: formData?.isParked,
      ownerId: formData?.ownerId,
    });

    await loadCar();
    useNotification().show({
      type: 'success',
      message: 'Информация обновлена'
    });
    emit('updated');
  })
}

async function cancelEdit() {
  await loadCar();
  isEditMode.value = false;
}

async function deleteCar() {
  const res = await carsRepo.delete({id: props?.carId});
  emit('deleted');
  useNotification().show({
    type: 'success',
    message: 'Машина удалена',
  })
}

async function createCar() {
  refForm.value?.validate(async (valid) => {
    if (!valid) return;

    const res = await carsRepo.create({
      brand: formData?.brand,
      model: formData?.model,
      color: formData?.color,
      plate: formData?.plate,
      isParked: formData?.isParked,
      ownerId: formData?.ownerId,
    })

    useNotification().show({
      type: 'success',
      message: 'Машина добавлена',
    })
    emit('created');
  })
}

</script>


<style scoped lang="scss">
@import "@/styles/app/colors.scss";

.CarsDetailed {

  .buttons {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 12px;
  }

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
