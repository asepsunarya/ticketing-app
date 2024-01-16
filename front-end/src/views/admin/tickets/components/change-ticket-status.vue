<template>
  <div
    @click="handleShowAction(ticket._id)"
    :class="{
      ring: showAction === ticket._id,
      '!bg-primary !text-white': isPrimary,
    }"
    class="bg-zinc-300 font-medium text-zinc-600 py-1 px-2 flex gap-x-1 items-center justify-center rounded cursor-pointer"
  >
    {{ ticket.status }}
    <i class="bi bi-chevron-down"></i>
  </div>
  <c-dropdown
    :custom-class="isPrimary ? 'mt-10' : ''"
    :show-action="showAction"
    :menus="statusOptions.filter((option) => option.name !== ticket.status)"
    :id="ticket._id"
    @click="handleClick"
  />
</template>

<script setup lang="ts">
import cDropdown from "@/components/dropdown/c-dropdown.vue";
import type { DropdownMenu } from "@/components/dropdown/dropdown.struct";
import { ref } from "vue";
import type { Ticket } from "../services/tickets.struct";
import { useTicketStore } from "@/stores/ticket";

const ticketStore = useTicketStore();
const props = defineProps<{
  ticket: Ticket;
  isPrimary?: boolean;
}>();

const emits = defineEmits<{
  (e: "change", menu: any): void;
}>();

const showAction = ref<string>("");
const statusOptions = ref<DropdownMenu[]>([
  { name: "open", title: "Open" },
  { name: "pending", title: "Pending" },
  { name: "inprogress", title: "Kerjakan sekarang" },
  { name: "closed", title: "Tandai sebagai selesai" },
]);

function handleClick({ menu }: any) {
  ticketStore.selectedId = props.ticket._id;
  emits("change", menu);
}
function handleShowAction(ticketId: string) {
  if (showAction.value === ticketId) showAction.value = "";
  else showAction.value = ticketId;
}
</script>
