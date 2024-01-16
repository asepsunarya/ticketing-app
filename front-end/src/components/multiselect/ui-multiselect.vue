<template>
  <div v-if="selected?._id">
    <div v-if="title" class="mb-2 mt-2 ml-1">{{ title }}</div>
    <div
      class="flex justify-between items-center bg-zinc-100 rounded-lg py-2 px-3"
    >
      <div class="flex items-center gap-3">
        <div
          class="w-7 h-7 rounded-full bg-zinc-300 flex justify-center items-center"
        >
          <img
            class="w-7 h-7 rounded-full object-cover"
            v-if="selected.photo || selected.picture"
            :src="selected.photo || selected.picture"
            alt=""
          />
          <i v-else class="bi bi-person" />
        </div>
        <div>{{ selected.value || selected?.name }}</div>
      </div>
      <ui-button
        size="sm"
        type="ghost"
        icon="bi bi-x-lg"
        custom-class="btn-circle"
        @click="emits('unselect')"
      />
    </div>
  </div>
  <template v-else>
    <multiselect-search
      @select="handleSelect"
      @search="handleSearch"
      :title="title"
      :options="options"
      :is-loading="isLoading"
    />
    <div v-if="$slots.error" class="label-text-alt text-error">
      <slot name="error" />
    </div>
  </template>
</template>

<script setup lang="ts">
import type { Selected } from "./ui-multiselect.struct";
import multiselectSearch from "./multiselect-search.vue";
import uiButton from "../button/ui-button.vue";

defineProps<{
  options: any[];
  title?: string;
  isLoading: boolean;
  selected?: Selected;
}>();
const emits = defineEmits<{
  (e: "select", value: any): void;
  (e: "search", value: string): void;
  (e: "unselect"): void;
}>();

function handleSelect(value: any) {
  emits("select", value);
}
function handleSearch(value: any) {
  emits("search", value);
}
</script>
