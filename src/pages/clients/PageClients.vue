<template>
  <div class="PageClients appPage">
    <h1>Клиенты</h1>

    <div class="body">
      <ClientsList class="list" @client-clicked="(id) => selectedClientId = id"/>
      <div class="detailed">{{ selectedClientId }}</div>
    </div>

  </div>
</template>


<script setup>
import ClientsList from "@/components/clients.list/ClientsList.vue";
import {ref} from "vue";

const selectedClientId = ref(null);
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
