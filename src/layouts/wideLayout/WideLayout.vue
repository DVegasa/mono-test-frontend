<template>
  <div class="WideLayout">
    <AppHeader class="header"/>

    <div class="body">
      <SideMenu class="side"/>
      <router-view class="page"></router-view>
    </div>
  </div>
</template>


<script setup>
import SideMenu from '@/layouts/wideLayout/SideMenu.vue';
import AppHeader from '@/layouts/wideLayout/AppHeader.vue';
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
    z-index: 1000;
    position: fixed;
    left: 0;
    top: 0;
    right: 0;

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
    position: relative;

    .side {
      width: $sideWidth;
      margin-top: $logoPadding + $logoPadding + $logoSize;
      position: fixed;
      top: 0;
      left: 0;
      bottom: 0;
    }

    .page {
      flex: 1;
      overflow-y: clip;
      margin-top: $logoPadding + $logoPadding + $logoSize;
      margin-left: $sideWidth;
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      max-height: 100vh;
    }
  }
}
</style>
