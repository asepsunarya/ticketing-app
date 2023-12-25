<template>
  <div class="flex h-[100vh] overflow-hidden">
    <div class="w-[450px] lg:w-1/4 h-full bg-slate-700">
      <chat-list />
    </div>
    <div class="w-3/4">
      <chat-room />
    </div>
  </div>
</template>

<script setup lang="ts">
import ChatRoom from "@/views/user/chat/chat-room/chat-room.vue";
import ChatList from "@/views/user/chat/chat-list/chat-list.vue";
</script>
