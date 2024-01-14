<template>
  <div class="relative group">
    <ui-input
      v-model="search"
      type="text"
      :placeholder="`${title ? 'Pilih ' + title : ''}`"
      :label="title"
      @input="handleSearch"
    />
    <div
      class="z-[100] absolute w-full group-focus-within:block group-active:block hidden"
    >
      <div
        class="flex flex-col divide-y bg-white drop-shadow-lg mt-2 rounded-lg max-h-40 overflow-auto"
      >
        <template v-if="isLoading">
          <div class="flex justify-center p-3">
            <span class="loading loading-spinner text-zinc-400" />
          </div>
        </template>
        <template v-else-if="options.length">
          <div
            v-for="option in options"
            :key="option._id"
            class="p-3 cursor-pointer hover:bg-zinc-100 flex items-center gap-3"
            @click="handleSelect(option)"
          >
            <div
              class="w-7 h-7 rounded-full bg-zinc-300 flex justify-center items-center"
            >
              <img
                class="w-7 h-7 rounded-full"
                v-if="option.photo"
                :src="option.photo"
                alt=""
              />
              <i v-else class="bi bi-person" />
            </div>
            <div>
              {{ option.value || option?.name }}
            </div>
          </div>
        </template>
        <template v-else>
          <div class="p-3 text-center">{{ title }} Tidak Ditemukan.</div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import uiInput from "@/components/input/ui-input.vue";
import { ref } from "vue";

const timeOut = ref<number>(0);

defineProps<{
  title?: string;
  isLoading: boolean;
  options: any[];
}>();

const emits = defineEmits<{
  (e: "select", value: any): void;
  (e: "search", value: string): void;
}>();

const search = ref<string>("");

function handleSearch(): void {
  clearTimeout(timeOut.value);
  setTimeout(() => {
    emits("search", search.value);
  }, 500);
}

function handleSelect(value: any): void {
  emits("select", value);
}
</script>
