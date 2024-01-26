import { pagination } from "./../constants/pagination.const";
import type { PaginationResult } from "@/structs/pagination.struct";
import type { Project } from "@/views/admin/projects/services/projects.struct";
import { defineStore } from "pinia";
import { reactive, ref } from "vue";

export const useProjectStore = defineStore("project", () => {
  const selected = ref<Project>();
  const selectedOption = ref<Project>();
  const filter = reactive({
    page: 1,
    limit: 4,
    search: "",
    hasNextPage: false,
    nextPage: 0,
    prevPage: 0,
    totalPages: 1,
  });
  const newest = ref<{ docs: Project[] } & PaginationResult>({
    docs: [],
    ...pagination,
  });
  const project = ref<{ docs: Project[] } & PaginationResult>({
    docs: [],
    ...pagination,
  });

  function clearSelected() {
    selectedOption.value = {
      _id: "",
      name: "",
      code: "",
      description: "",
      leader: {
        _id: "",
      },
      picture: "",
    };
  }
  return {
    selected,
    selectedOption,
    filter,
    newest,
    project,
    clearSelected,
  };
});
