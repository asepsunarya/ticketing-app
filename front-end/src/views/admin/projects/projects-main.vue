<template>
  <div>
    <div class="flex justify-between">
      <div class="text-3xl font-semibold">Proyek</div>
      <c-button text="Buat Proyek" type="default" />
    </div>

    <div class="relative overflow-x-auto sm:rounded-lg">
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
          <tr class="bg-white hover:bg-gray-50">
            <th
              scope="row"
              class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
            >
              <div class="flex gap-x-2 items-center">
                <img
                  class="w-6 h-6 border rounded"
                  src="https://media.licdn.com/dms/image/D560BAQHdDHdh6paD8w/company-logo_200_200/0/1683694599437/manypage_id_logo?e=2147483647&v=beta&t=AR8JGUIgIDaqYxBEHizyD1IgGVUzaf6AUxIA8qHrKGc"
                />
                <div class="text-blue-400">Manypage.id</div>
              </div>
            </th>
            <td class="px-6 py-4">MANYPAGE</td>
            <td class="px-6 py-4">Kelola Posting</td>
            <td class="px-6 py-4">$2999</td>
            <td class="px-6 py-4 text-right">
              <a href="#" class="font-medium text-blue-600">Edit</a>
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
  </div>
</template>

<script setup lang="ts">
import cButton from "@/components/button/c-button.vue";
import cPagination from "@/components/pagination/c-pagination.vue";

function handlePaginate() {
  //
}
</script>
