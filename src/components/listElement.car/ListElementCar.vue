<template>
  <div :class="{ListElementCar: true, selected: props?.selected}">

    <div class="top">
      {{ props?.car?.brand }}
      {{ props?.car?.model }}
    </div>
    <div class="bottom">
      <UiPlate :plate="props?.car?.plate" class="plate"/>
      <Icon icon="uil:parking-square" v-if="props?.car?.isParked" class="icon"/>
      <div style="width: 14px" v-else/>
      <div class="color">
        {{ props?.car?.color }}
      </div>
    </div>

    <div v-if="props?.selected" class="indicator"></div>
  </div>
</template>


<script setup>
import UiPlate from '@/components/ui.plate/UiPlate.vue';
import {Icon} from '@iconify/vue';

const props = defineProps({
  car: {
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

.ListElementCar {
  border-top: 1px solid $color-border;
  padding: 12px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: 4px;
  align-items: start;
  justify-content: stretch;
  position: relative;
  font-size: 16px;

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

  .top {
    display: flex;
    align-items: center;
    gap: 4px;

    .text {
      display: flex;
      align-items: center;
    }
  }

  .bottom {
    display: flex;
    align-items: center;
    gap: 12px;

    .plate {
    }

    .color {
      color: rgba(0, 0, 0, 0.7);
      font-size: 14px;
    }
  }
}
</style>
