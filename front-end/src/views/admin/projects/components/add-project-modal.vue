<template>
  <ui-modal id="add-project-modal">
    <div class="font-semibold text-xl mb-7">Tambah Proyek</div>
    <div class="mb-10 flex flex-col gap-3">
      <ui-input
        v-model="form.name"
        type="text"
        placeholder="Manypage.id"
        label="Nama Proyek"
      >
        <template v-if="v$.$error" #error>
          <span v-if="v$.name.$invalid"> Nama proyek harus diisi </span>
        </template>
      </ui-input>

      <div v-if="form.selectedUser.id">
        <div class="mb-2 mt-2 ml-1">Leader</div>
        <div
          class="flex justify-between items-center bg-zinc-100 rounded-lg py-2 px-3"
        >
          <div class="flex items-center gap-3">
            <div
              class="w-7 h-7 rounded-full bg-zinc-300 flex justify-center items-center"
            >
              <i class="bi bi-person" />
            </div>
            <div>{{ form.selectedUser.name }}</div>
          </div>
          <ui-button
            size="sm"
            type="ghost"
            icon="bi bi-x-lg"
            custom-class="btn-circle"
            @click="handleResetSelectedUser"
          />
        </div>
      </div>
      <template v-else>
        <search-member
          @select="handleSelectUser"
          label="Leader"
          :include-self="true"
        />
        <div v-if="v$.$error" class="label-text-alt text-error">
          <span v-if="v$.selectedUser.$invalid">Leader harus dipilih </span>
        </div>
      </template>
      <ui-input v-model="form.code" type="text" placeholder="MP" label="Kode">
        <template v-if="v$.$error" #error>
          <span v-if="v$.code.$invalid">Kode harus diisi </span>
        </template>
      </ui-input>
      <ui-input
        v-model="form.description"
        type="text"
        placeholder="Aplikasi untuk kelola sosial media"
        label="Keterangan"
      >
        <template v-if="v$.$error" #error>
          <span v-if="v$.description.$invalid">Keterangan harus diisi </span>
        </template>
      </ui-input>
    </div>
    <div class="flex justify-end items-center gap-3">
      <ui-button text="Batal" size="sm" type="ghost" for="add-project-modal" />
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
import uiInput from "@/components/input/ui-input.vue";
import searchMember from "@/views/admin/project-members/components/search-member.vue";
import { ref, reactive } from "vue";
import type { User } from "@/views/user/services/user.struct";
import { toast } from "vue3-toastify";
import { closeModal } from "@/helpers/modal-helpers";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { createProjects } from "@/views/admin/projects/services/projects.service";

const emits = defineEmits<{
  (e: "need-refresh"): void;
}>();

const isLoadingSubmit = ref<boolean>(false);

const form = reactive({
  selectedUser: {
    id: "",
    name: "",
    email: "",
    photo: "",
  },
  name: "",
  code: "",
  description: "",
});

const rules = {
  selectedUser: {
    id: { required },
  },
  name: { required },
  code: { required },
  description: { required },
};

const v$ = useVuelidate(rules, form);

function handleSelectUser(user: User): void {
  form.selectedUser.id = user._id;
  form.selectedUser.name = user.name || "";
  form.selectedUser.email = user.email || "";
  form.selectedUser.photo = user.photo || "";
}

function handleResetSelectedUser(): void {
  form.selectedUser.id = "";
  form.selectedUser.name = "";
  form.selectedUser.email = "";
  form.selectedUser.photo = "";
}

async function handleSubmitForm(): Promise<void> {
  const isValidated = await v$.value.$validate();
  if (!isValidated) return;
  try {
    isLoadingSubmit.value = true;
    const newProject = {
      name: form.name,
      description: form.description,
      code: form.code,
      leader: {
        _id: form.selectedUser.id,
        email: form.selectedUser.email,
      },
    };

    await createProjects(newProject);
    emits("need-refresh");
    closeModal("add-project-modal");
    toast("Berhasil menambahkan proyek", { type: "success" });
  } catch (error) {
    toast("Gagal menambahkan proyek", { type: "error" });
    console.log("error : ", error);
  } finally {
    isLoadingSubmit.value = false;
  }
}
</script>
