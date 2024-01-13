<template>
  <ui-modal
    :prevent-close="true"
    size="xl"
    :id="id"
    :with-header="true"
    title="Buat Tiket"
  >
    <div class="mb-2 flex flex-col gap-3">
      <search-project title="Project" :include-self="true">
        <template v-if="v$$$.$error && v$$._id.$invalid" #error>
          <span>Project harus dipilih </span>
        </template>
      </search-project>
      <ui-input
        v-model="form.feature"
        type="text"
        placeholder="e.g,. Buat postingan"
        label="Fitur"
      >
        <template v-if="v$.$error && v$.feature.$invalid" #error>
          <span>Fitur harus diisi </span>
        </template>
      </ui-input>
      <div class="form-control">
        <label for="description" class="mb-2">Penjelasan</label>
        <textarea
          v-model="form.description"
          id="description"
          class="textarea textarea-bordered"
          placeholder="e.g,. User tidak dapat mengupload media"
        ></textarea>
        <template v-if="v$.$error && v$.description.$invalid">
          <span class="label-text-alt text-error mt-2"
            >Penjelasan harus diisi
          </span>
        </template>
      </div>
      <ui-input
        v-model="form.email"
        type="text"
        placeholder="e.g,. aseps@manypage.id"
        label="Email Pendukung"
      />
      <div class="flex">
        <ui-input
          v-model="form.file"
          @change="uploadFile"
          type="file"
          label="File Pendukung"
          :multiple="true"
          custom-class="!file-input !file-input-bordered !file-input-ghost !file-input-sm !max-w-sm p-0"
        />
        <span
          v-if="uploadStatus === 'loading'"
          class="mt-8 ml-4 loading loading-spinner text-zinc-400"
        />
        <i
          v-else-if="uploadStatus === 'success'"
          class="self-end mb-1 text-xl ml-2 bi bi-check-lg text-success"
        />
        <i
          v-else-if="uploadStatus === 'error'"
          class="self-end mb-1 ml-2 bi bi-x text-xl text-error"
        />
      </div>

      <search-user title="Pelapor" :include-self="true">
        <template v-if="v$$.$error && v$$._id.$invalid" #error>
          <span>Pelapor harus dipilih </span>
        </template>
      </search-user>
      <search-project-member title="Assignee" />

      <div class="w-1/2">
        <ui-select v-model="form.urgencyLevel" label="Tingkat Urgensi">
          <option v-for="level in urgencyLevels" :key="level" :value="level">
            {{ level }}
          </option>
        </ui-select>
        <template v-if="v$.$error && v$.urgencyLevel.$invalid">
          <span class="label-text-alt text-error mt-2"
            >Tingkat Urgensi harus diisi
          </span>
        </template>
        <ui-select v-model="form.releaseStatus" label="Status Rilis">
          <option
            v-for="status in releaseStatus"
            :key="status.key"
            :value="status.key"
          >
            {{ status.value }}
          </option>
        </ui-select>
      </div>
    </div>
    <template #action>
      <ui-button text="Batal" size="sm" type="ghost" :for="id" />
      <ui-button
        :is-loading="isLoadingSubmit"
        :custom-class="`${uploadStatus === 'loading' ? 'btn-disabled' : ''}`"
        text="Tambah"
        size="sm"
        type="default"
        @click="handleSubmitForm"
      />
    </template>
  </ui-modal>
</template>

<script setup lang="ts">
import uiButton from "@/components/button/ui-button.vue";
import uiModal from "@/components/modal/ui-modal.vue";
import uiInput from "@/components/input/ui-input.vue";
import uiSelect from "@/components/select/ui-select.vue";
import searchUser from "@/views/admin/components/search-user.vue";
import searchProjectMember from "@/views/admin/components/search-project-member.vue";
import searchProject from "@/views/admin/components/search-project.vue";
import { ref, reactive, onMounted, computed, watch } from "vue";
import type { User } from "@/views/user/services/user.struct";
import { toast } from "vue3-toastify";
import { closeModal } from "@/helpers/modal-helpers";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { useAuthStore } from "@/stores/auth";
import { useUserStore } from "@/stores/user";
import { useProjectMemberStore } from "@/stores/project-member";
import { useProjectStore } from "@/stores/project";
import { createTickets } from "@/views/admin/tickets/services/tickets.service";
import {
  getDownloadURL,
  getStorage,
  ref as storageRef,
  uploadBytes,
} from "firebase/storage";

