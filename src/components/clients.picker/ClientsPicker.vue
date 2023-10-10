<template>
  <div class="ClientsPicker">
    <div class="textSelected">Выбран:</div>
    <ListElementClient
        class="client"
        :client="client"
    />

    <ClientsList
        class="list"
        :selected-id="props?.modelValue"
    />
  </div>
</template>


<script setup>
import ClientsList from "@/components/clients.list/ClientsList.vue";
import {onMounted, ref, watch} from "vue";
import ListElementClient from "@/components/listElement.client/ListElementClient.vue";
import {useClientsRepository} from "@/repositories/clients";

const props = defineProps({
  modelValue: {
    required: true,
  }
});

const emits = defineEmits(['update:modelValue']);

const clientsRepo = useClientsRepository();

const client = ref(null);

onMounted(() => {
  loadClient();
})

watch([props], () => {
  loadClient();
})

async function loadClient() {
  if (!props?.modelValue) return;

  const res = await clientsRepo.get({id: props?.modelValue});
  client.value = res.data;
}
</script>


<style scoped lang="scss">
.ClientsPicker {
  display: flex;
  flex-direction: column;
  gap: 10px;

  .client {
    height: 35px;
  }

  .list {
    height: 500px;
  }
}
</style>
