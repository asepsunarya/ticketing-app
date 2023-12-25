<template>
  <div class="relative flex py-5 items-center">
    <div class="flex-grow border-t border-neutral-200"></div>
    <span class="flex-shrink mx-4 text-sm !text-neutral-400">
      {{ description }}
    </span>
    <div class="flex-grow border-t border-neutral-200"></div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";

defineProps<{
  description: string;
}>();
</script>
