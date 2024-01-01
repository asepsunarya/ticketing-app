<template>
  <div>
    <div class="flex justify-between mb-7">
      <div class="text-3xl font-semibold">Detail</div>
    </div>

    <div class="relative overflow-x-auto">
      <div class="w-full flex gap-y-4 flex-col justify-center items-center">
        <template v-if="projectStore.selected?.picture">
          <img
            :src="projectStore.selected?.picture"
            class="rounded w-32 h-32"
          />
        </template>
        <template v-else-if="form.picture">
          <img :src="form.picture" class="rounded w-32 h-32" />
        </template>
        <template v-else>
          <div
            class="bg-gray-200 text-gray-500 rounded w-32 h-32 flex items-center justify-center"
          >
            <span class="uppercase text-2xl">
              {{ projectStore?.selected?.code }}
            </span>
          </div>
        </template>
        <ui-button
          type="light"
          size="sm"
          text="Ubah Ikon"
          for="upload-icon-modal"
        />
      </div>
      <div class="flex gap-y-2 flex-col m-auto w-1/3">
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
      <div class="mt-4 gap-3 m-auto w-1/3">
        <ui-button
          :is-loading="isLoading"
          text="Simpan"
          size="sm"
          type="default"
          @click="handleSubmitForm"
        />
      </div>
    </div>
    <teleport to="body">
      <upload-icon-modal @selected="handleSelectIcon" />
    </teleport>
  </div>
</template>

<script setup lang="ts">
import uiButton from "@/components/button/ui-button.vue";
import uiInput from "@/components/input/ui-input.vue";
import { onMounted, reactive, ref } from "vue";
import { getProject } from "@/views/admin/projects/project-details/services/project-details.service";
import { useProjectStore } from "@/stores/project";
import { useRoute } from "vue-router";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import type { User } from "@/views/user/services/user.struct";
import searchMember from "@/views/admin/projects/project-members/components/search-member.vue";
import uploadIconModal from "./components/upload-icon-modal.vue";
import { toast } from "vue3-toastify";
import { updateProject } from "@/views/admin/projects/project-details/services/project-details.service";

const route = useRoute();
const projectStore = useProjectStore();
const isLoading = ref<boolean>(false);

const form = reactive({
  picture: "",
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

async function handleGetProject() {
  try {
    isLoading.value = true;
    const resultProject = await getProject(route.params.code);
    projectStore.selected = resultProject;
    form.code = resultProject.code;
    form.name = resultProject.name;
    form.description = resultProject.description;
    form.selectedUser.id = resultProject.leader._id;
    form.selectedUser.email = resultProject.leader.email;
    form.selectedUser.name = resultProject.leader.name || "";
    form.selectedUser.photo = resultProject.leader.photo || "";
  } catch (error) {
    console.log("error : ", error);
  } finally {
    isLoading.value = false;
  }
}

async function handleSubmitForm(): Promise<void> {
  const isValidated = await v$.value.$validate();
  if (!isValidated) return;
  try {
    isLoading.value = true;
    const newProject: any = {
      name: form.name,
      description: form.description,
      code: form.code,
      leader: {
        _id: form.selectedUser.id,
        email: form.selectedUser.email,
      },
    };
    if (form.picture) newProject["picture"] = form.picture;
    const id = projectStore.selected?._id || "";
    await updateProject(id, newProject);
    toast("Berhasil mengubah proyek", { type: "success" });
  } catch (error) {
    toast("Gagal mengubah proyek", { type: "error" });
    console.log("error : ", error);
  } finally {
    isLoading.value = false;
  }
}

function handleSelectIcon(icon: string) {
  delete projectStore.selected?.picture;
  form.picture = icon;
}

onMounted(() => {
  handleGetProject();
});
</script>
