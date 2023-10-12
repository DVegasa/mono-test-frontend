<template>
  <div
      :class="{ListElementClient: true, selected: props?.selected}">
    <img
        v-show="props?.client"
        :src="'https://i.pravatar.cc/150?u='+props?.client?.id"
        class="logo"
        height="35"
        width="35"
    />

    <div class="body">
      <div class="name">{{ props?.client?.name }}</div>
      <div class="phone">{{ props?.client?.phone }}</div>
    </div>

    <div v-if="props?.selected" class="indicator"></div>
  </div>
</template>


<script setup>
const props = defineProps({
  client: {
    required: true,
    type: Object,
  },
  selected: {
    required: false,
    type: Boolean,
  }
});
</script>


<style scoped lang="scss">
@import "@/styles/app/colors.scss";


.ListElementClient {
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
</style>
