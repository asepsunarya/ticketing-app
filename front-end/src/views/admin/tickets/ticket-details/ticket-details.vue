<template>
  <div v-if="fetchStatus == 'success'" class="relative lg:flex gap-x-8">
    <div
      class="lg:w-3/5 space-y-8 relative overflow-y-auto lg:h-[93vh] pt-8 scrollbar-custom hover:scrollbar-thumb-zinc-300"
    >
      <div class="font-semibold text-2xl text-zinc-600">
        {{ ticketStore.selected.description }}
      </div>
      <div class="flex items-center gap-x-2 border rounded px-6 py-4">
        <img
          v-if="ticketStore.selected.createdBy.photo"
          class="w-8 h-8 rounded-full"
          :src="ticketStore.selected.createdBy.photo"
          alt=""
        />
        <div
          v-else
          class="w-8 h-8 rounded-full bg-zinc-300 flex items-center justify-center"
        >
          <i class="bi bi-person text-lg" />
        </div>
        <div>
          <span class="font-semibold">{{
            ticketStore.selected.createdBy.name
          }}</span>
          membuat tiket ini
        </div>
      </div>
      <div class="space-y-4">
        <div class="font-semibold font-lg">Deskripsi</div>
        <div>{{ ticketStore.selected.description }}</div>
      </div>
      <div class="space-y-4 mt-12">
        <div class="font-semibold font-lg">
          Attachments ({{ ticketStore.selected.files.length }})
        </div>
        <div class="flex gap-x-4">
          <div
            v-for="(file, index) in ticketStore.selected.files"
            class="rounded-top cursor-pointer shadow-lg rounded w-48"
            :key="index"
            @click="toFile(file)"
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
              class="rounded-t h-32 w-48"
            ></video>
            <div class="py-2 px-3 rounded-bottom space-y-1">
              <div class="line-clamp-1 break-words font-semibold text-xs">
                {{ getFilename(file) }}
              </div>
              <div class="text-xs text-zinc-600">
                {{ formatDateString(ticketStore.selected.createdAt) }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="lg:w-2/5 lg:relative right-0 mt-8 space-y-4">
      <div class="flex justify-end">
        <div class="btn btn-sm btn-outline btn-error">
          <i class="bi bi-trash" />
        </div>
      </div>
      <div class="w-32 mt-8">
        <change-ticket-status
          :ticket="ticketStore.selected"
          :is-primary="true"
          @update-status="handleUpdateStatus"
        />
      </div>
      <div class="border rounded space-y-4">
        <div class="font-semibold border-b p-4">Details</div>
        <div class="px-4 pb-2 flex items-center text-sm font-bold">
          <div class="w-1/4">Assignee</div>
          <div class="w-3/4 flex gap-x-2 items-center">
            <img
              v-if="ticketStore.selected.assignedBy.photo"
              class="w-8 h-8 rounded-full"
              :src="ticketStore.selected.assignedBy.photo"
              alt=""
            />
            <div
              v-else
              class="w-8 h-8 rounded-full bg-zinc-300 flex items-center justify-center"
            >
              <i class="bi bi-person text-lg" />
            </div>
            <span>{{ ticketStore.selected.assignedBy.name }}</span>
          </div>
        </div>
        <div class="px-4 pb-2 flex items-center text-sm font-bold">
          <div class="w-1/4">Reporter</div>
          <div class="w-3/4 flex gap-x-2 items-center">
            <img
              v-if="ticketStore.selected.reportBy.photo"
              class="w-8 h-8 rounded-full"
              :src="ticketStore.selected.reportBy.photo"
              alt=""
            />
            <div
              v-else
              class="w-8 h-8 rounded-full bg-zinc-300 flex items-center justify-center"
            >
              <i class="bi bi-person text-lg" />
            </div>
            <span>{{ ticketStore.selected.reportBy.name }}</span>
          </div>
        </div>
        <div class="px-4 pb-2 flex items-center text-sm font-bold">
          <div class="w-1/4">Fitur Terkait</div>
          <div class="w-3/4 flex gap-x-2 items-center">
            {{ ticketStore.selected.feature }}
          </div>
        </div>
        <div class="px-4 pb-2 flex items-center text-sm font-bold">
          <div class="w-1/4">Prioritas</div>
          <div class="w-3/4 flex gap-x-2 items-center">
            {{ ticketStore.selected.urgencyLevel }}
          </div>
        </div>
      </div>
    </div>
  </div>

  <teleport to="body">
    <set-pending-ticket-modal @update-status="handleUpdateStatus" />
    <set-close-ticket-modal @update-status="handleUpdateStatus" />
  </teleport>
</template>

<script setup lang="ts">
import { useTicketStore } from "@/stores/ticket";
import {
  getTicketDetail,
  updateTickets,
} from "@/views/admin/tickets/services/tickets.service";
import setPendingTicketModal from "@/views/admin/tickets/components/set-pending-ticket-modal.vue";
import setCloseTicketModal from "@/views/admin/tickets/components/set-close-ticket-modal.vue";
import changeTicketStatus from "@/views/admin/tickets/components/change-ticket-status.vue";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { checkMediaType, getFilename } from "@/helpers/media";
import { formatDateString } from "@/helpers/date-helpers";
import type { Ticket } from "../services/tickets.struct";
import { toast } from "vue3-toastify";

const route = useRoute();
const ticketStore = useTicketStore();
const fetchStatus = ref<string>("");

async function handleGetTicketDetail() {
  fetchStatus.value = "loading";
  try {
    const result = await getTicketDetail(String(route.params.ticketId));
    ticketStore.selected = result;
    fetchStatus.value = "success";
  } catch {
    fetchStatus.value = "error";
  }
}

async function handleUpdateStatus(
  status: string,
  newTickets: Ticket | any
): Promise<void> {
  try {
    await updateTickets(ticketStore.selected?._id, newTickets);
    ticketStore.selected.status = status;
    toast(`Berhasil mengubah status menjadi ${status}`, { type: "success" });
  } catch (error) {
    console.log("error : ", error);
    toast(`Gagal mengubah status menjadi ${status}`, { type: "error" });
  }
}

function toFile(url: string) {
  window.open(url, "_blank");
}

onMounted(async () => {
  await handleGetTicketDetail();
});
</script>

<style>
@media (min-width: 1024px) {
  body {
    overflow: hidden !important;
  }
}
video {
  object-fit: cover;
}
</style>
