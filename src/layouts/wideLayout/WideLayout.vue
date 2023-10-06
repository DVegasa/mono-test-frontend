<template>
  <div class="WideLayout">
    <div class="header">header</div>
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
    padding-left: 12px;
    padding-right: 12px;
    height: 50px;
    background-color: yellow;
    display: flex;
    align-items: center;
  }

  .body {
    display: flex;
    justify-content: stretch;
    flex: 1;

    .sideMenu {
      background-color: red;
      height: 100%;
    }

    .page {
      flex: 1;
    }
  }
}
</style>
