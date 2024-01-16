<template>
  <ui-modal id="add-project-member-modal">
    <div class="font-semibold text-xl mb-7">Tambah Anggota</div>
    <div class="mb-10 flex flex-col gap-3">
      <search-user title="Anggota" :include-self="false">
        <template v-if="v$$.$error && v$$._id.$invalid" #error>
          <span>Anggota harus dipilih </span>
        </template>
      </search-user>
      <ui-select v-model="form.role" label="Role">
        <option selected disabled value="">Pilih Role Anggota</option>
        <option
          v-for="{ value, name } in roleOptions"
          :key="value"
          :value="value"
        >
          {{ name }}
        </option>
      </ui-select>

      <div
        v-if="v$.$error && v$.role.$invalid"
        class="label-text-alt text-error"
      >
        <span>Role harus dipilih</span>
      </div>
    </div>
    <div class="flex justify-end items-center gap-3">
      <ui-button
        text="Batal"
        size="sm"
        type="ghost"
        for="add-project-member-modal"
      />
      <ui-button
        :is-loading="isLoadingSubmit"
        text="Tambah"
        size="sm"
        type="default"
        @click="handleSubmitForm"
      />
    </div>
  </ui-modal>
</template>

<script setup lang="ts">
import uiButton from "@/components/button/ui-button.vue";
import uiModal from "@/components/modal/ui-modal.vue";
import uiSelect from "@/components/select/ui-select.vue";
import searchUser from "@/views/admin/components/search-user.vue";
import { ref, reactive, computed } from "vue";
import { useProjectStore } from "@/stores/project";
import { closeModal } from "@/helpers/modal-helpers";
import { createMembers } from "@/views/admin/projects/project-members/services/project-members.service";
import type { CreateMemberDto } from "@/views/admin/projects/project-members/services/project-members.struct";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { useUserStore } from "@/stores/user";
import { toast } from "vue3-toastify";

const emits = defineEmits<(e: "need-refresh") => void>();

const isLoadingSubmit = ref<boolean>(false);
const roleOptions = ref([{ value: "admin", name: "Admin" }]);
const projectStore = useProjectStore();
const userStore = useUserStore();

const form = reactive({
  role: "",
});

const selectedUser = computed(() => {
  return {
    _id: userStore.selected?._id,
    email: userStore.selected?.email,
    photo: userStore.selected?.photo,
  };
});

const rules = {
  role: { required },
};

const userRules = {
  _id: { required },
};

const v$ = useVuelidate(rules, form);
const v$$ = useVuelidate(userRules, selectedUser.value);

async function handleSubmitForm(): Promise<void> {
  const isValidated = await v$.value.$validate();
  const isUserValidated = await v$$.value.$validate();
  if (!isValidated || !isUserValidated) return;
  try {
    isLoadingSubmit.value = true;
    const newMember: CreateMemberDto = {
      projectId: projectStore.selected?._id ?? "",
      userId: selectedUser.value._id || "",
      role: form.role,
    };

    await createMembers(newMember);

    emits("need-refresh");
    toast("Berhasil menambahkan anggota", { type: "success" });
    closeModal("add-project-member-modal");
    userStore.clearSelected();
    form.role = "";
  } catch (error) {
    toast("Gagal menambahkan anggota", { type: "error" });
    console.log("error : ", error);
  } finally {
    isLoadingSubmit.value = false;
  }
}
</script>
