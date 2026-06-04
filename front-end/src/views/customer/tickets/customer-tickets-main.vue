<template>
  <div class="min-h-screen bg-zinc-50">
    <div class="bg-white border-b px-8 py-4 flex items-center justify-between">
      <div>
        <div class="font-bold text-2xl">BoostTicket</div>
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

    <div class="max-w-6xl mx-auto px-6 py-8 grid lg:grid-cols-3 gap-6">
      <div class="bg-white rounded-lg border p-5 lg:col-span-1 h-fit">
        <div class="font-semibold text-xl mb-4">Buat Tiket</div>
        <div class="space-y-3">
          <ui-select v-model="form.projectId" label="Proyek/Layanan">
            <option value="" disabled>Pilih proyek</option>
            <option v-for="project in projects" :key="project._id" :value="project._id">
              {{ project.name }}
            </option>
          </ui-select>
          <ui-input v-model="form.feature" label="Fitur" placeholder="Contoh: Login" type="text" />
          <div class="form-control">
            <label class="mb-2">Deskripsi Masalah</label>
            <textarea
              v-model="form.description"
              class="textarea textarea-bordered min-h-[120px]"
              placeholder="Jelaskan kendala yang dialami"
            />
          </div>
          <ui-select v-model="form.urgencyLevel" label="Tingkat Urgensi">
            <option value="" disabled>Pilih urgensi</option>
            <option v-for="level in urgencyLevels" :key="level" :value="String(level)">
              {{ level }}
            </option>
          </ui-select>
          <ui-select v-model="form.releaseStatus" label="Status Rilis Fitur">
            <option value="old">Lama</option>
            <option value="new">Baru</option>
          </ui-select>
          <ui-button
            text="Simpan Tiket"
            type="default"
            custom-class="w-full !m-0"
            :is-loading="isSubmitting"
            @click="submitTicket"
          />
        </div>
      </div>

      <div class="bg-white rounded-lg border p-5 lg:col-span-2">
        <div class="flex justify-between items-center mb-4">
          <div>
            <div class="font-semibold text-xl">Tiket Saya</div>
            <div class="text-sm text-zinc-500">Daftar tiket yang dibuat oleh customer</div>
          </div>
          <ui-input
            v-model="filter.search"
            type="text"
            placeholder="Cari tiket"
            @enter="loadTickets"
          />
        </div>

        <div v-if="tickets.length" class="overflow-x-auto">
          <table class="w-full text-sm text-left text-gray-500">
            <thead class="text-black border-b">
              <tr>
                <th class="px-4 py-3 font-semibold">Fitur</th>
                <th class="px-4 py-3 font-semibold">Deskripsi</th>
                <th class="px-4 py-3 font-semibold">Status</th>
                <th class="px-4 py-3 font-semibold">Tanggal</th>
              </tr>
            </thead>
            <tbody class="border-b text-black">
              <tr v-for="ticket in tickets" :key="ticket._id" class="hover:bg-gray-50">
                <td class="px-4 py-3 font-medium">{{ ticket.feature }}</td>
                <td
                  class="px-4 py-3 text-primary hover:underline cursor-pointer"
                  @click="toDetail(ticket._id)"
                >
                  {{ ticket.description }}
                </td>
                <td class="px-4 py-3 capitalize">{{ ticket.status }}</td>
                <td class="px-4 py-3">{{ new Date(ticket.createdAt).toLocaleDateString('id') }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div v-else class="py-16 text-center text-zinc-500">
          Belum ada tiket. Silakan buat tiket pertama melalui form di samping.
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { toast } from 'vue3-toastify';
import uiButton from '@/components/button/ui-button.vue';
import uiInput from '@/components/input/ui-input.vue';
import uiSelect from '@/components/select/ui-select.vue';
import { useAuthStore } from '@/stores/auth';
import type { Project } from '@/views/admin/projects/services/projects.struct';
import type { Ticket } from '@/views/admin/tickets/services/tickets.struct';
import {
  createCustomerTicket,
  getCustomerProjects,
  getCustomerTickets,
} from './services/customer-ticket.service';

const router = useRouter();
const authStore = useAuthStore();
const isSubmitting = ref(false);
const projects = ref<Project[]>([]);
const tickets = ref<Ticket[]>([]);
const urgencyLevels = [5, 4, 3, 2, 1];

const filter = reactive({
  page: 1,
  limit: 10,
  year: String(new Date().getFullYear()),
  projectId: '',
  status: '',
  search: '',
});

const form = reactive({
  projectId: '',
  feature: '',
  description: '',
  urgencyLevel: '',
  releaseStatus: 'old',
  files: [] as string[],
});

async function loadProjects() {
  const result = await getCustomerProjects();
  projects.value = result.docs;
}

async function loadTickets() {
  const result = await getCustomerTickets(filter);
  tickets.value = result.docs;
}

async function submitTicket() {
  if (!form.projectId || !form.feature || !form.description || !form.urgencyLevel) {
    toast('Project, fitur, deskripsi, dan urgensi harus diisi', { type: 'error' });
    return;
  }

  try {
    isSubmitting.value = true;
    await createCustomerTicket(form);
    toast('Berhasil membuat tiket', { type: 'success' });
    form.feature = '';
    form.description = '';
    form.urgencyLevel = '';
    form.releaseStatus = 'old';
    await loadTickets();
  } catch (error) {
    console.log(error);
    toast('Gagal membuat tiket', { type: 'error' });
  } finally {
    isSubmitting.value = false;
  }
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
