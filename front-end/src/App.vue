<template>
  <template v-if="authStore?.user?.role === 'admin'">
    <top-bar />
    <side-bar />
    <main class="p-4" :class="{ 'sm:ml-64': route.meta.withSidebar }">
      <div class="p-4 rounded-lg mt-14">
        <router-view />
      </div>
    </main>
    <teleport to="body">
      <add-project-modal id="add-project-modal-top-bar" />
      <add-people-modal id="add-people-modal-top-bar" />
    </teleport>
  </template>
  <template v-else>
    <router-view />
  </template>
</template>
<script setup lang="ts">
import { RouterView, useRoute } from "vue-router";
import { useAuthStore } from "./stores/auth";
import topBar from "@/views/admin/layouts/top-bar.vue";
import sideBar from "@/views/admin/layouts/side-bar.vue";
import addProjectModal from "@/views/admin/projects/components/add-project-modal.vue";
import addPeopleModal from "@/views/admin/teams/components/people/add-people-modal.vue";

const route = useRoute();
const authStore = useAuthStore();
</script>
