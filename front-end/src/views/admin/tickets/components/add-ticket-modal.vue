<template>
  <ui-modal :id="id">
    <div class="font-semibold text-xl mb-7">Buat Tiket</div>
    <div class="mb-10 flex flex-col gap-3">
      <ui-input
        v-model="form.feature"
        type="text"
        placeholder="e.g,. Buat postingan"
        label="Fitur"
      >
        <template v-if="v$.$error" #error>
          <span v-if="v$.feature.$invalid">Fitur harus diisi </span>
        </template>
      </ui-input>
      <div class="form-control">
        <label for="description" class="mb-2">Penjelasan</label>
        <textarea
          id="description"
          class="textarea textarea-bordered"
          placeholder="e.g,. User tidak dapat mengupload media"
        ></textarea>
      </div>
      <ui-input
        v-model="form.email"
        type="text"
        placeholder="e.g,. aseps@manypage.id"
        label="Email"
      />
      <!-- <ui-input
        v-model="form.screenshot"
        type="file"
        placeholder="Skrinsut"
        label="Screenshot"
      /> -->

      <search-user title="Pelapor" :include-self="true">
        <template v-if="v$$.$error && v$$._id.$invalid" #error>
          <span>Pelapor harus dipilih </span>
        </template>
      </search-user>

      <search-project-member title="Assignee" />
      <ui-select v-model="form.urgencyLevel" label="Tingkat Urgensi">
        <option v-for="level in urgencyLevels" :key="level" :value="level">
          {{ level }}
        </option>
      </ui-select>
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
import searchUser from "@/views/admin/components/search-user.vue";
import searchProjectMember from "@/views/admin/components/search-project-member.vue";
import { ref, reactive, onMounted, computed } from "vue";
import type { User } from "@/views/user/services/user.struct";
import { toast } from "vue3-toastify";
import { closeModal } from "@/helpers/modal-helpers";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { useAuthStore } from "@/stores/auth";
import { useUserStore } from "@/stores/user";
import { useProjectMemberStore } from "@/stores/project-member";

const props = defineProps<{ id: string }>();
const emits = defineEmits<(e: "need-refresh") => void>();

const authStore = useAuthStore();
const userStore = useUserStore();
const projectMemberStore = useProjectMemberStore();

const isLoadingSubmit = ref<boolean>(false);
const urgencyLevels = [5, 4, 3, 2, 1];

const form = reactive({
  project: {
    id: "",
    name: "",
    picture: "",
  },
  email: "",
  feature: "",
  name: "",
  code: "",
  description: "",
  screenshot: "",
  urgencyLevel: "",
});

const reporter = computed(() => {
  return {
    _id: userStore.selected?._id || "",
    email: userStore.selected?.email,
    photo: userStore.selected?.photo,
  };
});

const assignee = computed(() => {
  return {
    _id: projectMemberStore.selected?._id || "",
    email: projectMemberStore.selected?.email,
    photo: projectMemberStore.selected?.photo,
  };
});

const rules = {
  name: { required },
  code: { required },
  description: { required },
};
const reporterRules = {
  _id: { required },
};

const v$ = useVuelidate(rules, form);
const v$$ = useVuelidate(reporterRules, reporter.value);

async function handleSubmitForm(): Promise<void> {
  const isValidated = await v$.value.$validate();
  const isReporterValidated = await v$$.value.$validate();
  if (!isValidated && !isReporterValidated) return;
  try {
    isLoadingSubmit.value = true;
    const newProject = {
      name: form.name,
      description: form.description,
      code: form.code,
    };

    // await createProjects(newProject);
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

function handleSelectUser(user: User): void {
  userStore.selected = {
    _id: user._id,
    name: user.name ?? "",
    email: user.email ?? "",
    photo: user.photo ?? "",
  };
}

onMounted(async () => {
  handleSelectUser(authStore.user);
});
</script>
