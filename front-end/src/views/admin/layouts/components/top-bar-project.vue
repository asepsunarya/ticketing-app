<template>
  <div
    id="dropdownNavbar"
    class="z-10 hidden font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-64"
  >
    <div class="pt-2">
      <div class="py-2 px-4 text-sm font-bold">Terbaru</div>
      <div class="text-sm text-gray-700">
        <div
          v-for="project in projectStore.newest.docs"
          :key="project._id"
          @click="toProject(project.code)"
          class="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
        >
          <img :src="project.picture" class="w-8 h-8 rounded" />
          <div class="flex flex-col px-4">
            <a href="#" class="block hover:bg-gray-100">{{ project.name }}</a>
            <span class="text-zinc-400 text-xs">{{ project.description }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="py-1">
      <div
        @click.stop="seeAll"
        class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
      >
        Lihat Semua
      </div>
      <label
        for="add-project-modal-top-bar"
        class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
        >Buat Proyek</label
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { getProjects } from "../../projects/services/projects.service";
import { useProjectStore } from "@/stores/project";
import { useRouter } from "vue-router";

const router = useRouter();
const projectStore = useProjectStore();

async function handleGetProjects() {
  try {
    const projectList = await getProjects(projectStore.filter);
    projectStore.newest.docs = projectList.docs;
    projectStore.filter.hasNextPage = projectList.hasNextPage;
    projectStore.filter.page = projectList.page;
    projectStore.filter.totalPages = projectList.totalPages;
    projectStore.filter.nextPage = projectList.nextPage || 0;
    projectStore.filter.prevPage = projectList.prevPage || 0;
  } catch (error) {
    console.log("error : ", error);
  }
}

function seeAll() {
  router.push("/admin/projects");
}

function toProject(code: string) {
  router.push(`/admin/projects/${code}/tickets`);
}

onMounted(async () => {
  await handleGetProjects();
});
</script>
