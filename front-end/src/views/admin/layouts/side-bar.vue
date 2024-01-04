<template>
  <aside
    v-if="route.meta.withSidebar"
    id="logo-sidebar"
    class="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0"
    aria-label="Sidebar"
  >
    <side-bar-title
      :image="projectStore.selected?.picture"
      :title="projectStore.selected?.name || ''"
      :text="projectStore.selected?.description || ''"
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
import { computed, ref, watch } from "vue";
import sideBarTitle from "@/views/admin/layouts/components/side-bar-title.vue";
import sideBarMenu from "@/views/admin/layouts/components/side-bar-menu.vue";
import ticketMenu from "@/views/admin/layouts/components/ticket-menu.vue";
import settingMenu from "@/views/admin/layouts/components/setting-menu.vue";
import type { Menu } from "@/views/admin/layouts/structs/menu.struct";
import { useProjectStore } from "@/stores/project";
import { getProject } from "../projects/project-details/services/project-details.service";

const router = useRouter();
const route = useRoute();
const projectStore = useProjectStore();
const menus = computed<Menu[]>(() => [
  {
    name: "tickets",
    title: "Tiket",
    icon: "bi-ticket",
    active: isActive("tickets"),
  },
  {
    name: "settings",
    title: "Pengaturan",
    icon: "bi-gear-wide",
    active: isActive("settings"),
  },
]);

const displayMenu = ref(route.meta.submenu);

function isActive(routeName: string) {
  return routeName === route.meta.submenu;
}

function handleClick(menu: Menu) {
  if (menu.redirect) router.push(menu.redirect);
  else displayMenu.value = menu.name;
}

async function handleGetProject(code: string | string[]) {
  try {
    const resultProject = await getProject(code);
    projectStore.selected = resultProject;
  } catch (error) {
    console.log("error : ", error);
  }
}

watch(
  () => route.params.code,
  async (newCode, oldCode) => {
    await handleGetProject(newCode);
  }
);
</script>
