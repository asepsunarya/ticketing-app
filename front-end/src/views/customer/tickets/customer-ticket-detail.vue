<template>
  <div class="min-h-screen bg-zinc-50">
    <div class="bg-white border-b px-8 py-4 flex items-center justify-between">
      <div>
        <button class="text-primary hover:underline mb-1" @click="router.push('/customer/tickets')">
          ← Kembali ke Tiket Saya
        </button>
        <div class="font-bold text-2xl">Detail Tiket</div>
      </div>
      <ui-button text="Keluar" size="sm" type="ghost" @click="signOut" />
    </div>

    <div class="max-w-5xl mx-auto px-6 py-8" v-if="ticket">
      <div class="bg-white rounded-lg border p-6 mb-6">
        <div class="flex justify-between gap-4">
          <div>
            <div class="text-sm text-zinc-500">{{ ticket.feature }}</div>
            <div class="font-semibold text-2xl mt-1">{{ ticket.description }}</div>
          </div>
          <div class="flex items-center gap-3">
            <ui-button
              v-if="ticket.status === 'closed'"
              text="Buka Kembali Tiket"
              size="sm"
              type="outline-default"
              :is-loading="isReopening"
              @click="reopenTicket"
            />
            <div class="capitalize bg-zinc-100 px-3 py-1 rounded h-fit">{{ ticket.status }}</div>
          </div>
        </div>
        <div class="grid md:grid-cols-2 gap-4 mt-6 text-sm">
          <div><b>Pelapor:</b> {{ ticket.reportBy?.name || ticket.email }}</div>
          <div><b>Email:</b> {{ ticket.email }}</div>
          <div><b>Dibuat:</b> {{ new Date(ticket.createdAt).toLocaleString('id') }}</div>
          <div><b>Assignee:</b> {{ ticket.assignedBy?.name || '-' }}</div>
        </div>
      </div>

      <div class="bg-white rounded-lg border p-6 mb-6">
        <div class="font-semibold text-xl mb-4">Attachments ({{ ticket.files?.length || 0 }})</div>
        <div v-if="ticket.files?.length" class="flex flex-wrap gap-4">
          <div
            v-for="(file, index) in ticket.files"
            :key="index"
            class="rounded cursor-pointer shadow rounded w-48"
            @click="openFile(file)"
          >
            <img
              v-if="checkMediaType(file) === 'image'"
              class="rounded-t h-32 w-48 object-cover"
              :src="file"
              alt=""
            />
            <video
              v-else
              :src="`${file}#t=0.1`"
              playsinline
              class="rounded-t h-32 w-48 object-cover"
            />
            <div class="py-2 px-3 rounded-bottom space-y-1">
              <div class="line-clamp-1 break-words font-semibold text-xs">
                {{ getFilename(file) }}
              </div>
            </div>
          </div>
        </div>
        <div v-else class="text-zinc-500">Tidak ada lampiran.</div>
      </div>

      <div class="bg-white rounded-lg border p-6">
        <div class="font-semibold text-xl mb-4">Komentar</div>
        <div v-if="ticket.comments?.length" class="space-y-3 mb-6">
          <div v-for="(comment, index) in ticket.comments" :key="index" class="border rounded p-3">
            <div class="flex justify-between text-sm text-zinc-500 mb-1">
              <span>{{ comment.createdBy?.name || comment.createdBy?.email }}</span>
              <span>{{ comment.createdAt ? new Date(comment.createdAt).toLocaleString('id') : '' }}</span>
            </div>
            <div>{{ comment.description }}</div>
          </div>
        </div>
        <div v-else class="text-zinc-500 mb-6">Belum ada komentar.</div>

        <div class="form-control mb-3">
          <label class="mb-2">Tambah Komentar</label>
          <textarea
            v-model="comment"
            class="textarea textarea-bordered min-h-[100px]"
            placeholder="Tambahkan informasi tambahan atau balasan terkait tiket"
          />
        </div>
        <ui-button
          text="Kirim Komentar"
          type="default"
          :is-loading="isSubmitting"
          @click="submitComment"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { toast } from 'vue3-toastify';
import uiButton from '@/components/button/ui-button.vue';
import { checkMediaType, getFilename } from '@/helpers/media';
import type { Ticket } from '@/views/admin/tickets/services/tickets.struct';
import {
  addCustomerTicketComment,
  getCustomerTicketDetail,
  reopenCustomerTicket,
} from './services/customer-ticket.service';

const route = useRoute();
const router = useRouter();
const ticket = ref<Ticket>();
const comment = ref('');
const isSubmitting = ref(false);
const isReopening = ref(false);

async function loadDetail() {
  ticket.value = await getCustomerTicketDetail(String(route.params.ticketId));
}

async function reopenTicket() {
  if (!ticket.value?._id) return;
  try {
    isReopening.value = true;
    await reopenCustomerTicket(ticket.value._id);
    toast('Tiket berhasil dibuka kembali', { type: 'success' });
    await loadDetail();
  } catch (error) {
    console.log(error);
    toast('Gagal membuka kembali tiket', { type: 'error' });
  } finally {
    isReopening.value = false;
  }
}

async function submitComment() {
  if (!comment.value.trim()) {
    toast('Komentar harus diisi', { type: 'error' });
    return;
  }

  try {
    isSubmitting.value = true;
    await addCustomerTicketComment(String(route.params.ticketId), comment.value);
    comment.value = '';
    toast('Berhasil menambahkan komentar', { type: 'success' });
    await loadDetail();
  } catch (error) {
    console.log(error);
    toast('Gagal menambahkan komentar', { type: 'error' });
  } finally {
    isSubmitting.value = false;
  }
}

function openFile(url: string) {
  window.open(url, '_blank');
}

function signOut() {
  localStorage.removeItem('auth');
  location.href = '/login';
}

onMounted(loadDetail);
</script>
