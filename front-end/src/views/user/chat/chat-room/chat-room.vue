<template>
  <div class="relative">
    <chat-room-top-bar />
    <chat-content />
    <chat-room-bottom />
  </div>
</template>

<script setup lang="ts">
import ChatRoomTopBar from "@/views/user/chat/chat-room/components/chat-room-top-bar.vue";
import ChatContent from "@/views/user/chat/chat-room/components/chat-content.vue";
import ChatRoomBottom from "@/views/user/chat/chat-room/components/chat-room-bottom.vue";
</script>
