<template>
  <aside
    v-if="route.meta.withSidebar"
    id="logo-sidebar"
    class="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0"
    aria-label="Sidebar"
  >
    <side-bar-title
      image="https://media.licdn.com/dms/image/D560BAQHdDHdh6paD8w/company-logo_200_200/0/1683694599437/manypage_id_logo?e=2147483647&v=beta&t=AR8JGUIgIDaqYxBEHizyD1IgGVUzaf6AUxIA8qHrKGc"
      title="Manypage.id"
      text="Kelola Postingan"
    />
    <div class="h-full mt-4 px-3 pb-4 overflow-y-auto bg-white">
      <side-bar-menu v-if="!displayMenu" @click="handleClick" :menus="menus" />
      <ticket-menu
        v-else-if="displayMenu === 'tickets'"
        @back="displayMenu = ''"
      />
      <setting-menu
        v-else-if="displayMenu === 'settings'"
        @back="displayMenu = ''"
      />
    </div>
  </aside>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { computed, ref } from "vue";
import sideBarTitle from "@/views/admin/layouts/components/side-bar-title.vue";
import sideBarMenu from "@/views/admin/layouts/components/side-bar-menu.vue";
import ticketMenu from "@/views/admin/layouts/components/ticket-menu.vue";
import settingMenu from "@/views/admin/layouts/components/setting-menu.vue";
import type { Menu } from "@/views/admin/layouts/structs/menu.struct";

const router = useRouter();
const route = useRoute();
const menus = computed<Menu[]>(() => [
  {
    name: "dashboard",
    title: "Dashboard",
    icon: "bi-pie-chart",
    redirect: "/admin",
    active: isActive("dashboard"),
  },
  {
    name: "tickets",
    title: "Tiket",
    icon: "bi-ticket",
    active: isActive("admin-projects-queue"),
  },
  {
    name: "settings",
    title: "Pengaturan",
    icon: "bi-gear-wide",
    active: isActive("admin-settings"),
  },
]);

const displayMenu = ref("");

function isActive(routeName: string) {
  return routeName === route.name;
}

function handleClick(menu: Menu) {
  if (menu.redirect) router.push(menu.redirect);
  else displayMenu.value = menu.name;
}
</script>

<style scoped>
.menu-css::before {
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
