<template>
  <div
    class="sticky w-full top-0 flex justify-between px-5 py-3 bg-[#202C33] !text-white items-center"
  >
    <div class="flex gap-x-4 items-center">
      <div class="avatar">
        <div class="w-10 rounded-full">
          <img
            src="https://lh3.googleusercontent.com/5oVhb4Aqwof1nWMG4k0bQEBADePLTzi14L803qIyO_obBM7-Dh2WBIJJyYmBjVbjOCqu7AeaaVyofIqpmQBhaJ2SUj_se-LoPsLxlEpCjBJOYDRoY8AUdEWS6NgNeVs-Uwgg73LQh4AfeFAw-FnU2GGxJa69kbJ_M9-9dB8KS0xVRDnNiYJ0NhbVDyhY8k2JC_X7ltyh7sSRu58E9PK-GLexWvwMUViVCresYcS2L4V2JGVsZgFtLOArKagbviwmotE1LRysF43Lrm0g79NWoNmmgnMb3hKtlASWb3_IhBbgs4xBU6a2TOu6I-mBRM5E7NzKXIdLQ94fW57oGCyUaw3uyZdw0cpjV8IUF00syVsTeHsQss-STbopFVOfNpl8YfTK3-osuGWGFaUICDH79Osvz9UjC2kXhsW0ZcDyY8AIhdfLoSffs0bZ_p6Q--f0oFtaWuOKpCk9GLE2oN7J5arvIkG37F197Xm5s2cwgrz0UwoK5_ej-udyl0_CneNtptwLuGLtqzg4eB0ktfbj2W66fxfaAasDf3l5La3O-hKV8aKby7ZX0LIUgpy3K7EWkpAvsvFdwtw4NRpPZ0jRakUo5-EnZNRQhE1_6VV9Rw-X0S0PTVOipPM0LWMMkoo-Ldlnihc8HOIBDJQubZKZlwyluV20xauwnwCMm3iRU_Gzvki351BHMpQBMgiJvD87BP7zXGKLBBPEU1tug6_BFBs7w_JA-tToMIcd2yD15lsHajwdhLfnc6BZv320zuYJGcoZ2WBkx6_PQy5-gQfOIYV9U1Whgw_lw9bm5ukhZFCQ67cLlAR2G6M-zYWkiZxj9CLZGkUH-SAqbnsSv_ZhANVwOrtAbKoLbwTQ4FyZi7bD5OozLda2sc9j60M2UpltVSn0MCojPXTkcSGV-qkAhwSD-W3eQAbTgNWauGMfk4m0kwqs3RLpbo0C24KtiMnt9QWjNwzZiDzfoqIiJI0MKQ=w1538-h1154-s-no?authuser=0"
            class="avatar"
          />
        </div>
      </div>
      <div class="font-bold">{{ activeChat.recipient?.name }}</div>
    </div>
    <div class="flex gap-5">
      <icon icon="mdi-magnify" width="24" color="gray" />
      <icon icon="iwwa-option" width="24" color="gray" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useChatStore } from "@/stores/chat";
import { Icon } from "@iconify/vue";
import { computed } from "vue";

const chatStore = useChatStore();
const activeChat = computed(() => chatStore.activeChat);
</script>
