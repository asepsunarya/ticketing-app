<template>
  <div>
    <div class="text-3xl font-semibold">Kerjaanmu</div>
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
              class="flex justify-between items-center mt-2 px-1 py-1 rounded hover:bg-zinc-200"
            >
              <div class="text-xs">Tiket Open</div>
              <div
                class="text-xs bg-zinc-300 bg-opacity-50 rounded-full w-[40px] h-[20px] flex items-center justify-center"
              >
                0
              </div>
            </div>
            <div
              class="flex justify-between items-center px-1 py-1 rounded hover:bg-zinc-200"
            >
              <div class="text-xs">Tiket Saya</div>
              <div
                class="text-xs bg-zinc-300 bg-opacity-50 rounded-full w-[40px] h-[20px] flex items-center justify-center"
              >
                0
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
            Semua Antrian <i class="bi bi-chevron-down text-xs"></i>
          </div>

          <div
            :id="`action-${project._id}`"
            class="ml-7 mt-2 hidden w-max z-10 font-normal text-xs bg-white rounded shadow"
          >
            <div class="flex flex-col my-1" aria-labelledby="dropdown-action">
              <div class="hover:bg-zinc-100 py-2 px-4">Semua Tiket Open</div>
              <div class="hover:bg-zinc-100 py-2 px-4">Semua Tiket Saya</div>
              <div class="hover:bg-zinc-100 py-2 px-4">Semua Tiktet Closed</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
import type { Project } from "../projects/services/projects.struct";
// @ts-ignore
import ColorThief from "colorthief";
import { delay } from "@/helpers/time";
import { useProjectStore } from "@/stores/project";

const router = useRouter();
const showAction = ref<string>("");
const projectStore = useProjectStore();
const projectColors = ref<string[]>([]);

function seeAll() {
  router.push("/admin/projects");
}

function toProject(code: string) {
  router.push(`/admin/projects/${code}/tickets`);
}

async function computeProjectColors() {
  for (const project of projectStore.newest.docs) {
    const color = await getDominantColor(project);
    projectColors.value.push(color);
  }
}

async function getDominantColor(project: Project) {
  const colorThief = new ColorThief();
  let image = document.getElementById(`image-${project._id}`);

  if (!image) {
    await delay(100);
    image = document.getElementById(`image-${project._id}`);
  }
  const color = colorThief.getColor(image);
  return `rgba(${color.join()},0.2)`;
}

watch(
  () => projectStore.newest.docs,
  () => computeProjectColors()
);
</script>
