<template>
  <ul class="space-y-2 font-medium">
    <li v-for="(menu, index) in menus" :key="index">
      <a
        @click="handleClick(menu)"
        class="flex items-center px-2 py-2 text-gray-900 rounded hover:bg-gray-100 group relative overflow-hidden cursor-pointer"
        :class="{
          'bg-primary text-primary bg-opacity-10 hover:bg-opacity-25 hover:bg-primary menu-active':
            menu.active,
          'px-3': menu.icon,
        }"
      >
        <i v-if="menu.icon" class="text-xl bi" :class="menu.icon"></i>
        <span class="w-full" :class="{ 'ms-3': menu.icon }">{{
          menu.title
        }}</span>
        <span
          v-if="menu.icon"
          class="hidden group-hover:flex justify-self-end rounded-full bg-gray-600 h-4 w-4 items-center"
          :class="{ '!bg-primary !flex': menu.active }"
        >
          <i class="bi bi-arrow-right-short text-white"></i>
        </span>
        <span
          v-if="menu.count"
          class="text-black flex justify-self-end rounded-full bg-gray-100 h-5 w-5 px-1.5 items-center text-center text-xs"
        >
          {{ menu.count }}
        </span>
      </a>
    </li>
  </ul>
</template>

<script setup lang="ts">
import type { Menu } from "../structs/menu.struct";
defineProps<{
  menus: Menu[];
}>();

const emits = defineEmits<{
  (e: "click", value: Menu): void;
}>();

function handleClick(menu: Menu) {
  emits("click", menu);
}
</script>

<style scoped>
.menu-active::before {
  width: 5px;
  position: absolute;
  top: 12px;
  bottom: 12px;
  left: -1px;
  background: rgb(37 99 235);
  border-radius: 20px;
  content: "";
  z-index: 0;
}
</style>
