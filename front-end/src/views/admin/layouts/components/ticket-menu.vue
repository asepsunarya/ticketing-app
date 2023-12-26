<template>
  <div>
    <a
      class="flex items-center p-2 text-gray-900 rounded hover:bg-gray-100 group cursor-pointer"
    >
      <span
        class="flex rounded-full bg-gray-600 h-5 w-5 items-center text-center"
      >
        <i class="text-xl bi bi-arrow-left-short text-white"></i>
      </span>
      <span @click="handleBack" class="ms-3 w-full">Kembali ke proyek</span>
    </a>
    <hr class="mt-2" />
    <div class="px-2 mt-4">
      <div class="font-bold">Prioritas Tiket</div>
    </div>
    <div class="mt-4">
      <side-bar-menu @click="handleClick" :menus="menus" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import sideBarMenu from "@/views/admin/layouts/components/side-bar-menu.vue";
import type { Menu } from "../structs/menu.struct";
import { useRoute } from "vue-router";

const route = useRoute();
const emits = defineEmits<{
  (e: "back"): void;
}>();

const menus = computed<Menu[]>(() => [
  {
    name: "tickets-all",
    title: "Semua Tiket",
    redirect: "/admin",
    active: isActive("dashboard"),
    count: "0",
  },
  {
    name: "tickets-open",
    title: "Tiket Open",
    redirect: "/admin",
    active: isActive("dashboard"),
    count: "0",
  },
  {
    name: "my-tickets",
    title: "Tiket Saya",
    active: isActive("admin-projects-queue"),
    count: "0",
  },
  {
    name: "tickets-closed",
    title: "Tiket Ditutup",
    redirect: "/admin",
    active: isActive("dashboard"),
    count: "0",
  },
]);

function isActive(routeName: string) {
  return routeName === route.name;
}

function handleClick(menu: Menu) {
  //
}

function handleBack() {
  emits("back");
}
</script>
