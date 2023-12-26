<template>
  <div class="mt-6 flex w-full">
    <ui-button
      @click="authGoogle()"
      type="ghost"
      custom-class="w-full bg-white text-center flex gap-x-4 text-center justify-center py-2"
      text="Masuk dengan Google"
    >
      <template #icon>
        <img src="@assets/svgs/google.svg" />
      </template>
    </ui-button>
  </div>
</template>

<script setup lang="ts">
import uiButton from "@/components/button/ui-button.vue";
import { authGoogle } from "../services/auth-google.service";
</script>
