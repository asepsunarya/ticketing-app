<template>
  <div
    id="dropdownTeam"
    class="z-10 hidden font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-64"
  >
    <!-- <div class="pt-2">
      <div class="py-2 px-4 text-sm font-bold">Tim</div>
      <div class="text-sm text-gray-700 px-4 py-2">
        Tim tidak tersedia
        <div
          class="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
        >
          <img
            src="https://media.licdn.com/dms/image/D560BAQHdDHdh6paD8w/company-logo_200_200/0/1683694599437/manypage_id_logo?e=2147483647&v=beta&t=AR8JGUIgIDaqYxBEHizyD1IgGVUzaf6AUxIA8qHrKGc"
            class="w-8 h-8 rounded"
          />
          <div class="flex flex-col px-4">
            <a href="#" class="block hover:bg-gray-100">Tim A</a>
            <span class="text-zinc-400 text-xs">Manychat.id</span>
          </div>
        </div>
        <div class="flex items-center px-4 hover:bg-gray-100 cursor-pointer">
          <img
            src="https://media.licdn.com/dms/image/D560BAQHdDHdh6paD8w/company-logo_200_200/0/1683694599437/manypage_id_logo?e=2147483647&v=beta&t=AR8JGUIgIDaqYxBEHizyD1IgGVUzaf6AUxIA8qHrKGc"
            class="w-8 h-8 rounded"
          />
          <div class="flex flex-col px-4 py-2">
            <a href="#" class="block hover:bg-gray-100">Tim B</a>
            <span class="text-zinc-400 text-xs">Manypage.id</span>
          </div>
        </div>
      </div>
    </div> -->
    <div class="py-1">
      <label
        for="add-people-modal-top-bar"
        class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
      >
        <i class="bi bi-plus text-xl mr-4"></i>
        Tambah Tim
      </label>
      <!-- <div
        class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
      >
        <i class="bi bi-people-fill text-xl mr-4"></i>
        Buat Tim
      </div> -->
    </div>
    <div class="py-1">
      <div
        @click.stop="seeAll"
        class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
      >
        Lihat Semua
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();

function seeAll() {
  router.push("/admin/teams");
}
</script>
