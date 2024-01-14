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
          <template v-if="v$.$error && v$.name.$invalid" #error>
            <span> Nama proyek harus diisi </span>
          </template>
        </ui-input>

        <search-user title="Leader" :include-self="true">
          <template v-if="v$.$error && v$.selectedUser.$invalid" #error>
            <span>Leader harus dipilih </span>
          </template>
        </search-user>

        <ui-input v-model="form.code" type="text" placeholder="MP" label="Kode">
          <template v-if="v$.$error && v$.code.$invalid" #error>
            <span>Kode harus diisi </span>
          </template>
        </ui-input>
        <ui-input
          v-model="form.description"
          type="text"
          placeholder="Aplikasi untuk kelola sosial media"
          label="Keterangan"
        >
          <template v-if="v$.$error && v$.description.$invalid" #error>
            <span>Keterangan harus diisi </span>
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
import { computed, onMounted, reactive, ref } from "vue";
import { getProject } from "@/views/admin/projects/project-details/services/project-details.service";
import { useProjectStore } from "@/stores/project";
import { useRoute } from "vue-router";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import searchUser from "@/views/admin/components/search-user.vue";
import uploadIconModal from "./components/upload-icon-modal.vue";
import { toast } from "vue3-toastify";
import { updateProject } from "@/views/admin/projects/project-details/services/project-details.service";
import { useUserStore } from "@/stores/user";

const route = useRoute();
const userStore = useUserStore();
const projectStore = useProjectStore();
const isLoading = ref<boolean>(false);

const form = reactive({
  picture: "",
  name: "",
  code: "",
  description: "",
});

const selectedUser = computed(() => {
  return {
    _id: userStore.selected?._id || "",
    email: userStore.selected?.email,
    photo: userStore.selected?.photo,
  };
});

const rules = {
  name: { required },
  code: { required },
  description: { required },
};

const v$ = useVuelidate(rules, form);

async function handleGetProject() {
  try {
    isLoading.value = true;
    const resultProject = await getProject(route.params.code);
    projectStore.selected = resultProject;
    form.code = resultProject.code;
    form.name = resultProject.name;
    form.description = resultProject.description;
    form.picture = resultProject.picture || "";
    userStore.selected = {
      _id: resultProject.leader._id || "",
      email: resultProject.leader.email || "",
      name: resultProject.leader.name || "",
      photo: resultProject.leader.photo || "",
    };
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
    const newProject = {
      name: form.name,
      description: form.description,
      code: form.code,
      leader: {
        _id: selectedUser.value._id,
        email: selectedUser.value.email,
      },
      picture: form.picture ?? "",
    };
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
