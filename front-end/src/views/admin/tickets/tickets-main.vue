<template>
  <div>tes</div>
</template>

<script setup lang="ts">
import { useUtilStore } from "@/stores/util";
const utilStore = useUtilStore();
utilStore.withSidebar = true;
</script>
