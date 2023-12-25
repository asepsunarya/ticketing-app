<template>
  <aside
    id="logo-sidebar"
    v-if="false"
    class="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
    aria-label="Sidebar"
  >
    <div class="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
      <ul class="space-y-2 font-medium">
        <li v-for="(menu, index) in menus" :key="index">
          <a
            href="#"
            @click="redirectTo(menu.redirect)"
            class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
          >
            <i class="text-2xl bi" :class="menu.icon"></i>
            <span class="ms-3">{{ menu.title }}</span>
          </a>
        </li>
      </ul>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();
const menus = [
  {
    name: "dashboard",
    title: "Dashboard",
    icon: "bi-pie-chart",
    redirect: "/admin",
  },
  {
    name: "bugs",
    title: "Bugs",
    icon: "bi-bug",
    redirect: "/admin/bugs",
  },
];

function redirectTo(url: string) {
  router.push(url);
}
</script>
