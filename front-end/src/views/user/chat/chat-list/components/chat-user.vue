<template>
  <div
    class="flex items-center p-3 gap-3 cursor-pointer hover:bg-[#1f2c33] border-b border-[#2e3b44]"
    :class="{ '!bg-[#2a3942]': props.isActive }"
  >
    <div class="w-12">
      <div class="w-12 h-12 bg-white rounded-full"></div>
    </div>
    <div class="flex-grow">
      <div class="flex justify-between items-baseline">
        <div class="text-[#adbac1] font-bold">{{ props.name }}</div>
        <div class="!text-[#adbac1] text-xs" v-if="props.lastMessage">
          {{ props.lastMessageTime }}
        </div>
      </div>
      <div class="flex justify-between">
        <div class="!text-[#adbac1] text-sm break-words line-clamp-1">
          {{ props.lastMessage }}
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const props = defineProps({
  name: {
    type: String,
    default: "",
  },
  lastMessageTime: {
    type: String,
    default: "",
  },
  lastMessage: {
    type: String,
    default: "",
  },
  isActive: {
    type: Boolean,
    default: false,
  },
});
</script>
