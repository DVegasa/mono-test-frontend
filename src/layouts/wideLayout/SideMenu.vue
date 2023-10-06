<template>
  <div class="SideMenu">
    <div class="links">
      <router-link
          :class="{link: true, selected: isSelected(link.to)}"
          :to="link.to"
          v-for="link in links"
          :key="link.name"
      >
        <Icon :icon="link.icon" width="24" height="24"/>
        <el-text size="small">{{ link.name }}</el-text>

        <div class="indicator" v-if="isSelected(link.to)">

        </div>
      </router-link>
    </div>
  </div>
</template>


<script setup>
import {ref} from "vue";
import {Icon} from "@iconify/vue";
import {useRoute} from "vue-router";

const route = useRoute();

const links = [
  {
    name: 'Дашборд',
    icon: 'bx:home',
    to: {name: 'dashboard'},
  },
  {
    name: 'Клиенты',
    icon: 'bx:user',
    to: {name: 'clients'},
  },
  {
    name: 'Авто',
    icon: 'bx:car',
    to: {name: 'cars'},
  },
]

function isSelected(to) {
  return to?.name === route?.name;
}

</script>


<style scoped lang="scss">
@import "@/styles/app/colors.scss";

$color-inactive: #7e7e8a;
$color-hover: #134074;

.SideMenu {
  height: 100%;
  background-color: white;
  border-right: 1px solid $color-border;

  .links {
    padding-top: 12px;
    display: flex;
    flex-direction: column;
    gap: 2px;
    align-items: center;
    justify-content: center;

    .link {
      position: relative;
      padding-top: 12px;
      padding-bottom: 12px;
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 2px;
      align-items: center;
      justify-content: center;
      font-weight: 600;
      color: $color-inactive;

      * {
        color: $color-inactive;
      }

      &:hover {
        color: $color-hover;

        * {
          color: $color-hover;
        }
      }

      &.selected {
        color: $color-hover;

        * {
          color: $color-hover;
        }
      }

      .indicator {
        position: absolute;
        top: 5px;
        bottom: 5px;
        left: 0;

        width: 5px;
        border-top-right-radius: 100px;
        border-bottom-right-radius: 100px;
        background-color: $color-hover;
      }
    }
  }
}
</style>
