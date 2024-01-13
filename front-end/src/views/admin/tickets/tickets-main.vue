<template>
  <div>
    <div class="text-xl font-semibold">Semua Tiket Open</div>
    <div class="w-72 mt-2">
      <!-- <ui-input
        :model-value="filter.search"
        type="text"
        placeholder="Cari Tiket"
      /> -->
    </div>
    <div class="relative overflow-x-auto sm:rounded-lg min-h-screen mt-8">
      <table class="w-full text-sm text-left rtl:text-right text-gray-500">
        <thead class="text-black border-b">
          <tr>
            <th scope="col" class="px-6 py-3 font-semibold">Deskripsi</th>
            <th scope="col" class="px-6 py-3 font-semibold">Reporter</th>
            <th scope="col" class="px-6 py-3 font-semibold">Assignee</th>
            <th scope="col" class="px-6 py-3 font-semibold">Status</th>
            <th scope="col" class="px-6 py-3 font-semibold">Dibuat Oleh</th>
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
              tes
            </th>
            <td class="px-6 py-4">tes</td>
            <td class="px-6 py-4">
              <!-- <div
                class="flex gap-x-2 items-center cursor-pointer"
                @click.stop="toDetail(ticket._id)"
              >
                <img class="w-6 h-6 border rounded" :src="ticket.picture" />
                <div class="text-primary hover:underline">
                  {{ ticket.name }}
                </div>
              </div> -->
            </td>
            <td
              scope="row"
              class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
            >
              tes
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import uiInput from "@/components/input/ui-input.vue";
import type { Ticket } from "@/views/admin/tickets/services/tickets.struct";
import { getTickets } from "@/views/admin/tickets/services/tickets.service";
import { useRouter } from "vue-router";

const router = useRouter();
const tickets = ref<Ticket[]>([]);

const filter = reactive({
  page: 1,
  limit: 10,
  search: "",
  hasNextPage: false,
  nextPage: 0,
  prevPage: 0,
  totalPages: 1,
});

async function handleGetTickets() {
  const ticketList = await getTickets(filter);
  tickets.value = ticketList.docs;

  filter.hasNextPage = ticketList.hasNextPage;
  filter.page = ticketList.page;
  filter.totalPages = ticketList.totalPages;
  filter.nextPage = ticketList.nextPage || 0;
  filter.prevPage = ticketList.prevPage || 0;
}

function toDetail(id: string) {
  router.push(`/admin/tickets/${id}/detail`);
}

onMounted(async () => {
  await handleGetTickets();
});
</script>
