<template>
  <div class="WideLayout">
    <div class="header">
      <router-link to="/" class="logo">
        <img src="@/assets/logo.png" height="40"/>
        <div class="title">Моя парковка</div>
      </router-link>
    </div>

    <div class="body">
      <SideMenu/>
      <router-view class="page"></router-view>
    </div>
  </div>
</template>


<script setup>
import SideMenu from "@/layouts/wideLayout/SideMenu.vue";
</script>


<style scoped lang="scss">
.WideLayout {
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;

  .header {
    display: flex;
    align-items: center;
    -webkit-box-shadow: 0px -7px 35px 4px rgba(34, 60, 80, 0.18);
    -moz-box-shadow: 0px -7px 35px 4px rgba(34, 60, 80, 0.18);
    box-shadow: 0px -7px 35px 4px rgba(34, 60, 80, 0.18);
    border-bottom: 1px solid #e0e0e0;
    z-index: 1000;

    .logo {
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 8px;
    }

    .title {
      font-weight: 400;
      color: black;
      padding-left: 12px;
      font-size: 18px;
    }
  }

  .body {
    display: flex;
    justify-content: stretch;
    flex: 1;

    .sideMenu {
      height: 100%;
    }

    .page {
      flex: 1;
    }
  }
}
</style>
