<template>
  <div>
    <div class="text-3xl font-semibold">Dashboard</div>
    <hr class="my-6" />
    <div class="flex justify-between">
      <div class="text-xl font-semibold">Proyek Terbaru</div>
      <div class="text-primary cursor-pointer" @click="seeAll">
        Lihat Semua Proyek
      </div>
    </div>
    <div class="flex gap-x-4 mt-4">
      <div
        v-for="(project, index) in projectStore.newest.docs"
        :key="project._id"
        class="flex border rounded w-80 h-56 hover:shadow-lg cursor-pointer"
      >
        <div
          class="h-full w-8 bg-opacity-40 bg-base-300 !-z-3"
          :class="{ 'animate-pulse': !projectColors[index] }"
          :style="`background-color: ${projectColors[index]}`"
        ></div>
        <div class="w-full pr-2 py-4 flex flex-col">
          <div class="-ml-4 flex gap-x-4 items-center">
            <img class="w-8 h-8 border rounded" :src="project.picture" />
            <img
              :id="`image-${project._id}`"
              crossorigin="anonymous"
              class="w-8 h-8 border rounded hidden"
              :src="project.picture"
            />
            <div>
              <div
                @click="toProject(project.code)"
                class="text-lg font-semibold"
              >
                {{ project.name }}
              </div>
              <div class="text-sm text-zinc-600 line-clamp-1">
                {{ project.description }}
              </div>
            </div>
          </div>
          <div class="ml-7">
            <div class="ml-1 font-semibold text-gray-600 mt-4 mb-2 uppercase">
              Antrian Terakhir
            </div>
            <div
              @click="toTicket(project.code, 'open')"
              class="flex justify-between items-center mt-2 px-1 py-1 rounded hover:bg-zinc-200"
            >
              <div class="text-xs">Tiket Open</div>
              <div
                class="text-xs bg-zinc-300 bg-opacity-50 rounded-full w-[40px] h-[20px] flex items-center justify-center"
              >
                {{ ticketCounts[index]?.open }}
              </div>
            </div>
            <div
              @click="toTicket(project.code, 'me')"
              class="flex justify-between items-center px-1 py-1 rounded hover:bg-zinc-200"
            >
              <div class="text-xs">Tiket Saya</div>
              <div
                class="text-xs bg-zinc-300 bg-opacity-50 rounded-full w-[40px] h-[20px] flex items-center justify-center"
              >
                {{ ticketCounts[index]?.me }}
              </div>
            </div>
          </div>
          <hr class="mt-4" />
          <div
            class="text-xs ml-7 mt-1.5 py-1 px-1 w-max rounded hover:bg-zinc-200"
            :class="{
              'bg-blue-400 bg-opacity-10 text-blue-400':
                showAction === project._id,
            }"
            id="dropdown-action"
            :data-dropdown-toggle="`action-${project._id}`"
          >
            Selengkapnya <i class="bi bi-chevron-down text-xs"></i>
          </div>

          <div
            :id="`action-${project._id}`"
            class="ml-7 mt-2 hidden w-max z-10 font-normal text-xs bg-white rounded shadow"
          >
            <div
              v-for="(label, type) in ticketTypes"
              :key="type"
              class="hover:bg-zinc-100 py-2 px-4"
              @click="toTicket(project.code, type)"
            >
              {{ label }} ({{ ticketCounts[index]?.[type] }})
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import type { Project } from "../projects/services/projects.struct";
// @ts-ignore
import ColorThief from "colorthief";
import { delay } from "@/helpers/time";
import { useProjectStore } from "@/stores/project";
import { countTickets } from "@/views/admin/tickets/services/tickets.service";
import type { TicketCountResult } from "../tickets/services/tickets.struct";
import { getProjects } from "../projects/services/projects.service";

const router = useRouter();
const showAction = ref<string>("");
const projectStore = useProjectStore();
const projectColors = ref<string[]>([]);
const ticketCounts = ref<TicketCountResult[]>([]);
const ticketTypes = {
  all: "Semua Tiket",
  me: "Semua Tiket Saya",
  open: "Semua Tiket Open",
  inprogress: "Semua Tiket In Progress",
  pending: "Semua Tiket Pending",
  closed: "Semua Tiket Closed",
};

function seeAll() {
  router.push("/admin/projects");
}

function toProject(code: string) {
  router.push(`/admin/projects/${code}/tickets`);
}

function toTicket(code: string, type: string) {
  if (type == "all") type = "";
  router.push(`/admin/projects/${code}/tickets/${type}`);
}

async function handleGetProjects() {
  try {
    const projectList = await getProjects(projectStore.filter);
    await handleCountTicket(projectList.docs);
    await computeProjectColors(projectList.docs);
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

async function computeProjectColors(projects: Project[]) {
  for (const project of projects) {
    const color = await getDominantColor(project);
    projectColors.value.push(color);
  }
}

async function getDominantColor(project: Project) {
  const colorThief = new ColorThief();
  let image = document.getElementById(`image-${project._id}`);

  if (!image) {
    await delay(1000);
    image = document.getElementById(`image-${project._id}`);
  }
  const color = colorThief.getColor(image);
  return `rgba(${color.join()},0.2)`;
}

async function handleCountTicket(projects: Project[]) {
  for (const { _id } of projects) {
    const result = await countTickets(_id);
    ticketCounts.value.push(result);
  }
}

onMounted(async () => {
  await handleGetProjects();
});
</script>
