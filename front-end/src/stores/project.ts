import type { Project } from "@/views/admin/projects/services/projects.struct";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useProjectStore = defineStore("project", () => {
  const selected = ref<Project>();
  return { selected };
});
