<template>
  <el-alert
      v-if="props?.exception"
      type="error"
      class="ErrorBoxApiException"
      :title="title"
      :description="description"
      :closable="false"
  />
</template>


<script setup>
import {computed} from "vue";
import {useApiExceptionTranslator} from "@/services/useApiExceptionTranslator";

const props = defineProps({
  exception: {
    type: Object,
    required: true,
  }
})

const title = computed(() => {
  return useApiExceptionTranslator(props?.exception).title();
});

const description = computed(() => {
  return useApiExceptionTranslator(props?.exception).description();
})
</script>


<style scoped lang="scss">
.ErrorBoxApiException {

}
</style>
