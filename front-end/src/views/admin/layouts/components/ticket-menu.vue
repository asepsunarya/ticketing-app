<template>
  <div>
    <a
      class="flex items-center p-2 text-gray-900 rounded hover:bg-gray-100 group cursor-pointer"
    >
      <span
        class="flex rounded-full bg-gray-600 h-5 w-5 items-center text-center"
      >
        <i class="text-xl bi bi-arrow-left-short text-white"></i>
      </span>
      <span @click="handleBack" class="ms-3 w-full">Kembali ke proyek</span>
    </a>
    <hr class="mt-2" />
    <div class="px-2 mt-4">
      <div class="font-bold">Prioritas Tiket</div>
    </div>
    <div class="mt-4">
      <side-bar-menu @click="handleClick" :menus="menus" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive } from "vue";
import sideBarMenu from "@/views/admin/layouts/components/side-bar-menu.vue";
import type { Menu } from "../structs/menu.struct";
import { useRoute } from "vue-router";
import router from "@/router";
import { countTickets } from "@/views/admin/tickets/services/tickets.service";
import type { TicketCountResult } from "@/views/admin/tickets/services/tickets.struct";
import { useProjectStore } from "@/stores/project";

const projectStore = useProjectStore();
const route = useRoute();
const emits = defineEmits<{
  (e: "back"): void;
}>();

interface TicketCountWithDynamicKeys {
  [key: string]: number;
}

const ticketCount: TicketCountWithDynamicKeys = reactive<TicketCountResult>({
  all: 0,
  me: 0,
  open: 0,
  inprogress: 0,
  pending: 0,
  closed: 0,
});

const menus = computed<Menu[]>(() => [
  {
    name: "tickets-all",
    title: "Semua Tiket",
    redirect: `/admin/projects/${route.params.code}/tickets`,
    active: isActive(undefined),
    count: getCount("all"),
  },
  {
    name: "my-tickets",
    title: "Tiket Saya",
    redirect: `/admin/projects/${route.params.code}/tickets/me`,
    active: isActive("me"),
    count: getCount("me"),
  },
  {
    name: "tickets-open",
    title: "Tiket Open",
    redirect: `/admin/projects/${route.params.code}/tickets/open`,
    active: isActive("open"),
    count: getCount("open"),
  },
  {
    name: "tickets-inprogress",
    title: "Tiket Sedang Dikerjakan",
    redirect: `/admin/projects/${route.params.code}/tickets/inprogress`,
    active: isActive("inprogress"),
    count: getCount("inprogress"),
  },
  {
    name: "tickets-pending",
    title: "Tiket Pending",
    redirect: `/admin/projects/${route.params.code}/tickets/pending`,
    active: isActive("pending"),
    count: getCount("pending"),
  },
  {
    name: "tickets-closed",
    title: "Tiket Ditutup",
    redirect: `/admin/projects/${route.params.code}/tickets/closed`,
    active: isActive("closed"),
    count: getCount("closed"),
  },
]);

function isActive(routeName?: string) {
  return routeName === route.params.status;
}

function handleClick(menu: Menu) {
  menu.redirect ? router.push(menu.redirect) : "";
}

function handleBack() {
  emits("back");
}

async function handleCountTicket() {
  const result = await countTickets(String(projectStore.selected?._id));
  ticketCount.all = result.all;
  ticketCount.me = result.me;
  ticketCount.open = result.open;
  ticketCount.inprogress = result.inprogress;
  ticketCount.pending = result.pending;
  ticketCount.closed = result.closed;
}

function getCount(status: string) {
  return String(ticketCount[status]) || 0;
}

onMounted(async () => {
  await handleCountTicket();
});
</script>
