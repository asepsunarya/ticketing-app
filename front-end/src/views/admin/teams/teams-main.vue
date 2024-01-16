<template>
  <div class="space-y-8">
    <div class="flex justify-between">
      <div class="text-3xl font-semibold">Tim</div>
      <div class="flex gap-2">
        <ui-button
          v-if="authStore.user.role === 'admin'"
          text="Tambah Tim"
          for="add-people-modal"
        />
      </div>
    </div>
    <people-list :people="people" />

    <teleport to="body">
      <add-people-modal id="add-people-modal" @need-refresh="handleGetPeople" />
    </teleport>
  </div>
</template>
<script setup lang="ts">
import uiButton from "@/components/button/ui-button.vue";
import peopleList from "@/views/admin/teams/components/people/people-list.vue";
import addPeopleModal from "./components/people/add-people-modal.vue";
import { getUsers } from "../services/users.service";
import { onMounted, reactive, ref } from "vue";
import type { User } from "@/views/user/services/user.struct";
import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();

const filter = reactive({
  page: 1,
  limit: 20,
  search: "",
  includeSelf: true,
});

const people = ref<User[]>([]);

async function handleGetPeople() {
  const results = await getUsers(filter);
  people.value = results.docs.filter((user) => user.role !== "user-dummy");
}

onMounted(async () => {
  handleGetPeople();
});
</script>
