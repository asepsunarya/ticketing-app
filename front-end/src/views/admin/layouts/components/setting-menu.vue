<template>
  <div>
    <div
      class="flex items-center p-2 text-gray-900 rounded hover:bg-gray-100 group cursor-pointer"
    >
      <span
        class="flex rounded-full bg-gray-600 h-5 w-5 items-center text-center"
      >
        <i class="text-xl bi bi-arrow-left-short text-white"></i>
      </span>
      <span @click="handleBack" class="ms-3 w-full">Kembali ke proyek</span>
    </div>
    <hr class="mt-2" />
    <div class="px-2 mt-4">
      <div class="font-bold">Pengaturan Proyek</div>
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
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const emits = defineEmits<{
  (e: "back"): void;
}>();

const menus = computed<Menu[]>(() => [
  {
    name: "detail",
    title: "Detail",
    redirect: `/admin/projects/${route.params.code}/settings/details`,
    active: isActive("admin-projects-details"),
  },
  {
    name: "members",
    title: "Anggota",
    redirect: `/admin/projects/${route.params.code}/settings/members`,
    active: isActive("admin-project-members"),
  },
]);

function isActive(routeName: string) {
  return routeName === route.name;
}

function handleClick(menu: Menu) {
  if (menu.redirect) router.push(menu.redirect);
}

function handleBack() {
  emits("back");
}
</script>
