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

    <el-scrollbar class="clients">
      <div
          :class="{client: true, selected: props?.selectedId === client?.id}"
          v-for="client in clients"
          @click="emit('client-clicked', client?.id)"
      >
        <img :src="'https://i.pravatar.cc/150?u='+client?.id" class="logo" height="35" width="35"/>

        <div class="body">
          <div class="name">{{ client?.name }}</div>
          <div class="phone">{{ client?.phone }}</div>
        </div>

        <div v-if="props?.selectedId === client?.id" class="indicator"></div>
      </div>
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

  display: flex;
  flex-direction: column;
  max-height: 87vh;

  .search {
    padding: 12px;
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .clients {
    display: flex;
    flex-direction: column;
    max-height: 100%;

    .client {
      border-top: 1px solid $color-border;
      padding: 12px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: stretch;
      position: relative;

      &:hover {
        background-color: #f6f6f6;
      }

      &.selected {
        background-color: rgba(0, 165, 201, 0.09);
      }

      .indicator {
        position: absolute;
        left: 0;
        top: 4px;
        bottom: 4px;
        width: 4px;
        background-color: #00A5C9;
        border-top-right-radius: 10px;
        border-bottom-right-radius: 10px;
      }

      .logo {
        border-radius: 4px;
      }

      .body {
        padding-left: 12px;
        display: flex;
        flex-direction: column;

        .name {
          font-weight: 500;
          font-size: 16px;
          color: #131313;
        }

        .phone {
          font-weight: 500;
          font-size: 12px;
          color: #343434;
        }
      }
    }
  }


  .footer {
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
