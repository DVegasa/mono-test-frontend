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
          :rules="formRules"
          ref="refForm"
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
                width="250"
            >
              <template #reference>
                <el-button type="danger" plain>Удалить</el-button>
              </template>
            </el-popconfirm>
          </template>
        </div>

        <div class="bottom">
          <div class="left">
            <template v-if="isEditMode">
              <el-form-item label="ФИО" required prop="name">
                <el-input v-model="formData.name" :disabled="!isEditMode" class="text"/>
              </el-form-item>

              <el-form-item label="Телефон" required prop="phone">
                <el-input v-model="formData.phone" :disabled="!isEditMode" class="text"/>
              </el-form-item>

              <el-form-item label="Пол" required prop="sex">
                <el-switch
                    class="text"
                    v-model="formData.sex"
                    style="--el-switch-on-color: #137ace; --el-switch-off-color: #f349ff"
                    active-text="М"
                    inactive-text="Ж"
                    :disabled="!isEditMode"
                />
              </el-form-item>
            </template>

            <template v-else>
              <UiCaptionedValue class="caption" caption="ФИО" :value="client?.name"/>
              <UiCaptionedValue class="caption" caption="Телефон" :value="client?.phone"/>
              <UiCaptionedValue class="caption" caption="Пол" :value="client?.sex ? 'Мужской' : 'Женский'"/>
            </template>
          </div>

          <div class="right">
            <template v-if="isEditMode">
              <el-form-item label="Адрес" prop="address">
                <el-input
                    class="text"
                    :disabled="!isEditMode"
                    v-model="formData.address"
                    type="textarea"
                    rows="3"
                />
              </el-form-item>
            </template>
            <template v-else>
              <UiCaptionedValue class="caption" caption="Адрес" :value="client?.address"/>
            </template>
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
import UiCaptionedValue from "@/components/ui.captionedValue/UiCaptionedValue.vue";
import {useNotification} from "@/services/useNotifications";
import {clientValidationRules} from "@/rules/clientValidationRules";

const props = defineProps({
  clientId: {
    type: Number,
    required: true,
  }
})

const emit = defineEmits(['deleted', 'updated']);

const clientsRepo = useClientsRepository();
const client = ref(null);

const isEditMode = ref(false);
const refForm = ref(null);
const formData = reactive({
  name: '',
  phone: '',
  address: '',
  sex: '',
});

const formRules = reactive({
  name: clientValidationRules.name,
  phone: clientValidationRules.phone,
  sex: clientValidationRules.sex,
  address: clientValidationRules.address,
});

onMounted(() => {
  loadClient();
});

watch([props], () => {
  loadClient();
  isEditMode.value = false;
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
  refForm?.value.validate(async (valid) => {
    if (!valid) return;

    isEditMode.value = false;
    const res = await clientsRepo.update({
      id: props?.clientId,
      name: formData.name,
      phone: formData.phone,
      address: formData.address,
      sex: formData.sex,
    })

    await loadClient();
    useNotification().show({
      type: 'success',
      message: 'Информация обновлена'
    })
    emit('updated');
  });
}

async function cancelEdit() {
  await loadClient();
  isEditMode.value = false;
}

async function deleteClient() {
  const res = await clientsRepo.delete({id: props?.clientId});
  emit('deleted');
  useNotification().show({
    type: 'success',
    message: 'Клиент удалён'
  })
}
</script>


<style scoped lang="scss">
.ClientsDetailed {
  display: flex;
  flex-direction: column;
  gap: 20px;

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

        .caption {
          margin-bottom: 18px;
        }
      }
    }
  }
}
</style>
