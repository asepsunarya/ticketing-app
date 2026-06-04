<template>
  <div class="min-h-screen bg-zinc-50">
    <div class="bg-white border-b px-8 py-4 flex items-center justify-between">
      <div>
        <div class="font-bold text-2xl">Ticket</div>
        <div class="text-sm text-zinc-500">Halaman tiket customer</div>
      </div>
      <div class="flex items-center gap-4">
        <div class="text-right">
          <div class="font-semibold">{{ authStore.user?.name }}</div>
          <div class="text-xs text-zinc-500">{{ authStore.user?.email }}</div>
        </div>
        <ui-button text="Keluar" size="sm" type="ghost" @click="signOut" />
      </div>
    </div>

    <div class="px-8 py-8">
      <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-7">
        <div>
          <div class="text-3xl font-semibold">Tiket Saya</div>
          <div class="text-sm text-zinc-500 mt-1">
            Buat dan pantau tiket kendala aplikasi.
          </div>
        </div>
        <div class="flex items-center gap-3">
          <ui-input
            v-model="filter.search"
            type="text"
            placeholder="Cari tiket"
            custom-class="input-sm"
            @enter="loadTickets"
          />
          <ui-button text="Cari" size="sm" type="outline-default" @click="loadTickets" />
          <ui-button text="Buat Tiket" size="sm" for="add-customer-ticket-modal" />
        </div>
      </div>

      <div class="relative overflow-x-auto sm:rounded-lg bg-white border">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead class="text-black border-b">
            <tr>
              <th scope="col" class="px-6 py-3 font-semibold">Fitur</th>
              <th scope="col" class="px-6 py-3 font-semibold">Deskripsi</th>
              <th scope="col" class="px-6 py-3 font-semibold">Status</th>
              <th scope="col" class="px-6 py-3 font-semibold">Lampiran</th>
              <th scope="col" class="px-6 py-3 font-semibold">Tanggal</th>
            </tr>
          </thead>
          <tbody v-if="tickets.length" class="border-b text-black divide-y">
            <tr v-for="ticket in tickets" :key="ticket._id" class="hover:bg-gray-50">
              <td class="px-6 py-3 capitalize">{{ ticket.feature }}</td>
              <td
                class="px-6 py-3 text-primary hover:underline cursor-pointer"
                @click="toDetail(ticket._id)"
              >
                {{ ticket.description }}
              </td>
              <td class="px-6 py-3 capitalize">{{ ticket.status }}</td>
              <td class="px-6 py-3">{{ ticket.files?.length || 0 }} file</td>
              <td class="px-6 py-3">{{ new Date(ticket.createdAt).toLocaleDateString('id') }}</td>
            </tr>
          </tbody>
          <tbody v-else>
            <tr>
              <td colspan="5" class="px-6 py-16 text-center text-zinc-500">
                Belum ada tiket. Klik “Buat Tiket” untuk membuat tiket pertama.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <teleport to="body">
      <add-customer-ticket-modal :projects="projects" @need-refresh="loadTickets" />
    </teleport>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import uiButton from '@/components/button/ui-button.vue';
import uiInput from '@/components/input/ui-input.vue';
import { useAuthStore } from '@/stores/auth';
import type { Project } from '@/views/admin/projects/services/projects.struct';
import type { Ticket } from '@/views/admin/tickets/services/tickets.struct';
import addCustomerTicketModal from './components/add-customer-ticket-modal.vue';
import {
  getCustomerProjects,
  getCustomerTickets,
} from './services/customer-ticket.service';

const router = useRouter();
const authStore = useAuthStore();
const projects = ref<Project[]>([]);
const tickets = ref<Ticket[]>([]);

const filter = reactive({
  page: 1,
  limit: 10,
  year: String(new Date().getFullYear()),
  projectId: '',
  status: '',
  search: '',
});

async function loadProjects() {
  const result = await getCustomerProjects();
  projects.value = result.docs;
}

async function loadTickets() {
  const result = await getCustomerTickets(filter);
  tickets.value = result.docs;
}

function toDetail(ticketId: string) {
  router.push(`/customer/tickets/${ticketId}`);
}

function signOut() {
  localStorage.removeItem('auth');
  location.href = '/login';
}

onMounted(async () => {
  await Promise.all([loadProjects(), loadTickets()]);
});
</script>
