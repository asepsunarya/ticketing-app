<template>
  <div>
    <div class="flex justify-between">
      <div class="text-3xl font-semibold">Proyek</div>
      <ui-button text="Buat Proyek" for="add-project-modal" />
    </div>

    <div class="relative overflow-x-auto sm:rounded-lg min-h-screen">
      <table class="w-full text-sm text-left rtl:text-right text-gray-500">
        <thead class="text-black border-b">
          <tr>
            <th scope="col" class="px-6 py-3 font-semibold">Nama</th>
            <th scope="col" class="px-6 py-3 font-semibold">ID</th>
            <th scope="col" class="px-6 py-3 font-semibold">Keterangan</th>
            <th scope="col" class="px-6 py-3 font-semibold">Tech Lead</th>
            <th scope="col" class="px-6 py-3 font-semibold">
              <span class="sr-only">Edit</span>
            </th>
          </tr>
        </thead>
        <tbody class="border-b text-black">
          <tr
            class="bg-white hover:bg-gray-50"
            v-for="project in projects"
            :key="project._id"
          >
            <th
              scope="row"
              class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
            >
              <div
                class="flex gap-x-2 items-center cursor-pointer"
                @click.stop="toProject(project.code)"
              >
                <img class="w-6 h-6 border rounded" :src="project.picture" />
                <div class="text-primary hover:underline">
                  {{ project.name }}
                </div>
              </div>
            </th>
            <td class="px-6 py-4">{{ project.code }}</td>
            <td class="px-6 py-4">{{ project.description }}</td>
            <td
              scope="row"
              class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
            >
              <div class="flex gap-x-2 items-center cursor-pointer">
                <div
                  class="bg-gray-200 text-gray-500 rounded-full w-7 h-7 flex items-center justify-center"
                >
                  <img
                    class="w-7 h-7 rounded-full"
                    v-if="project.leader.photo"
                    :src="project.leader.photo"
                    alt=""
                  />
                  <span v-else class="uppercase text-sm">
                    {{
                      project?.leader?.name
                        ?.match(/\b\p{L}/gu)
                        ?.join("")
                        ?.slice(0, 2)
                    }}
                  </span>
                </div>
                <div class="text-primary hover:underline">
                  {{ project.leader.name }}
                </div>
              </div>
            </td>
            <td class="px-6 py-4 text-right">
              <a
                href="#"
                @click="handleShowAction(project._id)"
                class="font-medium text-blue-600 p-2 flex items-center justify-center w-8 h-8 rounded"
                ><i class="bi bi-three-dots text-2xl"></i
              ></a>
              <c-dropdown
                :show-action="showAction"
                :menus="actions"
                :id="project._id"
                :code="project.code"
                @click="handleClick"
              />
            </td>
          </tr>
        </tbody>
      </table>
      <div class="mt-6">
        <c-pagination
          :page="filter.page"
          :total-pages="filter.totalPages"
          :next-page="filter.nextPage"
          :prev-page="filter.prevPage"
          @change="handlePaginate"
        />
      </div>
    </div>
    <teleport to="body">
      <add-project-modal id="add-project-modal" @need-refresh="handleRefresh" />
      <remove-project-modal
        :project-id="selectedProjectId"
        @need-refresh="handleRefresh"
      />
    </teleport>
  </div>
</template>

<script setup lang="ts">
import uiButton from "@/components/button/ui-button.vue";
import cPagination from "@/components/pagination/c-pagination.vue";
import addProjectModal from "./components/add-project-modal.vue";
import removeProjectModal from "./components/remove-project-modal.vue";
import { onMounted, reactive, ref } from "vue";
import { getProjects } from "@/views/admin/projects/services/projects.service";
import type { Project } from "@/views/admin/projects/services/projects.struct";
import { useRouter } from "vue-router";
import cDropdown from "@/components/dropdown/c-dropdown.vue";
import type { DropdownMenu } from "@/components/dropdown/dropdown.struct";
import { openModal } from "@/helpers/modal-helpers";

const router = useRouter();
const filter = reactive({
  page: 1,
  limit: 10,
  search: "",
  hasNextPage: false,
  nextPage: 0,
  prevPage: 0,
  totalPages: 1,
});
const projects = ref<Project[]>([]);
const actions = ref<DropdownMenu[]>([
  { name: "setting", title: "Pengaturan" },
  { name: "remove", title: "Hapus" },
]);
const selectedProjectId = ref<string>("");
const showAction = ref<string>("");

async function handleGetProjects() {
  try {
    const projectList = await getProjects(filter);

    projects.value = projectList.docs;
    filter.hasNextPage = projectList.hasNextPage;
    filter.page = projectList.page;
    filter.totalPages = projectList.totalPages;
    filter.nextPage = projectList.nextPage || 0;
    filter.prevPage = projectList.prevPage || 0;
  } catch (error) {
    console.log("error : ", error);
  }
}

function handleShowAction(projectId: string) {
  if (showAction.value === projectId) showAction.value = "";
  else showAction.value = projectId;
}

function handlePaginate(page: number): void {
  filter.page = page;
  handleGetProjects();
}

function handleRefresh() {
  filter.page = 1;
  handleGetProjects();
}

function toProject(code: string) {
  router.push(`/admin/projects/${code}/tickets`);
}

function handleClick({ menu, id, code }: any) {
  switch (menu.name) {
    case "setting":
      router.push(`/admin/projects/${code}/settings/details`);
      break;
    case "remove":
      selectedProjectId.value = id;
      openModal("remove-project-modal");
      break;
  }
}

onMounted(async () => {
  await handleGetProjects();
});
</script>
