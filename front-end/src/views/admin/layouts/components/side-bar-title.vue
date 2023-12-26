<template>
  <div class="flex items-center px-5 py-2">
    <img :src="image" class="w-6 h-6 rounded" />
    <div class="flex flex-col px-3">
      <div class="font-bold">{{ title }}</div>
      <span class="text-zinc-400 text-xs">{{ text }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
  text: string;
  image?: string;
}>();
</script>
