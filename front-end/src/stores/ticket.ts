import { pagination } from "../constants/pagination.const";
import { defineStore } from "pinia";
import { reactive, ref } from "vue";
import type {
  Ticket,
  TicketsResult,
} from "@/views/admin/tickets/services/tickets.struct";

export const useTicketStore = defineStore("ticket", () => {
  const selected = ref<Ticket | any>({});
  const filter = reactive({
    page: 1,
    limit: 10,
    search: "",
    projectId: "",
    hasNextPage: false,
    nextPage: 0,
    prevPage: 0,
    totalPages: 1,
    status: "",
  });

  const ticket = ref<TicketsResult>({
    docs: [],
    ...pagination,
  });

  const form = reactive({
    solution: "",
    reason: "none",
    note: "",
  });

  function clearSelected() {
    selected.value = {};
  }

  return { selected, filter, ticket, form, clearSelected };
});
