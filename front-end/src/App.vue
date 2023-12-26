<template>
  <template v-if="authStore?.user?.role === 'admin'">
    <top-bar />
    <side-bar />
    <main class="p-4" :class="{ 'sm:ml-64': utilStore.withSidebar }">
      <div class="p-4 rounded-lg mt-14">
        <router-view />
      </div>
    </main>
  </template>
  <template v-else>
    <router-view />
  </template>
</template>
<script setup lang="ts">
import { RouterView } from "vue-router";
import { useAuthStore } from "./stores/auth";
import topBar from "@/views/admin/layouts/top-bar.vue";
import sideBar from "@/views/admin/layouts/side-bar.vue";
import { useUtilStore } from "./stores/util";

const authStore = useAuthStore();
const utilStore = useUtilStore();
</script>
