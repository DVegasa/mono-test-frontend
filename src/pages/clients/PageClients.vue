<template>
  <div class="PageClients appPage">
    <h1>Клиенты</h1>

    <div class="body">
      <ClientsList
          ref="refClientsList"
          class="list"
          @client-clicked="(id) => selectedClientId = id"
          :selected-id="selectedClientId"
      />
      <ClientsDetailed
          v-if="selectedClientId"
          class="detailed"
          :client-id="selectedClientId"
          @deleted="refreshData"
      />
    </div>

  </div>
</template>


<script setup>
import ClientsList from "@/components/clients.list/ClientsList.vue";
import {ref} from "vue";
import ClientsDetailed from "@/components/clients.detailed/ClientsDetailed.vue";
import {useNotification} from "@/services/useNotifications";

const selectedClientId = ref(null);
const refClientsList = ref(null);

function refreshData() {
  refClientsList.value.refreshData();
  selectedClientId.value = null;
  useNotification().show({
    type: 'success',
    message: 'Клиент удалён'
  })
}
</script>


<style scoped lang="scss">
@import "@/styles/app/sizes.scss";

.PageClients {
  display: flex;
  flex-direction: column;
  //position: relative;

  .body {
    display: flex;
    flex-direction: row;
    gap: 12px;
    //height: 100%;
    flex: 1;

    .list {
      width: 560px;
    }

    .detailed {
      flex: 1;
    }
  }
}
</style>
