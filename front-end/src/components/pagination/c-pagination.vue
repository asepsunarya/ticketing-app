<template>
  <div class="flex w-max">
    <div class="px-4 py-2 cursor-pointer">
      <i class="font-bold bi bi-chevron-left" @click="changePage(prevPage)"></i>
    </div>
    <div
      class="px-4 py-2 cursor-pointer bg-opacity-10 rounded"
      :class="{ 'bg-blue-400 text-blue-400': pageNumber === page }"
      v-for="(pageNumber, index) in pages()"
      :key="index"
      @click="changePage(pageNumber)"
    >
      {{ pageNumber }}
    </div>
    <div class="px-4 py-2 cursor-pointer" @click="changePage(nextPage)">
      <i class="font-bold bi bi-chevron-right"></i>
    </div>
  </div>
</template>
<script setup lang="ts">
const props = defineProps<{
  page: number;
  totalPages: number;
  prevPage: number;
  nextPage: number;
}>();

const emits = defineEmits<{
  (e: "change", page: number): void;
}>();
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
    emits("change", page);
  }
}
</script>
