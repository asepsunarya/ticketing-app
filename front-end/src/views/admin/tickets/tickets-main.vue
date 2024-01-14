<template>
  <div class="text-xl font-semibold capitalize">
    Semua Tiket {{ route.params.status == "me" ? "saya" : route.params.status }}
  </div>
  <div
    v-if="tickets.length"
    class="relative overflow-x-auto sm:rounded-lg min-h-screen mt-8"
  >
    <div class="mb-8 lg:w-1/3">
      <ui-input
        v-model="filter.search"
        type="text"
        placeholder="Cari Tiket"
        @enter="handleGetTickets"
      />
    </div>
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
          v-for="ticket in tickets"
          :key="ticket._id"
        >
          <th
            scope="row"
            class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
          >
            {{ ticket.feature }}
          </th>
          <td class="px-6 py-4 text-primary hover:underline cursor-pointer">
            {{ ticket.description }}
          </td>
          <td class="px-6 py-4">
            <div class="flex gap-x-2 items-center cursor-pointer">
              <div
                class="w-7 h-7 rounded-full bg-zinc-300 flex justify-center items-center"
              >
                <img
                  v-if="ticket.reportBy.photo"
                  class="w-7 h-7 rounded-full"
                  :src="ticket.reportBy.photo"
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
            <div
              @click="handleShowAction(ticket._id)"
              :class="{ ring: showAction === ticket._id }"
              class="w-16 bg-zinc-300 font-medium text-zinc-600 p-1 flex gap-x-1 items-center justify-center rounded"
            >
              {{ ticket.status }}
              <i class="bi bi-chevron-down"></i>
            </div>
            <c-dropdown
              :show-action="showAction"
              :menus="
                statusOptions.filter((option) => option.name !== ticket.status)
              "
              :id="ticket._id"
              :code="projectStore.selected?.code"
              @click="handleClick"
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
</template>

<script setup lang="ts">
import { onMounted, reactive, ref, watch } from "vue";
import uiInput from "@/components/input/ui-input.vue";
import uiButton from "@/components/button/ui-button.vue";
import type { Ticket } from "@/views/admin/tickets/services/tickets.struct";
import { getTickets } from "@/views/admin/tickets/services/tickets.service";
import { useRoute, useRouter } from "vue-router";
import cDropdown from "@/components/dropdown/c-dropdown.vue";
import { useProjectStore } from "@/stores/project";
import type { DropdownMenu } from "@/components/dropdown/dropdown.struct";
import SearchAssignee from "@/views/admin/tickets/components/search-assignee.vue";
import type { ProjectMember } from "../projects/project-members/services/project-members.struct";

const router = useRouter();
const route = useRoute();
const projectStore = useProjectStore();

const tickets = ref<Ticket[]>([]);
const showAction = ref<string>("");

const statusOptions = ref<DropdownMenu[]>([
  { name: "open", title: "Open" },
  { name: "pending", title: "Pending" },
  { name: "inprogress", title: "Kerjakan sekarang" },
  { name: "done", title: "Tandai sebagai selesai" },
]);

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

async function handleGetTickets(status = "") {
  filter.status = status || String(route.params.status) || "";
  filter.projectId = projectStore.selected?._id || "";
  const ticketList = await getTickets(filter);
  tickets.value = ticketList.docs;

  filter.hasNextPage = ticketList.hasNextPage;
  filter.page = ticketList.page;
  filter.totalPages = ticketList.totalPages;
  filter.nextPage = ticketList.nextPage || 0;
  filter.prevPage = ticketList.prevPage || 0;
}

function handleShowAction(ticketId: string) {
  if (showAction.value === ticketId) showAction.value = "";
  else showAction.value = ticketId;
}

function handleSelected(id: string, member?: ProjectMember) {
  const ticketIndex = tickets.value.findIndex((ticket) => ticket._id == id);
  if (!member) {
    delete tickets.value[ticketIndex].assignedBy;
    return;
  }
  tickets.value[ticketIndex].assignedBy = {
    _id: String(member?._id),
    email: member?.email,
    name: member?.name,
    photo: member?.photo,
  };
}

function handleClick({ menu, id, code }: any) {
  switch (menu.name) {
    case "pending":
      router.push(`/admin/projects/${code}/settings/details`);
      break;
    case "inproggress":
      break;
    case "done":
      break;
  }
}

function toDetail(id: string) {
  router.push(`/admin/tickets/${id}/detail`);
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
