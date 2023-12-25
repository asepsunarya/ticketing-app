<template>
  <div class="w-max h-2 flex items-end gap-1">
    <div
      v-for="i in 3"
      :key="i"
      class="w-2 h-2 rounded-full"
      :class="[
        {
          'bg-neutral-500': type === 'neutral',
          'bg-danger-500': type === 'danger',
          'bg-white': type === 'white',
        },
        `animate-dot-${i}`,
      ]"
    />
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";

defineProps<{
  type: string;
}>();
</script>
