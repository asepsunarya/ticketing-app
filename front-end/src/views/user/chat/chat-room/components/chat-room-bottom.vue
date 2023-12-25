<template>
  <div
    class="sticky flex gap-5 px-5 py-3 bottom-0 w-full bg-[#202C33] text-white items-center"
  >
    <div class="w-2/10 grid grid-cols-2 gap-x-7">
      <icon icon="fe:smile" width="28" color="gray" />
      <icon icon="mi:attachment" width="28" color="gray" />
    </div>
    <div class="w-full">
      <c-input
        v-model="message"
        name="message"
        type="text"
        placeholder="Ketik pesan"
        custom-class="bg-[#2A3942] h-[44px]"
        @enter="handleSendMessage"
      />
    </div>
    <div class="w-1/10 text-center">
      <icon
        icon="material-symbols:send-rounded"
        width="28"
        color="gray"
        class="cursor-pointer"
        @click="handleSendMessage"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from "@iconify/vue";
import CInput from "@/components/input/c-input.vue";
import { ref } from "vue";
import { sendMessage } from "@/views/user/chat/services/chat.service";

const message = ref("");

function handleSendMessage() {
  if (!message.value.trim()) return;
  sendMessage({ message: message.value });
  message.value = "";
}
</script>
