<template>
  <div
    class="py-3 px-5 flex justify-between items-center bg-[#202C33] border-r border-[#2e3b44]"
  >
    <div class="rounded-full w-10 h-10 bg-white hover:cursor-pointer"></div>
    <div
      class="flex gap-7 items-center pl-3 dropdown dropdown-end dropdown-bottom"
    >
      <div tabindex="0">
        <Icon
          icon="mdi:dots-vertical"
          class="text-2xl hover:cursor-pointer text-[#adbac1]"
        />
      </div>
      <ul
        tabindex="0"
        class="dropdown-content z-[1] menu p-2 shadow bg-[#8696a0] rounded-box w-52"
      >
        <li><a @click="logout()">Logout</a></li>
      </ul>
    </div>
  </div>
  <div
    class="px-3 py-2 flex items-center gap-3 bg-[#111B21] border-r border-[#2e3b44]"
  >
    <div class="flex-grow">
      <div class="relative">
        <Icon
          icon="mdi:search"
          class="absolute top-2.5 left-4 text-lg text-[#8696a0]"
        />
        <input
          type="text"
          class="!outline-none bg-[#1f2c33] w-full rounded-md h-9 text-[#e9edef] pl-16 pr-10"
          placeholder="Cari Chat"
        />
      </div>
    </div>
    <Icon icon="mdi:filter-variant" class="text-lg text-[#8696a0]" />
  </div>
  <div
    class="overflow-y-auto h-[100vh] max-h-full bg-[#111B21] border-r border-[#2e3b44]"
  >
    <chat-user
      v-for="chat in chatList"
      :key="chat"
      :name="chat.recipient.name"
      :last-message="chat.lastMessage"
      :last-message-time="chat.lastMessageTime"
      :is-active="chat.id === activeChat.id"
      @click="chatStore.setActiveChat(chat)"
    />
  </div>
</template>

<script lang="ts" setup>
import { Icon } from "@iconify/vue";
import chatUser from "./components/chat-user.vue";
import { computed, onMounted } from "vue";
import { useAuthStore } from "@/stores/auth";
import { useChatStore } from "@/stores/chat";
import { watchConversationList } from "@/views/user/chat/services/chat.service";

const authStore = useAuthStore();
const chatStore = useChatStore();

const chatList = computed(() => chatStore.chatList);
const activeChat = computed(() => chatStore.activeChat);

onMounted(() => {
  getListChat();
});

async function logout() {
  await authStore.signOut();
  localStorage.removeItem("auth");
  location.href = "/login";
}

function getListChat() {
  watchConversationList({ userId: authStore.user?.uid || "" });
}
</script>
