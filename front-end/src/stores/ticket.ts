import { pagination } from "../constants/pagination.const";
import { defineStore } from "pinia";
import { reactive, ref } from "vue";
import type {
  Ticket,
  TicketsResult,
} from "@/views/admin/tickets/services/tickets.struct";

export const useTicketStore = defineStore("ticket", () => {
  const selected = ref<Ticket | any>({});
  const selectedId = ref<string>("");
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
    year: "2024",
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

  function clear() {
    form.solution = "";
    form.reason = "";
    form.note = "";
  }

  return { selected, selectedId, filter, ticket, form, clearSelected, clear };
});
