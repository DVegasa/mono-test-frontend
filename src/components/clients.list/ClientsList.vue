<template>
  <div class="ClientsList" v-loading="clientsRepo.isLoading.value">
    <div class="search">
      <el-input
          v-model="search"
          placeholder="Поиск по ФИО или телефону"
          clearable
          @clear="loadClients"
          @keydown.enter="loadClients"
      />
      <el-button
          type="primary"
          v-if="showSearchButton"
          @click="loadClients"
      >
        Искать
      </el-button>
    </div>

    <el-scrollbar class="clients" height="none">
      <ListElementClient
          v-for="client in clients"
          :key="client?.id"
          :client="client"
          :selected="props?.selectedId === client?.id"
          @click="emit('client-clicked', client?.id)"
      />
    </el-scrollbar>

    <div class="footer box-shrink">
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
import {useClientsRepository} from "@/repositories/clients";
import ListElementClient from "@/components/listElement.client/ListElementClient.vue";

const clientsRepo = useClientsRepository();

const props = defineProps({
  selectedId: {
    type: Number,
    required: true,
  }
})

defineExpose({
  refreshData: async () => {
    await loadClients()
  }
})

const emit = defineEmits(['client-clicked'])

const curPage = ref(1);
const pageSize = ref(25);
const totalSize = ref(0);

const search = ref('');

const clients = ref([]);

onMounted(() => {
  loadClients();
})

watch([curPage, pageSize], () => {
  loadClients();
})

async function loadClients() {
  const res = await clientsRepo.getList({
    currentPage: curPage.value,
    perPage: pageSize.value,
    q: search.value,
  })

  clients.value = res.data.items;
  totalSize.value = res.data.pagination.total;
}

const showSearchButton = computed(() => {
  return search.value.length > 0;
})
</script>


<style scoped lang="scss">
@import "@/styles/app/colors.scss";

.ClientsList {
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

  .clients {
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
