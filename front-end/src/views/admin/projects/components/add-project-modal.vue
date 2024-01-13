<template>
  <ui-modal :id="id">
    <div class="font-semibold text-xl mb-7">Tambah Proyek</div>
    <div class="mb-10 flex flex-col gap-3">
      <ui-input
        v-model="form.name"
        type="text"
        placeholder="Manypage.id"
        label="Nama Proyek"
      >
        <template v-if="v$.$error" #error>
          <span v-if="v$.name.$invalid">Nama proyek harus diisi </span>
        </template>
      </ui-input>

      <search-user title="Leader" :include-self="true">
        <template v-if="v$$.$error && v$$._id.$invalid" #error>
          <span>Leader harus dipilih </span>
        </template>
      </search-user>
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
import { ref, reactive, computed } from "vue";
import { toast } from "vue3-toastify";
import searchUser from "@/views/admin/components/search-user.vue";
import { closeModal } from "@/helpers/modal-helpers";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { createProjects } from "@/views/admin/projects/services/projects.service";
import { useUserStore } from "@/stores/user";

const props = defineProps<{ id: string }>();
const emits = defineEmits<(e: "need-refresh") => void>();

const userStore = useUserStore();
const isLoadingSubmit = ref<boolean>(false);

const form = reactive({
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

const userRules = computed(() => {
  return { _id: { required } };
});

const v$ = useVuelidate(rules, form);
const v$$ = useVuelidate(userRules, selectedUser.value);

async function handleSubmitForm(): Promise<void> {
  v$.value.$reset();
  const isValidated = await v$.value.$validate();
  const isUserValidated = await v$$.value.$validate();
  if (!isValidated || !isUserValidated) return;
  try {
    isLoadingSubmit.value = true;
    const newProject = {
      name: form.name,
      description: form.description,
      code: form.code,
      leader: selectedUser.value,
    };

    await createProjects(newProject);
    emits("need-refresh");
    closeModal(props.id);
    toast("Berhasil menambahkan proyek", { type: "success" });
  } catch (error) {
    toast("Gagal menambahkan proyek", { type: "error" });
    console.log("error : ", error);
  } finally {
    isLoadingSubmit.value = false;
  }
}
</script>
