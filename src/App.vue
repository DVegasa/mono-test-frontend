<template>
  <router-view/>
</template>


<script setup>
import moment from "moment";
import {serviceStats} from "@/services/serviceStats";

moment.locale('ru');

serviceStats().start({
  refreshDelayMs: import.meta.env?.VITE_APP_SERVICE_STATS_REFRESH_DELAY_MS ?? 5,
});
</script>
