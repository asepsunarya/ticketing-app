import type {
  ProjectMember,
  ProjectMembersResult,
} from "@/views/admin/projects/project-members/services/project-members.struct";
import { pagination } from "../constants/pagination.const";
import { defineStore } from "pinia";
import { reactive, ref } from "vue";

export const useProjectMemberStore = defineStore("project-member", () => {
  const selected = ref<ProjectMember>();
  const filter = reactive({
    page: 1,
    limit: 10,
    search: "",
    hasNextPage: false,
    nextPage: 0,
    prevPage: 0,
    totalPages: 1,
  });
  const member = ref<ProjectMembersResult>({
    docs: [],
    ...pagination,
  });

  function clearSelected() {
    selected.value = {
      _id: "",
      role: "",
      userId: "",
      name: "",
      email: "",
      photo: "",
    };
  }

  return { selected, filter, member, clearSelected };
});
