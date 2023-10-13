<template>
  <div class="UiCaptionedValue">
    <div class="caption">{{ props?.caption }}</div>
    <div class="value">{{ props?.value }}</div>
  </div>
</template>


<script setup>
const props = defineProps({
  caption: {
    type: String,
    required: false,
  },
  value: {
    type: String,
    required: false,
  }
});
</script>


<style scoped lang="scss">
.UiCaptionedValue {
  display: flex;
  flex-direction: column;
  gap: 2px;
  color: #000;

  .caption {
    font-size: 12px;
    font-weight: 500;
    color: #494949;
  }
}
</style>
