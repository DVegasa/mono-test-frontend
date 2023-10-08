<template>
  <div class="ClientsList">
    <div class="search">
      <el-input v-model="search" placeholder="Поиск по ФИО или телефону"/>
    </div>

    <el-scrollbar class="clients">
      <div class="client" v-for="client in 40" @click="emit('client-clicked', 42)">
        <img src="https://i.pravatar.cc/150?u=fake@pravatar.com" class="logo" height="35" width="35"/>

        <div class="body">
          <div class="name">Иванов Иван Петрович</div>
          <div class="phone">+79001231234</div>
        </div>
      </div>
    </el-scrollbar>

    <!--        <el-scrollbar style="flex: 1">-->
    <!--        </el-scrollbar>-->

    <!--    <el-scrollbar class="clients">-->
    <!--      <div class="client" v-for="client in 40" @click="emit('client-clicked', 42)">-->
    <!--        <img src="https://i.pravatar.cc/150?u=fake@pravatar.com" class="logo" height="35" width="35"/>-->

    <!--        <div class="body">-->
    <!--          <div class="name">Иванов Иван Петрович</div>-->
    <!--          <div class="phone">+79001231234</div>-->
    <!--        </div>-->
    <!--      </div>-->
    <!--    </el-scrollbar>-->

    <div class="footer box-shrink">
      <el-pagination
          v-model:current-page="curPage"
          v-model:page-size="pageSize"
          :page-sizes="[10, 25, 50, 100]"
          :small="true"
          :background="true"
          layout="total, sizes, prev, pager, next"
          :total="400"
      />
    </div>
  </div>
</template>


<script setup>
import {ref} from "vue";

const emit = defineEmits(['client-clicked'])

const curPage = ref(0);
const pageSize = ref(10);

const search = ref('');

const clients = [
  {},
  {},
  {},
]
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

      &:hover {
        background-color: #f6f6f6;
      }

      .logo {
        border-radius: 100%;
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
