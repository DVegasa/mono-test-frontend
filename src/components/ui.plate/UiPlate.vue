<template>
  <div class="UiPlate" :style="{'font-size': props?.size ?? '14px'}">
    <div class="groups">
      <div class="group">{{ groups[0] }}</div>
      <div class="group">{{ groups[1] }}</div>
      <div class="group">{{ groups[2] }}</div>
    </div>

    <div class="region">
      {{ groups[3] }}
    </div>
  </div>
</template>


<script setup>

import {computed} from "vue";

const props = defineProps({
  plate: {
    required: true,
    type: String,
  },
  size: {
    required: false,
    type: String,
    default: '14px'
  }
})

const groups = computed(() => [
  props?.plate?.substring(0, 1),
  props?.plate?.substring(1, 4),
  props?.plate?.substring(4, 6),
  props?.plate?.substring(6, 9),
])

</script>


<style scoped lang="scss">
.UiPlate {
  background-color: white;
  border-radius: 0.15em;
  border: 1px solid black;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  width: 7.5em;

  .groups {
    margin-top: 1px;
    margin-bottom: 1px;
    flex: 4;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2px;
  }

  .region {
    flex: 2;
    border-left: 1px solid black;
    margin-left: 2px;

    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
