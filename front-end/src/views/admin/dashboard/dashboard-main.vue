<template>
  <div>
    <div class="text-3xl font-semibold">Kerjaanmu</div>
    <hr class="my-6" />
    <div class="flex justify-between">
      <div class="text-xl font-semibold">Proyek Terbaru</div>
      <div class="text-blue-400 cursor-pointer" @click="toProject">
        Lihat Semua Proyek
      </div>
    </div>
    <div class="flex gap-x-4 mt-4">
      <div
        v-for="index in 2"
        :key="index"
        class="flex border rounded w-80 h-56 hover:shadow-lg cursor-pointer"
      >
        <div class="h-full w-8 bg-orange-400 bg-opacity-40"></div>
        <div class="w-full pr-2 py-4 flex flex-col">
          <div class="-ml-4 flex gap-x-4 items-center">
            <img
              class="w-8 h-8 border rounded"
              src="https://media.licdn.com/dms/image/D560BAQHdDHdh6paD8w/company-logo_200_200/0/1683694599437/manypage_id_logo?e=2147483647&v=beta&t=AR8JGUIgIDaqYxBEHizyD1IgGVUzaf6AUxIA8qHrKGc"
            />
            <div>
              <div class="text-lg font-semibold">Manypage.id</div>
              <div class="text-sm text-zinc-600">Kelola Posting</div>
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
                1
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
            :class="{ 'bg-blue-400 bg-opacity-10 text-blue-400': showOption }"
            data-dropdown-toggle="dropdownOption"
            @click="showOption = !showOption"
          >
            Semua Antrian <i class="bi bi-chevron-down text-xs"></i>
          </div>
          <div
            v-show="showOption"
            class="ml-7 mt-2 w-max z-10 font-normal text-xs bg-white rounded shadow"
          >
            <div class="flex flex-col my-1">
              <div class="hover:bg-zinc-100 py-2 px-4">Semua Tiket Open</div>
              <div class="hover:bg-zinc-100 py-2 px-4">Semua Tiket Saya</div>
              <div class="hover:bg-zinc-100 py-2 px-4">Tugas Open</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const showOption = ref(false);

function toProject() {
  router.push("/admin/projects");
}
</script>
