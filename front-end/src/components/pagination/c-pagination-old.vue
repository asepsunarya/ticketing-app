<template>
  <nav
    class="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4"
    aria-label="Table navigation"
  >
    <span
      class="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto"
      >Showing
      <span class="font-semibold text-gray-900 dark:text-white">1-10</span> of
      <span class="font-semibold text-gray-900 dark:text-white">{{
        totalPages
      }}</span></span
    >
    <ul class="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
      <li>
        <a
          href="#"
          @click="changePage(prevPage)"
          class="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >Previous</a
        >
      </li>
      <li v-for="(pageNumber, index) in pages()" :key="index">
        <a
          href="#"
          @click="changePage(pageNumber)"
          :class="{ 'bg-blue-400': pageNumber == page }"
          class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >{{ pageNumber }}</a
        >
      </li>

      <li>
        <a
          href="#"
          @click="changePage(nextPage)"
          class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >Next</a
        >
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
const props = defineProps<{
  page: number;
  totalPages: number;
  prevPage: number;
  nextPage: number;
}>();

const emit = defineEmits(["change"]);

function pages(): number[] {
  const pageList = [];

  for (
    let i = Math.max(1, props.page - 2);
    i <= Math.min(props.totalPages, props.page + 2);
    i++
  ) {
    pageList.push(i);
  }

  return pageList;
}

function changePage(page: number) {
  if (page) {
    emit("change", page);
  }
}
</script>
