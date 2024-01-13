<template>
  <div class="text-xl font-semibold">Semua Tiket Open</div>
  <div
    v-if="tickets.length"
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
          <th scope="col" class="px-6 py-3 font-semibold">Dibuat Pada</th>
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
            <div
              class="flex gap-x-2 items-center cursor-pointer"
              @click.stop="toDetail(ticket._id)"
            >
              <img class="w-6 h-6 border rounded" :src="ticket.files[0]" />
              <div class="text-primary hover:underline">
                {{ ticket.description }}
              </div>
            </div>
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
import { onMounted, reactive, ref } from "vue";
import uiButton from "@/components/button/ui-button.vue";
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
