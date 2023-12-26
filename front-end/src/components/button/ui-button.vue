<template>
  <button :class="[customClass, btnClass]" @click="handleClick">
    <i v-if="icon" :class="icon" />
    <slot v-if="$slots.icon" name="icon"></slot>
    <span class="loading loading-spinner" v-if="props.isLoading"></span>
    {{ text }}
  </button>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { generateButtonStyle } from "@/components/button/button-style";

const props = defineProps<{
  text: string;
  type?: string;
  size?: string;
  customClass?: string;
  isLoading?: boolean;
  icon?: string;
}>();

const emits = defineEmits<{
  (e: "click"): void;
}>();

const btnClass = computed(() =>
  generateButtonStyle(props.type || "default", props.size || "md")
);

function handleClick() {
  if (props.isLoading) return;
  emits("click");
}
</script>
