<template>
  <div class="flex" :class="bubbleClass.position">
    <div :class="bubbleClass.tailColor" v-if="!props.isSender">
      <svg
        viewBox="0 0 8 13"
        height="13"
        width="8"
        preserveAspectRatio="xMidYMid meet"
        class=""
        version="1.1"
        x="0px"
        y="0px"
        enable-background="new 0 0 8 13"
        xml:space="preserve"
      >
        <path
          opacity="0.13"
          fill="#0000000"
          d="M1.533,3.568L8,12.193V1H2.812 C1.042,1,0.474,2.156,1.533,3.568z"
        ></path>
        <path
          fill="currentColor"
          d="M1.533,2.568L8,11.193V0L2.812,0C1.042,0,0.474,1.156,1.533,2.568z"
        ></path>
      </svg>
    </div>
    <div
      class="p-3 rounded-lg !text-white"
      :class="[bubbleClass.backgroundColor, bubbleClass.messageContainer]"
    >
      <div class="flex gap-3 items-end">
        {{ props.message }}
        <span class="!text-gray-400 text-xs">{{ messageTime }}</span>
      </div>
    </div>
    <div :class="bubbleClass.tailColor" v-if="props.isSender">
      <svg
        viewBox="0 0 8 13"
        height="13"
        width="8"
        preserveAspectRatio="xMidYMid meet"
        class=""
        version="1.1"
        x="0px"
        y="0px"
        enable-background="new 0 0 8 13"
        xml:space="preserve"
      >
        <path
          opacity="0.13"
          d="M5.188,1H0v11.193l6.467-8.625 C7.526,2.156,6.958,1,5.188,1z"
        ></path>
        <path
          fill="currentColor"
          d="M5.188,0H0v11.193l6.467-8.625C7.526,1.156,6.958,0,5.188,0z"
        ></path>
      </svg>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import moment from "moment";

const props = defineProps({
  message: {
    type: String,
    default: "",
  },
  isSender: {
    type: Boolean,
    default: false,
  },
  time: {
    type: String,
    default: "",
  },
});

const BUBBLECLASS = {
  sender: {
    position: "justify-end",
    backgroundColor: "bg-[#015c4b]",
    tailColor: "!text-[#015c4b]",
    messageContainer: "rounded-tr-none",
  },
  targetChat: {
    position: "w-fit",
    backgroundColor: "bg-zinc-600",
    tailColor: "!text-zinc-600",
    messageContainer: "rounded-tl-none",
  },
};

const bubbleClass = computed(() => {
  return props.isSender ? BUBBLECLASS.sender : BUBBLECLASS.targetChat;
});

const messageTime = computed(() => moment(props.time).format("HH:mm"));
</script>
