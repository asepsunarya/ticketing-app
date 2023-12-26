<template>
  <ui-modal id="add-project-modal">
    <div class="font-semibold text-xl mb-7">Tambah Proyek</div>
    <div class="mb-10 flex flex-col gap-3">
      <ui-input
        v-model="form.name"
        type="text"
        placeholder="Manypage.id"
        label="Nama Proyek"
      />

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
      </template>
      <ui-input v-model="form.code" type="text" placeholder="MP" label="Kode" />
      <ui-input
        v-model="form.description"
        type="text"
        placeholder="Aplikasi untuk kelola sosial media"
        label="Keterangan"
      />
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
import axios from "@/libraries/axios";
import { ref, reactive } from "vue";
import type { User } from "@/views/user/services/user.struct";

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

    await axios<void>({
      method: "POST",
      url: "/admin/project",
      data: newProject,
    });

    emits("need-refresh");
    // closeModal("add-project-member-modal");
  } catch (error) {
    console.log("error : ", error);
  } finally {
    isLoadingSubmit.value = false;
  }
}
</script>
