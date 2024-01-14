<template>
  <div
    v-if="showAction === id"
    :class="customClass"
    class="z-50 absolute text-left my-4 text-base list-none bg-white rounded shadow"
    :id="id"
  >
    <ul class="py-1" role="none">
      <li v-for="(menu, index) in menus" :key="index">
        <div
          @click="handleClick(menu)"
          class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
          role="menuitem"
        >
          {{ menu.title }}
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import type { DropdownMenu } from "./dropdown.struct";

const props = defineProps<{
  showAction: string;
  menus: DropdownMenu[];
  id: string;
  code?: string;
  customClass?: string;
}>();

const emits = defineEmits<{
  (e: "click", value: any): void;
}>();

function handleClick(menu: DropdownMenu) {
  emits("click", { menu, id: props.id, code: props.code || "" });
}
</script>
