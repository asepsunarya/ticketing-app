<template>
  <ui-modal id="add-project-member-modal">
    <div class="font-semibold text-xl mb-7">Tambah Anggota</div>
    <div class="mb-10 flex flex-col gap-3">
      <div v-if="form.selectedUser.id">
        <div class="mb-3">Anggota</div>
        <div
          class="flex justify-between items-center bg-zinc-100 rounded-lg p-3"
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
        <search-member @select="handleSelectUser" />
      </template>
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
import searchMember from "@/views/admin/projects/project-members/components/search-member.vue";
import axios from "@/libraries/axios";
import { ref, reactive } from "vue";
// import { closeModal } from "@/helpers/modal-helpers.ts";
import type { User } from "@/views/user/services/user.struct";
import { useProjectStore } from "@/stores/project";

const emits = defineEmits<{
  (e: "need-refresh"): void;
}>();

const isLoadingSubmit = ref<boolean>(false);
const roleOptions = ref([
  { value: "admin", name: "Admin" },
  { value: "programmer", name: "Programmer" },
]);
const projectStore = useProjectStore();

const form = reactive({
  selectedUser: {
    id: "",
    name: "",
    photo: "",
  },
  role: "",
});

function handleSelectUser(user: User): void {
  form.selectedUser.id = user._id;
  form.selectedUser.name = user.name || "";
  form.selectedUser.photo = user.photo || "";
}

function handleResetSelectedUser(): void {
  form.selectedUser.id = "";
  form.selectedUser.name = "";
  form.selectedUser.photo = "";
}

async function handleSubmitForm(): Promise<void> {
  try {
    isLoadingSubmit.value = true;
    const newMember = {
      projectId: projectStore.selected?._id,
      userId: form.selectedUser.id,
      role: form.role,
    };

    await axios<void>({
      method: "POST",
      url: "/admin/people",
      data: newMember,
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
