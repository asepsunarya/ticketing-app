<template>
  <ui-modal size="2xs" id="remove-project-modal">
    <div class="font-semibold text-xl mb-7">
      <i class="bi bi-exclamation-diamond-fill text-error mr-2" />
      Hapus Proyek?
    </div>
    <div class="mb-10 flex flex-col gap-3">
      <div>
        Proyek ini beserta tiket, laporan dan pengaturan lainnya akan di hapus.
      </div>
      <div class="font-semibold text-error">
        Anda tidak dapat membatalkan aksi ini
      </div>
    </div>
    <div class="flex justify-end items-center gap-3">
      <ui-button
        text="Batal"
        size="sm"
        type="ghost"
        for="remove-project-modal"
      />
      <ui-button
        :is-loading="isLoadingSubmit"
        text="Hapus Proyek"
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
import { removeProjects } from "@/views/admin/projects/services/projects.service";

const props = defineProps<{
  projectId: string;
}>();
const emits = defineEmits<{
  (e: "need-refresh"): void;
}>();

const isLoadingSubmit = ref<boolean>(false);

async function handleRemove(): Promise<void> {
  try {
    isLoadingSubmit.value = true;

    await removeProjects(props.projectId);
    emits("need-refresh");
    closeModal("remove-project-modal");
    toast("Berhasil menghapus proyek", { type: "success" });
  } catch (error) {
    toast("Gagal menghapus proyek", { type: "error" });
    console.log("error : ", error);
  } finally {
    isLoadingSubmit.value = false;
  }
}
</script>
