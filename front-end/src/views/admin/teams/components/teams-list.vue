<template>
  <div>
    <div class="text-xl mb-4 font-semibold">Tim</div>
    <div class="flex gap-x-4">
      <div class="rounded border shadow-sm gap-y-3 w-48">
        <div
          class="rounded-t bg-zinc-200 flex items-center justify-center p-6 h-28"
        >
          <img
            v-for="index in 3"
            :key="index"
            src="https://avatar.oxro.io/avatar.svg?name=Eddie"
            alt=""
            class="rounded-full h-14 w-14 -mr-3 -ml-3 border-2 border-white"
          />
        </div>
        <div class="flex flex-col gap-y-4 items-center py-6 px-8">
          <div class="text-lg">Tim barumu!</div>
          <ui-button
            size="sm"
            type="light"
            text="Buat Tim"
            for="add-team-modal"
          />
        </div>
      </div>
      <div
        class="rounded border shadow-sm gap-y-3 w-48"
        v-for="team in teams"
        :key="team._id"
      >
        <div
          class="rounded-t bg-primary bg-opacity-20 flex items-center justify-center p-6 h-28"
        ></div>
        <div class="flex flex-col gap-y-4 items-center py-6 px-8">
          <div class="text-lg">{{ team.name }}</div>
          <div class="flex w-full justify-center">
            <img
              v-for="index in 3"
              :key="index"
              src="https://avatar.oxro.io/avatar.svg?name=Eddie"
              alt=""
              class="rounded-full h-8 w-8 -mr-2 -ml-2 border-2 border-white"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import uiButton from "@/components/button/ui-button.vue";
import type { Team } from "../services/teams.struct";

defineProps<{ teams: Team[] }>();
</script>
