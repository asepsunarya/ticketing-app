<template>
  <ui-modal size="2xs" id="set-close-ticket-modal">
    <div class="font-semibold text-xl mb-7">Tandai sebagai selesai</div>
    <div class="mb-10 flex flex-col gap-3">
      <div>
        Status tiket ini akan diubah menjadi selesai, silahkan sertakan solusi
        dan catatan apa yang ditinggalkan
      </div>
      <ui-input
        v-model="ticketStore.form.solution"
        type="text"
        placeholder="user perlu refresh halaman"
        label="Solusi"
      />
      <ui-input
        v-model="ticketStore.form.note"
        type="text"
        placeholder="tidak ada alasan khusus"
        label="Catatan tambahan"
      />
    </div>
    <div class="flex justify-end items-center gap-3">
      <ui-button
        text="Batal"
        size="sm"
        type="ghost"
        for="set-close-ticket-modal"
      />
      <ui-button
        :is-loading="isLoadingSubmit"
        text="Selesai"
        size="sm"
        type="default"
        @click="handleUpdateStatus"
      />
    </div>
  </ui-modal>
</template>

<script setup lang="ts">
import uiButton from "@/components/button/ui-button.vue";
import uiModal from "@/components/modal/ui-modal.vue";
import uiInput from "@/components/input/ui-input.vue";
import { ref } from "vue";
import { closeModal } from "@/helpers/modal-helpers";
import { useTicketStore } from "@/stores/ticket";

const ticketStore = useTicketStore();
const emits = defineEmits<{
  (e: "update-status", status: string, data: any): void;
}>();

const isLoadingSubmit = ref<boolean>(false);

async function handleUpdateStatus(): Promise<void> {
  const newTickets = {
    status: "closed",
    solution: ticketStore.form.solution,
    note: ticketStore.form.note,
  };
  emits("update-status", "closed", newTickets);
  closeModal("set-close-ticket-modal");
}
</script>
