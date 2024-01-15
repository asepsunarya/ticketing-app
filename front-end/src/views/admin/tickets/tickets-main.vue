<template>
  <div class="text-xl font-semibold capitalize">
    Semua Tiket {{ route.params.status == "me" ? "saya" : route.params.status }}
  </div>
  <div class="mb-8 mt-4 lg:w-1/3">
    <ui-input
      v-model="ticketStore.filter.search"
      type="text"
      placeholder="Cari Tiket"
      @enter="handleGetTickets"
    />
  </div>
  <div
    v-if="ticketStore.ticket.docs.length"
    class="relative overflow-x-auto sm:rounded-lg min-h-screen mt-8"
  >
    <table class="w-full text-sm text-left rtl:text-right text-gray-500">
      <thead class="text-black border-b">
        <tr>
          <th scope="col" class="px-6 py-3 font-semibold">Fitur</th>
          <th scope="col" class="px-6 py-3 font-semibold">Deskripsi</th>
          <th scope="col" class="px-6 py-3 font-semibold">Reporter</th>
          <th scope="col" class="px-6 py-3 font-semibold">Assignee</th>
          <th scope="col" class="px-6 py-3 font-semibold">Status</th>
          <th scope="col" class="px-6 py-3 font-semibold"></th>
        </tr>
      </thead>
      <tbody class="border-b text-black">
        <tr
          class="bg-white hover:bg-gray-50"
          v-for="ticket in ticketStore.ticket.docs"
          :key="ticket._id"
        >
          <th
            scope="row"
            class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
          >
            {{ ticket.feature }}
          </th>
          <td
            @click="toDetail(ticket)"
            class="px-6 py-4 text-primary hover:underline cursor-pointer"
          >
            {{ ticket.description }}
          </td>
          <td class="px-6 py-4">
            <div class="flex gap-x-2 items-center cursor-pointer">
              <div
                class="w-7 h-7 rounded-full bg-zinc-300 flex justify-center items-center"
              >
                <img
                  v-if="ticket.reportBy?.photo"
                  class="w-7 h-7 rounded-full"
                  :src="ticket.reportBy?.photo"
                />
                <i v-else class="bi bi-person" />
              </div>
              <div class="line-clamp-1">
                {{ ticket.reportBy.name?.slice(0, 13) }}
              </div>
            </div>
          </td>
          <td
            scope="row"
            class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
          >
            <search-assignee
              :id="ticket._id"
              :selected="ticket.assignedBy"
              @update:selected="handleSelected"
            ></search-assignee>
          </td>
          <td
            scope="row"
            class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap cursor-pointer"
          >
            <change-ticket-status
              :ticket="ticket"
              @update-status="handleUpdateStatus"
            />
          </td>
          <td
            scope="row"
            class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
          >
            {{ new Date(ticket.createdAt).toLocaleDateString("id") }}
          </td>
        </tr>
      </tbody>
    </table>
    <div class="mt-6">
      <c-pagination
        :page="ticketStore.filter.page"
        :total-pages="ticketStore.filter.totalPages"
        :next-page="ticketStore.filter.nextPage"
        :prev-page="ticketStore.filter.prevPage"
        @change="handlePaginate"
      />
    </div>
  </div>
  <template v-else>
    <div
      class="lg:mx-64 h-[calc(100vh-200px)] flex gap-y-4 flex-col items-center justify-center"
    >
      <img src="@/assets/svgs/all-ticket.svg" alt="empty-ticket" />
      <div class="font-semibold text-2xl text-zinc-600">
        Tiket akan tampil di sini
      </div>
      <div class="text-zinc-400 text-center text-lg">
        Buat tiket untuk mulai tracking bugs agar rekan timmu bisa ternotice.
        Tambahkan tiket sekarang.
      </div>

      <ui-button
        text="Buat Tiket"
        type="default"
        custom-class="!px-4 !m-0 text-lg"
        for="add-ticket-modal-top-bar"
      />
    </div>
  </template>

  <teleport to="body">
    <set-pending-ticket-modal @update-status="handleUpdateStatus" />
    <set-close-ticket-modal @update-status="handleUpdateStatus" />
  </teleport>
</template>

<script setup lang="ts">
import { onMounted, watch } from "vue";
import uiInput from "@/components/input/ui-input.vue";
import uiButton from "@/components/button/ui-button.vue";
import {
  getTickets,
  updateTickets,
} from "@/views/admin/tickets/services/tickets.service";
import { useRoute, useRouter } from "vue-router";
import { useProjectStore } from "@/stores/project";
import SearchAssignee from "@/views/admin/tickets/components/search-assignee.vue";
import type { ProjectMember } from "../projects/project-members/services/project-members.struct";
import setPendingTicketModal from "@/views/admin/tickets/components/set-pending-ticket-modal.vue";
import setCloseTicketModal from "@/views/admin/tickets/components/set-close-ticket-modal.vue";
import cPagination from "@/components/pagination/c-pagination.vue";
import { useTicketStore } from "@/stores/ticket";
import { toast } from "vue3-toastify";
import type { Ticket } from "./services/tickets.struct";
import changeTicketStatus from "./components/change-ticket-status.vue";

const router = useRouter();
const route = useRoute();
const ticketStore = useTicketStore();
const projectStore = useProjectStore();

async function handleGetTickets(status = "") {
  ticketStore.filter.status = status || String(route.params.status) || "";
  ticketStore.filter.projectId = projectStore.selected?._id || "";
  const ticketList = await getTickets(ticketStore.filter);
  ticketStore.ticket.docs = ticketList.docs;

  ticketStore.filter.hasNextPage = ticketList.hasNextPage;
  ticketStore.filter.page = ticketList.page;
  ticketStore.filter.totalPages = ticketList.totalPages;
  ticketStore.filter.nextPage = ticketList.nextPage || 0;
  ticketStore.filter.prevPage = ticketList.prevPage || 0;
}

function handlePaginate(page: number): void {
  ticketStore.filter.page = page;
  handleGetTickets();
}

function handleSelected(id: string, member?: ProjectMember) {
  const ticketIndex = ticketStore.ticket.docs.findIndex(
    (ticket) => ticket._id == id
  );
  if (!member) {
    delete ticketStore.ticket.docs[ticketIndex].assignedBy;
    return;
  }
  ticketStore.ticket.docs[ticketIndex].assignedBy = {
    _id: String(member?._id),
    email: member?.email,
    name: member?.name,
    photo: member?.photo,
  };
}

async function handleUpdateStatus(
  status: string,
  newTickets: Ticket | any
): Promise<void> {
  try {
    await updateTickets(ticketStore.selectedId, newTickets);
    const ticketIndex = ticketStore.ticket.docs.findIndex(
      (ticket) => ticket._id == ticketStore.selectedId
    );
    ticketStore.ticket.docs[ticketIndex].status = status;
    toast(`Berhasil mengubah status menjadi ${status}`, { type: "success" });
  } catch (error) {
    console.log("error : ", error);
    toast(`Gagal mengubah status menjadi ${status}`, { type: "error" });
  }
}

function toDetail(ticket: Ticket) {
  ticketStore.selected = ticket;
  router.push(
    `/admin/projects/${route.params.code}/tickets/${ticket._id}/detail`
  );
}

watch(
  () => projectStore.selected,
  async () => {
    await handleGetTickets();
  }
);

watch(
  () => route.params.status,
  async () => {
    await handleGetTickets(String(route.params.status));
  }
);

onMounted(async () => {
  if (projectStore.selected?._id) {
    await handleGetTickets();
  }
});
</script>
