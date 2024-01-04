<template>
  <div class="space-y-8">
    <div class="flex justify-between">
      <div class="text-3xl font-semibold">Tim</div>
      <div class="flex gap-2">
        <!-- <ui-button type="light" text="Buat Tim" for="add-team-modal" /> -->
        <ui-button text="Tambah Tim" for="add-people-modal" />
      </div>
    </div>
    <people-list :people="people" />
    <!-- <team-list :teams="teams" /> -->

    <teleport to="body">
      <add-people-modal id="add-people-modal" @need-refresh="handleGetPeople" />
      <add-team-modal id="add-team-modal" @need-refresh="handleGetTeams" />
    </teleport>
  </div>
</template>
<script setup lang="ts">
import uiButton from "@/components/button/ui-button.vue";
import peopleList from "@/views/admin/teams/components/people/people-list.vue";
import teamList from "@/views/admin/teams/components/teams-list.vue";
import addPeopleModal from "./components/people/add-people-modal.vue";
import { getUsers } from "../services/users.service";
import { onMounted, reactive, ref } from "vue";
import type { User } from "@/views/user/services/user.struct";
import { getTeams } from "@/views/admin/teams/services/teams.service";
import type { Team } from "./services/teams.struct";

const filter = reactive({
  page: 1,
  limit: 5,
  search: "",
  includeSelf: true,
});

const filterTeam = reactive({
  page: 1,
  limit: 5,
  search: "",
});

const people = ref<User[]>([]);
const teams = ref<Team[]>([]);

async function handleGetPeople() {
  const results = await getUsers(filter);
  people.value = results.docs;
}

async function handleGetTeams() {
  const results = await getTeams(filterTeam);
  teams.value = results.docs;
}

onMounted(async () => {
  handleGetPeople();
  handleGetTeams();
});
</script>
