<template>
  <ui-modal size="2xs" id="remove-ticket-modal">
    <div class="font-semibold text-xl mb-7">
      <i class="bi bi-exclamation-diamond-fill text-error mr-2" />
      Hapus Tiket?
    </div>
    <div class="mb-10 flex flex-col gap-3">
      <div>Semua data dari tiket ini akan terhapus, termasuk aktivitas</div>
      <div class="font-semibold text-error">
        Anda tidak dapat membatalkan aksi ini
      </div>
    </div>
    <div class="flex justify-end items-center gap-3">
      <ui-button
        text="Batal"
        size="sm"
        type="ghost"
        for="remove-ticket-modal"
      />
      <ui-button
        :is-loading="isLoadingSubmit"
        text="Hapus Tiket"
        size="sm"
        type="error"
        @click="handleRemove"
      />
    </div>
  </ui-modal>
</template>

<script setup lang="ts">
import uiButton from "@/components/button/ui-button.vue";
import uiModal from "@/components/modal/ui-modal.vue";
import { ref } from "vue";
import { toast } from "vue3-toastify";
import { closeModal } from "@/helpers/modal-helpers";
import { removeTickets } from "@/views/admin/tickets/ticket-details/services/ticket-details.service";
import { delay } from "@/helpers/time";

const props = defineProps<{
  ticketId: string;
}>();
const emits = defineEmits<{
  (e: "need-refresh"): void;
}>();

const isLoadingSubmit = ref<boolean>(false);

async function handleRemove(): Promise<void> {
  try {
    isLoadingSubmit.value = true;

    await removeTickets(props.ticketId);
    closeModal("remove-ticket-modal");
    toast("Berhasil menghapus tiket", { type: "success" });
    await delay(3000);
    emits("need-refresh");
  } catch (error) {
    toast("Gagal menghapus tiket", { type: "error" });
    console.log("error : ", error);
  } finally {
    isLoadingSubmit.value = false;
  }
}
</script>
