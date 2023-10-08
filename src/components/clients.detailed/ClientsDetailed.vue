<template>
  <div class="ClientsDetailed">
    <div class="info" v-loading="clientsRepo.isLoading.value">
      <div class="ava">
        <img :src="'https://i.pravatar.cc/300?u='+clientId" class="image" height="200" width="200"/>
      </div>
      <el-form
          class="fields"
          label-position="top"
          :model="formData"
      >
        <div class="top">
          <template v-if="isEditMode">
            <el-button type="primary" @click="saveEdit">Сохранить</el-button>
            <el-button type="danger" plain @click="cancelEdit">Отменить редактирование</el-button>
          </template>
          <template v-else>
            <el-button type="primary" @click="isEditMode = true">Редактировать</el-button>

            <el-popconfirm
                title="Подтвердите удаление"
                @confirm="deleteClient"
            >
              <template #reference>
                <el-button type="danger" plain>Удалить</el-button>
              </template>
            </el-popconfirm>
          </template>
        </div>

        <div class="bottom">
          <div class="left">
            <el-form-item label="ФИО" required>
              <el-input v-model="formData.name" :disabled="!isEditMode"/>
            </el-form-item>
            <el-form-item label="Телефон" required>
              <el-input v-model="formData.phone" :disabled="!isEditMode"/>
            </el-form-item>
            <el-switch
                v-model="formData.sex"
                style="--el-switch-on-color: #137ace; --el-switch-off-color: #f349ff"
                active-text="М"
                inactive-text="Ж"
                :disabled="!isEditMode"
            />
          </div>

          <div class="right">
            <el-form-item label="Адрес">
              <el-input
                  :disabled="!isEditMode"
                  v-model="formData.address"
                  type="textarea"
                  rows="3"
              />
            </el-form-item>
          </div>
        </div>

      </el-form>
    </div>

    <div class="cars">
      <h2>Автомобили</h2>
    </div>
  </div>
</template>


<script setup>
import {onMounted, reactive, ref, watch} from "vue";
import {useClientsRepository} from "@/repositories/clients";

const props = defineProps({
  clientId: {
    type: Number,
    required: true,
  }
})

const emit = defineEmits(['deleted']);

const clientsRepo = useClientsRepository();
const client = ref(null);

const isEditMode = ref(false);
const formData = reactive({
  name: '',
  phone: '',
  address: '',
  sex: '',
});

onMounted(() => {
  loadClient();
});

watch([props], () => {
  loadClient();
})

async function loadClient() {
  const res = await clientsRepo.get({id: props?.clientId});
  client.value = res.data;

  formData.name = client.value.name
  formData.phone = client.value.phone
  formData.address = client.value.address
  formData.sex = client.value.sex
}

async function saveEdit() {

  isEditMode.value = false;
}

async function cancelEdit() {
  await loadClient();
  isEditMode.value = false;
}

async function deleteClient() {
  const res = await clientsRepo.delete({id: props?.clientId});
  emit('deleted');
}
</script>


<style scoped lang="scss">
.ClientsDetailed {
  display: flex;
  flex-direction: column;
  gap: 40px;

  .info {
    display: flex;
    gap: 20px;

    .ava {
      .image {
        border-radius: 6px;
      }
    }

    .fields {
      display: flex;
      flex-direction: column;
      gap: 20px;

      .top {
        display: flex;
        align-items: center;
      }

      .bottom {
        width: 600px;
        display: flex;
        gap: 20px;

        .left,
        .right {
          flex: 1;
        }
      }
    }
  }
}
</style>
