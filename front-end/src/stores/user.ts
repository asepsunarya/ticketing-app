import type { PaginationResult } from "@/structs/pagination.struct";
import type { User } from "@/views/user/services/user.struct";
import { defineStore } from "pinia";
import { pagination } from "./../constants/pagination.const";
import { reactive, ref } from "vue";

export const useUserStore = defineStore("user", () => {
  const selected = ref<User>();
  const filter = reactive({
    page: 1,
    limit: 10,
    search: "",
    hasNextPage: false,
    nextPage: 0,
    prevPage: 0,
    totalPages: 1,
  });
  const user = ref<{ docs: User[] } & PaginationResult>({
    docs: [],
    ...pagination,
  });

  function clearSelected() {
    selected.value = {
      _id: "",
      email: "",
      name: "",
      photo: "",
    };
  }
  return { selected, filter, user, clearSelected };
});
