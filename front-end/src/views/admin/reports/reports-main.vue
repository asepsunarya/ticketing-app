<template>
  <div class="text-xl font-semibold capitalize mb-2">Laporan bugs rate</div>
  <div class="text-zinc-500">
    Anda dapat melihat bugs rate di aplikasi {{ projectStore.selected?.name }}
  </div>
  <div class="w-24 mt-6">
    <ui-select v-model="selectedYear">
      <option selected disabled value="">Pilih Tahun</option>
      <option v-for="year in years" :key="year" :value="year">
        {{ year }}
      </option>
    </ui-select>
  </div>
  <div class="relative overflow-x-auto sm:rounded-lg min-h-screen mt-6">
    <table class="w-full text-sm text-left rtl:text-right text-gray-500">
      <thead class="text-black border-b">
        <tr>
          <th scope="col" class="px-6 py-3 font-semibold">Bulan</th>
          <th scope="col" class="px-6 py-3 font-semibold">Nama Proyek</th>
          <th scope="col" class="px-6 py-3 font-semibold">Total tiket</th>
          <th scope="col" class="px-6 py-3 font-semibold">
            Tiket terselesaikan
          </th>
          <th scope="col" class="px-6 py-3 font-semibold">Tiket tersisa</th>
          <th scope="col" class="px-6 py-3 font-semibold">Rate (%)</th>
        </tr>
      </thead>
      <tbody class="border-b text-black">
        <tr
          class="bg-white hover:bg-gray-50"
          v-for="(report, index) in reports"
          :key="index"
        >
          <th
            scope="row"
            class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
          ></th>
          <td class="px-6 py-4">test</td>
          <td class="px-6 py-4">test</td>
          <td class="px-6 py-4">test</td>
          <td class="px-6 py-4">test</td>
          <td class="px-6 py-4">test</td>
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
</template>

<script setup lang="ts">
import { useProjectStore } from "@/stores/project";
import cPagination from "@/components/pagination/c-pagination.vue";
import { reactive, ref } from "vue";
import uiSelect from "@/components/select/ui-select.vue";

const projectStore = useProjectStore();
const reports = ref([]);
const selectedYear = ref("2024");
const years = ["2023", "2024"];
const filter = reactive({
  page: 1,
  limit: 10,
  search: "",
  hasNextPage: false,
  nextPage: 0,
  prevPage: 0,
  totalPages: 1,
});

function handlePaginate() {
  //
}
</script>
