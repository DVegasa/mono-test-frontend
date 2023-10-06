<template>
  <div class="WideLayout">
    <div class="header">
      <router-link to="/" class="logo">
        <img src="@/assets/logo.png" height="40"/>
        <div class="title">Моя парковка</div>
      </router-link>
    </div>

    <div class="body">
      <SideMenu class="side"/>
      <router-view class="page"></router-view>
    </div>
  </div>
</template>


<script setup>
import SideMenu from "@/layouts/wideLayout/SideMenu.vue";
</script>


<style scoped lang="scss">
@import "@/styles/app/colors.scss";
@import "@/styles/app/global.scss";
@import "@/styles/app/sizes.scss";


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
    border-bottom: 1px solid $color-border;
    z-index: 1000;
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    background-color: $color-bg;

    .logo {
      display: flex;
      align-items: center;
      justify-content: center;
      margin: $logoPadding;
      height: $logoSize;
    }

    .title {
      font-weight: 500;
      color: black;
      padding-left: 12px;
      font-size: 18px;
    }
  }

  .body {
    display: flex;
    justify-content: stretch;
    flex: 1;
    margin-top: $logoPadding + $logoPadding + $logoSize;

    .side {
      height: 100%;
      width: $sideWidth;
      margin-top: $logoPadding + $logoPadding + $logoSize;
      position: fixed;
      top: 0;
      left: 0;
      bottom: 0;
    }

    .page {
      flex: 1;
      margin-left: $sideWidth;
    }
  }
}
</style>
