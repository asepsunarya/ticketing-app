<template>
  <ui-modal size="2xs" id="remove-project-member-modal">
    <div class="font-semibold text-xl mb-7">
      <i class="bi bi-exclamation-diamond-fill text-error mr-2" />
      Hapus Anggota?
    </div>
    <div class="mb-10 flex flex-col gap-3">
      <div>
        Aktivitas anggota beserta assignment sebelumnya tidak akan dihapus.
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
        for="remove-project-member-modal"
      />
      <ui-button
        :is-loading="isLoadingSubmit"
        text="Hapus Anggota"
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
import { removeMembers } from "@/views/admin/projects/project-members/services/project-members.service";

const props = defineProps<{
  projectMemberId: string;
}>();
const emits = defineEmits<{
  (e: "need-refresh"): void;
}>();

const isLoadingSubmit = ref<boolean>(false);

async function handleRemove(): Promise<void> {
  try {
    isLoadingSubmit.value = true;

    await removeMembers(props.projectMemberId);
    emits("need-refresh");
    closeModal("remove-project-member-modal");
    toast("Berhasil menghapus anggota", { type: "success" });
  } catch (error) {
    toast("Gagal menghapus anggota", { type: "error" });
    console.log("error : ", error);
  } finally {
    isLoadingSubmit.value = false;
  }
}
</script>
