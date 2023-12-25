import { defineStore } from "pinia";
import { onMounted, ref } from "vue";

export const useChatStore = defineStore("chat", () => {
  const chatList: any = ref([]);
  const messages: any = ref([]);
  const activeChat: any = ref({
    id: "",
    sender: { userId: "", name: "" },
    recipient: { userId: "", name: "" },
    lastMessage: "",
    lastMessageTime: { seconds: "" },
  });

  onMounted(() => {
    chatList.value = [];
    activeChat.value = {
      userId: "",
      name: "",
      lastMessage: "",
      lastMessageTime: "",
    };
  });

  function setActiveChat(chat: any) {
    activeChat.value = chat;
  }

  return {
    messages,
    chatList,
    activeChat,
    setActiveChat,
  };
});
