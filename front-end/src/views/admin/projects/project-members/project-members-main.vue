<template>
  <div>
    <div class="flex justify-between mb-7">
      <div class="text-3xl font-semibold">Anggota</div>
      <ui-button text="Tambah Anggota" for="add-project-member-modal" />
    </div>

    <div class="relative overflow-x-auto sm:rounded-lg">
      <table class="w-full text-sm text-left rtl:text-right text-gray-500">
        <thead class="text-black border-b">
          <tr>
            <th scope="col" class="px-6 py-3 font-semibold">Nama</th>
            <th scope="col" class="px-6 py-3 font-semibold">Email</th>
            <th scope="col" class="px-6 py-3 font-semibold">Role</th>
            <th scope="col" class="px-6 py-3 font-semibold">Aksi</th>
          </tr>
        </thead>
        <tbody class="border-b text-black divide-y">
          <tr v-for="member in members" :key="member.email">
            <td class="px-6 py-3 capitalize">{{ member.name }}</td>
            <td class="px-6 py-3">{{ member.email }}</td>
            <td class="px-6 py-3 capitalize">{{ member.role }}</td>
            <td class="px-6 py-3">
              <ui-button
                @click="handleRemove(member._id)"
                text="Hapus"
                type="error"
                size="sm"
              />
            </td>
          </tr>
        </tbody>
      </table>
      <div class="mt-6">
        <c-pagination
          :page="1"
          :total-pages="1"
          :next-page="0"
          :prev-page="0"
          @change="handlePaginate"
        />
      </div>
    </div>
    <teleport to="body">
      <add-project-member-modal @need-refresh="handleRefresh" />
      <remove-project-member-modal
        :project-member-id="selectedProjectMemberId"
        @need-refresh="handleRefresh"
      />
    </teleport>
  </div>
</template>

<script setup lang="ts">
import uiButton from "@/components/button/ui-button.vue";
import addProjectMemberModal from "@/views/admin/projects/project-members/components/add-project-member-modal.vue";
import removeProjectMemberModal from "@/views/admin/projects/project-members/components/remove-project-member-modal.vue";
import cPagination from "@/components/pagination/c-pagination.vue";
import { onMounted, reactive, ref } from "vue";
import { getMembers } from "@/views/admin/projects/project-members/services/project-members.service";
import type { ProjectMember } from "./services/project-members.struct";
import { openModal } from "@/helpers/modal-helpers";

const isLoadingGetMembers = ref<boolean>(false);
const filter = reactive({
  page: 1,
  limit: 10,
  search: "",
  hasNextPage: false,
  totalPages: 1,
});
const members = ref<ProjectMember[]>([]);
const selectedProjectMemberId = ref<string>("");

async function handleGetMembers() {
  try {
    isLoadingGetMembers.value = true;
    const memberList = await getMembers(filter);

    members.value = memberList.docs;
    filter.hasNextPage = memberList.hasNextPage;
    filter.page = memberList.page;
    filter.totalPages = memberList.totalPages;
  } catch (error) {
    console.log("error : ", error);
  } finally {
    isLoadingGetMembers.value = false;
  }
}

function handlePaginate(page: number): void {
  filter.page = page;
  handleGetMembers();
}

function handleRemove(id: string) {
  selectedProjectMemberId.value = id;
  openModal("remove-project-member-modal");
}

function handleRefresh() {
  filter.page = 1;
  handleGetMembers();
}

onMounted(() => {
  handleGetMembers();
});
</script>
