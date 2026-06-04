<template>
  <ui-modal
    id="add-customer-ticket-modal"
    :prevent-close="true"
    size="xl"
    :with-header="true"
    title="Buat Tiket"
  >
    <div class="mb-2 flex flex-col gap-3">
      <ui-select v-model="form.projectId" label="Project">
        <option value="" disabled>Pilih project</option>
        <option v-for="project in projects" :key="project._id" :value="project._id">
          {{ project.name }}
        </option>
      </ui-select>
      <template v-if="v$.$error && v$.projectId.$invalid">
        <span class="label-text-alt text-error">Project harus dipilih</span>
      </template>

      <ui-input
        v-model="form.feature"
        type="text"
        placeholder="e.g,. Login"
        label="Fitur"
      >
        <template v-if="v$.$error && v$.feature.$invalid" #error>
          <span>Fitur harus diisi</span>
        </template>
      </ui-input>

      <div class="form-control">
        <label for="customer-ticket-description" class="mb-2">Penjelasan</label>
        <textarea
          v-model="form.description"
          id="customer-ticket-description"
          class="textarea textarea-bordered"
          placeholder="e.g,. User tidak dapat login"
        />
        <template v-if="v$.$error && v$.description.$invalid">
          <span class="label-text-alt text-error mt-2">Penjelasan harus diisi</span>
        </template>
      </div>

      <div class="flex">
        <div class="form-control">
          <label class="label">File Pendukung</label>
          <input
            type="file"
            multiple
            class="file-input file-input-bordered file-input-ghost file-input-sm max-w-sm"
            @change="handleSelectFiles"
          />
        </div>
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
      <div v-if="selectedRawFiles.length && uploadStatus !== 'success'" class="text-sm text-zinc-500">
        {{ selectedRawFiles.length }} file dipilih. File akan diupload saat tiket disimpan.
      </div>
      <div v-if="selectedFiles.length" class="text-sm text-zinc-500">
        {{ selectedFiles.length }} file berhasil dilampirkan
      </div>

      <div class="w-1/2">
        <ui-select v-model="form.releaseStatus" label="Status Rilis">
          <option v-for="status in releaseStatus" :key="status.key" :value="status.key">
            {{ status.value }}
          </option>
        </ui-select>
      </div>
    </div>

    <template #action>
      <ui-button text="Batal" size="sm" type="ghost" for="add-customer-ticket-modal" />
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
import { reactive, ref } from 'vue';
import { toast } from 'vue3-toastify';
import useVuelidate from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import {
  getDownloadURL,
  getStorage,
  ref as storageRef,
  uploadBytes,
} from 'firebase/storage';
import uiButton from '@/components/button/ui-button.vue';
import uiInput from '@/components/input/ui-input.vue';
import uiModal from '@/components/modal/ui-modal.vue';
import uiSelect from '@/components/select/ui-select.vue';
import { closeModal } from '@/helpers/modal-helpers';
import type { Project } from '@/views/admin/projects/services/projects.struct';
import { createCustomerTicket } from '../services/customer-ticket.service';

const props = defineProps<{
  projects: Project[];
}>();

const emits = defineEmits<{
  (e: 'need-refresh'): void;
}>();

const isLoadingSubmit = ref(false);
const uploadStatus = ref('');
const selectedFiles = ref<string[]>([]);
const selectedRawFiles = ref<File[]>([]);
const releaseStatus = [
  { key: 'new', value: 'Baru' },
  { key: 'old', value: 'Lama' },
];

const form = reactive({
  projectId: '',
  feature: '',
  description: '',
  file: '',
  urgencyLevel: 'standard',
  releaseStatus: 'old',
});

const rules = {
  projectId: { required },
  feature: { required },
  description: { required },
};

const v$ = useVuelidate(rules, form);

async function handleSubmitForm() {
  const isValidated = await v$.value.$validate();
  if (!isValidated || uploadStatus.value === 'loading') return;

  try {
    isLoadingSubmit.value = true;
    const files = await uploadSelectedFiles();
    await createCustomerTicket({
      projectId: form.projectId,
      feature: form.feature,
      description: form.description,
      urgencyLevel: form.urgencyLevel,
      releaseStatus: form.releaseStatus,
      files,
    });

    clearForm();
    emits('need-refresh');
    closeModal('add-customer-ticket-modal');
    toast('Berhasil membuat tiket', { type: 'success' });
  } catch (error) {
    console.log(error);
    toast('Gagal membuat tiket', { type: 'error' });
  } finally {
    isLoadingSubmit.value = false;
  }
}

function handleSelectFiles(event: Event) {
  const target = event.target as HTMLInputElement;
  selectedRawFiles.value = Array.from(target.files || []);
  selectedFiles.value = [];
  uploadStatus.value = selectedRawFiles.value.length ? 'selected' : '';
}

async function uploadSelectedFiles() {
  if (!selectedRawFiles.value.length) return selectedFiles.value;
  if (selectedFiles.value.length === selectedRawFiles.value.length) return selectedFiles.value;

  try {
    uploadStatus.value = 'loading';
    const storage = getStorage();
    const uploadedFiles: string[] = [];
    for (const file of selectedRawFiles.value) {
      const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '-');
      const fileRef = storageRef(storage, `tickets/${Date.now()}-${safeName}`);
      await uploadBytes(fileRef, file);
      const downloadURL = await getDownloadURL(fileRef);
      uploadedFiles.push(downloadURL);
    }
    selectedFiles.value = uploadedFiles;
    uploadStatus.value = 'success';
    return uploadedFiles;
  } catch (error) {
    console.log(error);
    uploadStatus.value = 'error';
    toast('Gagal mengupload file', { type: 'error' });
    throw error;
  }
}

function clearForm() {
  form.projectId = '';
  form.feature = '';
  form.description = '';
  form.file = '';
  form.urgencyLevel = 'standard';
  form.releaseStatus = 'old';
  selectedFiles.value = [];
  selectedRawFiles.value = [];
  uploadStatus.value = '';
  v$.value.$reset();
}
</script>
