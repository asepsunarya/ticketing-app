<template>
  <div
    class="z-50 hidden text-left my-4 text-base list-none bg-white rounded shadow"
    :id="dataToggle"
  >
    <ul class="py-1" role="none">
      <li v-for="(menu, index) in menus" :key="index">
        <a
          href="#"
          @click="handleClick(menu)"
          class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          role="menuitem"
          >{{ menu.title }}</a
        >
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import type { DropdownMenu } from "./dropdown.struct";

const props = defineProps<{
  dataToggle: string;
  menus: DropdownMenu[];
  value: string;
}>();

const emits = defineEmits<{
  (e: "click", menu: DropdownMenu, value: string): void;
}>();

function handleClick(menu: DropdownMenu) {
  emits("click", menu, props.value);
}
</script>
