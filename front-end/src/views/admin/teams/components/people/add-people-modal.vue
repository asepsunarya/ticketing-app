<template>
  <ui-modal :id="id">
    <div class="font-semibold text-xl mb-7">Tambah Tim</div>
    <div class="mb-10 flex flex-col gap-3">
      <ui-input
        v-model="form.name"
        type="text"
        placeholder="e.g., Asep"
        label="Nama"
      >
        <template v-if="v$.$error && v$.name.$invalid" #error>
          <span>Nama harus diisi </span>
        </template>
      </ui-input>

      <ui-input
        v-model="form.email"
        type="text"
        placeholder="kamu@ticketing.com"
        label="Email"
      >
        <template v-if="v$.$error && v$.email.$invalid" #error>
          <span>Email tidak valid</span>
        </template>
      </ui-input>
      <ui-select v-model="form.role" label="Role">
        <option selected disabled value="">Pilih Role</option>
        <option
          v-for="{ value, name } in roleOptions"
          :key="value"
          :value="value"
        >
          {{ name }}
        </option>
      </ui-select>
      <div v-if="v$.$error" class="label-text-alt text-error">
        <span v-if="v$.role.$invalid">Role harus dipilih</span>
      </div>

      <div class="flex">
        <ui-input
          v-model="form.file"
          @change="uploadFile"
          type="file"
          label="Foto"
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
    </div>
    <div class="flex justify-end items-center gap-3">
      <ui-button text="Batal" size="sm" type="ghost" :for="id" />
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
import uiSelect from "@/components/select/ui-select.vue";
import { ref, reactive } from "vue";
import { toast } from "vue3-toastify";
import { closeModal } from "@/helpers/modal-helpers";
import useVuelidate from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";
import { createPeople } from "@/views/admin/teams/components/people/services/people.service";
import {
  getDownloadURL,
  getStorage,
  ref as storageRef,
  uploadBytes,
} from "firebase/storage";
import type { CreatePeopleDto } from "./services/people.struct";

const props = defineProps<{ id: string }>();
const emits = defineEmits<(e: "need-refresh") => void>();

const isLoadingSubmit = ref<boolean>(false);
const uploadStatus = ref<string>("");

const roleOptions = ref([
  { value: "product-owner", name: "Product Owner" },
  { value: "tech-lead", name: "Tech Lead" },
  { value: "programmer", name: "Programmer" },
  { value: "cs", name: "Customer Service" },
]);

const form = reactive({
  name: "",
  email: "",
  role: "",
  photo: "",
  file: "",
});

const rules = {
  name: { required },
  email: { required, email },
  role: { required },
};

const v$ = useVuelidate(rules, form);

async function handleSubmitForm(): Promise<void> {
  const isValidated = await v$.value.$validate();
  if (!isValidated) return;
  try {
    isLoadingSubmit.value = true;
    const newPeople: CreatePeopleDto = {
      name: form.name,
      role: form.role,
      email: form.email,
    };
    if (form.photo) newPeople.photo = form.photo;

    await createPeople(newPeople);
    emits("need-refresh");
    closeModal(props.id);
    toast("Berhasil menambahkan tim", { type: "success" });
  } catch (error) {
    toast("Gagal menambahkan tim", { type: "error" });
    console.log("error : ", error);
  } finally {
    isLoadingSubmit.value = false;
  }
}

async function uploadFile(files: any[]) {
  if (files.length > 0) {
    uploadStatus.value = "loading";
    const storage = getStorage();
    const fileRef = storageRef(storage, files[0].name);
    await uploadBytes(fileRef, files[0]);
    const downloadURL = await getDownloadURL(fileRef);
    console.log(downloadURL, "url");
    form.photo = downloadURL;
    uploadStatus.value = "success";
  } else {
    uploadStatus.value = "error";
  }
}
</script>
