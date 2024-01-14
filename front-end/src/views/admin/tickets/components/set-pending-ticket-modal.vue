<template>
  <ui-modal size="2xs" id="set-pending-ticket-modal">
    <div class="font-semibold text-xl mb-7">Pending</div>
    <div class="mb-10 flex flex-col gap-3">
      <div>
        Status tiket ini akan diubah menjadi pending, silahkan sertakan alasan
        kenapa mengubah menjadi pending
      </div>
      <ui-select v-model="ticketStore.form.reason" label="Alasan">
        <option v-for="{ value, name } in reasons" :key="value" :value="value">
          {{ name }}
        </option>
      </ui-select>
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
        for="set-pending-ticket-modal"
      />
      <ui-button
        :is-loading="isLoadingSubmit"
        text="Pending"
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
import uiSelect from "@/components/select/ui-select.vue";
import uiInput from "@/components/input/ui-input.vue";
import { ref } from "vue";
import { closeModal } from "@/helpers/modal-helpers";
import { useTicketStore } from "@/stores/ticket";

const ticketStore = useTicketStore();
const emits = defineEmits<{
  (e: "update-status", status: string, data: any): void;
}>();

const reasons = [
  { value: "none", name: "Tidak ada" },
  { value: "more-info-required", name: "Diperlukan informasi lebih lanjut" },
  { value: "pending-release", name: "Pending release" },
  { value: "converted-to-story", name: "Bugs dijadikan story" },
];

const isLoadingSubmit = ref<boolean>(false);

async function handleUpdateStatus(): Promise<void> {
  const newTickets = {
    status: "pending",
    reason: ticketStore.form.reason,
    note: ticketStore.form.note,
  };
  emits("update-status", "pending", newTickets);
  closeModal("set-pending-ticket-modal");
}
</script>
