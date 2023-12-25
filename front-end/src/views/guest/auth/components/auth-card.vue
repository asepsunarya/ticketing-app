<template>
  <div class="mt-20 bg-white p-8 rounded-xl grid justify-center items-center">
    <img :src="banner" />
    <div v-if="title" class="flex flex-row self-start">
      <h1 class="text-lg font-semibold">{{ title }}</h1>
      <div class="h-1 w-12 bg-primary-500 mt-3" />
    </div>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
defineProps<{
  banner?: string;
  title: string;
}>();
</script>
