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
import {computed, ref} from "vue";
import ClientsDetailed from "@/components/clients.detailed/ClientsDetailed.vue";
import {Icon} from "@iconify/vue";
import {useRoute, useRouter} from "vue-router";
import {RouterClients} from "@/pages/clients/routes";

const route = useRoute();
const router = useRouter();

const selectedClientId = computed(() => {
  return route.params?.id;
});
const creationMode = computed(() => {
  return route.name === RouterClients.clientsNew().name;
});
const refClientsList = ref(null);

function clientDeleted() {
  refClientsList.value.refreshData();
  router.push(RouterClients.clients());
}

function clientUpdated() {
  refClientsList.value.refreshData();
}

function clientCreated() {
  refClientsList.value.refreshData();
  router.push(RouterClients.clients());
}

function createClient() {
  router.push(RouterClients.clientsNew());
}

function clientSelected(clientId) {
  router.push(RouterClients.clientsDetailed(clientId));
}
</script>


<style scoped lang="scss">
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
