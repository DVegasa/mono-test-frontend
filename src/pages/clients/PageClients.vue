<template>
  <div class="PageClients appPage">
    <h1>
      Клиенты
      <el-button
          class="btnCreate"
          type="primary"
          @click="createClient"
      >
        <Icon icon="bx:plus" class="icon"/>
        Добавить
      </el-button>
    </h1>


    <div class="body">
      <ClientsList
          ref="refClientsList"
          class="list"
          @client-clicked="clientSelected"
          :selected-id="selectedClientId"
      />
      <ClientsDetailed
          v-if="selectedClientId || creationMode"
          class="detailed"
          :client-id="selectedClientId"
          @deleted="clientDeleted"
          @updated="clientUpdated"
          @created="clientCreated"
          :creation-mode="creationMode"
      />
    </div>

  </div>
</template>


<script setup>
import ClientsList from "@/components/clients.list/ClientsList.vue";
import {ref} from "vue";
import ClientsDetailed from "@/components/clients.detailed/ClientsDetailed.vue";
import {useNotification} from "@/services/useNotifications";
import {Icon} from "@iconify/vue";

const selectedClientId = ref(null);
const creationMode = ref(false);
const refClientsList = ref(null);

function clientDeleted() {
  refClientsList.value.refreshData();
  selectedClientId.value = null;
}

function clientUpdated() {
  refClientsList.value.refreshData();
}

function clientCreated() {
  refClientsList.value.refreshData();
  selectedClientId.value = null;
  creationMode.value = false;
}

function createClient() {
  selectedClientId.value = null;
  creationMode.value = true;
}

function clientSelected(clientId) {
  creationMode.value = false;
  selectedClientId.value = clientId;
}
</script>


<style scoped lang="scss">
@import "@/styles/app/sizes.scss";
@import "@/styles/app/colors.scss";

.PageClients {
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
