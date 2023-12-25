<template>
  <div
    class="bottom-[100px] h-[100vh] bg-gray-900 overflow-scroll px-14 flex flex-col gap-y-2 pb-[150px]"
    ref="roomChat"
  >
    <chat-bubble
      v-for="message in chatStore.messages"
      :key="message.di"
      :is-sender="message.isSender"
      :message="message.message"
      :time="message.time"
    />
  </div>
</template>

<script setup lang="ts">
import chatBubble from "@/views/user/chat/chat-room/components/chat-bubble.vue";
import { watch } from "vue";
import { watchConversationMessages } from "../../services/chat.service";
import { useChatStore } from "@/stores/chat";

const chatStore = useChatStore();

watch(
  () => chatStore.activeChat,
  () => {
    const senderId = chatStore.activeChat.sender.userId;
    const recipientId = chatStore.activeChat.recipient.userId;
    watchConversationMessages({ senderId, recipientId });
  },
  { deep: true }
);
</script>