const props = defineProps<{ id: string }>();
const emits = defineEmits<(e: "need-refresh") => void>();

const authStore = useAuthStore();
const userStore = useUserStore();
const projectStore = useProjectStore();
const projectMemberStore = useProjectMemberStore();

const isLoadingSubmit = ref<boolean>(false);
const uploadStatus = ref<string>("");
const urgencyLevels = [5, 4, 3, 2, 1];
const releaseStatus = [
  { key: "new", value: "Baru" },
  { key: "old", value: "Lama" },
];

const form = reactive({
  email: "",
  feature: "",
  description: "",
  file: "",
  urgencyLevel: "",
  releaseStatus: "",
});

const files: string[] = [];

const project = computed(() => {
  return {
    _id: projectStore.selectedOption?._id || "",
    name: projectStore.selectedOption?.name,
    code: projectStore.selectedOption?.code,
  };
});

const reporter = computed(() => {
  return {
    _id: userStore.selected?._id || "",
    name: userStore.selected?.name,
    email: userStore.selected?.email,
    photo: userStore.selected?.photo,
  };
});

const assignee = computed(() => {
  return {
    _id: projectMemberStore.selected?._id || "",
    name: projectMemberStore.selected?.name,
    email: projectMemberStore.selected?.email,
    photo: projectMemberStore.selected?.photo,
  };
});

const rules = {
  feature: { required },
  description: { required },
  urgencyLevel: { required },
};

const requiredIdRules = computed(() => {
  return { _id: { required } };
});

const v$ = useVuelidate(rules, form);
const v$$ = useVuelidate(requiredIdRules, reporter.value);
const v$$$ = useVuelidate(requiredIdRules, project.value);

async function handleSubmitForm(): Promise<void> {
  v$.value.$reset();
  const isValidated = await v$.value.$validate();
  const isReporterValidated = await v$$.value.$validate();
  const isProjectValidated = await v$$$.value.$validate();
  if (!isValidated && !isReporterValidated && !isProjectValidated) return;
  try {
    isLoadingSubmit.value = true;
    const newTickets = restruct();
    await createTickets(newTickets);
    emits("need-refresh");
    closeModal(props.id);
    toast("Berhasil membuat tiket", { type: "success" });
  } catch (error) {
    toast("Gagal membuat tiket", { type: "error" });
    console.log("error : ", error);
  } finally {
    isLoadingSubmit.value = false;
  }
}

async function uploadFile(files: any[]) {
  if (files.length > 0) {
    files = [];
    uploadStatus.value = "loading";
    const storage = getStorage();
    for (const file of files) {
      const fileRef = storageRef(storage, file.name);
      await uploadBytes(fileRef, file);
      const downloadURL = await getDownloadURL(fileRef);
      files.push(downloadURL);
    }
    uploadStatus.value = "success";
  } else {
    uploadStatus.value = "error";
  }
}

function restruct() {
  return {
    projectId: project.value._id,
    feature: form.feature,
    description: form.description,
    email: form.email,
    urgencyLevel: form.urgencyLevel,
    reportBy: {
      _id: reporter.value._id,
      email: reporter.value.email,
      name: reporter.value.name,
      photo: reporter.value.photo,
    },
    releaseStatus: form.releaseStatus,
    status: "open",
    assignedBy: assignee.value,
    files,
  };
}

function handleSelectUser(user: User): void {
  userStore.selected = {
    _id: user._id,
    name: user.name ?? "",
    email: user.email ?? "",
    photo: user.photo ?? "",
  };
}

function handleSelectProject(): void {
  projectStore.selectedOption = projectStore.selected;
}

watch(
  () => projectStore.selected,
  () => {
    handleSelectProject();
  }
);

onMounted(async () => {
  handleSelectUser(authStore.user);
});
</script>
