<template>
  <div class="flex justify-between mb-4">
    <div>
      <div class="text-2xl font-bold">List Bugs</div>
      <div class="text-zinc-400">Menampilkan list bugs</div>
    </div>
    <div class="self-center">
      <c-button
        text="Tambah"
        type="outline-default"
        icon="bi bi-plus"
        @click="handleCreate"
      />
    </div>
  </div>
  <c-card>
    <div class="relative overflow-x-auto sm:rounded-lg">
      <bugs-filter />
      <bugs-list />
    </div>
    <c-pagination :page="7" :total-pages="10" :prev-page="0" :next-page="1" />
  </c-card>
</template>

<script setup lang="ts">
import cButton from "@/components/button/c-button.vue";
import cCard from "@/components/card/c-card.vue";
import cPagination from "@/components/pagination/c-pagination.vue";
import bugsFilter from "@/views/admin/bugs/bugs-list/bugs-filter.vue";
import bugsList from "@/views/admin/bugs/bugs-list/bugs-list.vue";
import { useRouter } from "vue-router";

const router = useRouter();

function handleCreate() {
  router.push("/admin/bugs/create");
}
</script>
