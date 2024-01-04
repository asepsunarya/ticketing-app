<template>
  <div>
    <div class="text-xl mb-4 font-semibold">Rekan Tim</div>
    <div class="flex gap-x-4">
      <div
        class="rounded border shadow-sm py-8 px-4 flex flex-col items-center gap-y-3 w-52"
      >
        <img
          src="https://avatar.oxro.io/avatar.svg?name=Eddie"
          alt=""
          class="rounded-full h-20 w-20"
        />
        <div class="text-lg">Rekan Tim</div>
        <ui-button
          size="sm"
          type="light"
          text="Tambah Tim"
          for="add-people-modal"
        />
      </div>
      <div
        v-for="person in people"
        :key="person._id"
        class="rounded border shadow-sm py-8 px-4 flex flex-col items-center gap-y-3 w-52"
      >
        <img
          :src="`https://avatar.oxro.io/avatar.svg?name=${person.name}`"
          alt=""
          class="rounded-full h-20 w-20"
        />
        <div class="text-lg text-center">{{ person.name }}</div>
        <div class="text-zinc-500 text-center">{{ person.role }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import uiButton from "@/components/button/ui-button.vue";
import type { User } from "@/views/user/services/user.struct";

defineProps<{
  people: User[];
}>();
</script>
