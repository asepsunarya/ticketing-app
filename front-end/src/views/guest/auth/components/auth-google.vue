<template>
  <div class="mt-6 flex w-full">
    <c-button
      @click="authGoogle()"
      type="light"
      custom-class="w-full bg-white text-center flex gap-x-4 text-center justify-center py-2"
      text="Masuk dengan Google"
    >
      <template #icon>
        <img src="@assets/svgs/google.svg" />
      </template>
    </c-button>
  </div>
</template>

<script setup lang="ts">
import cButton from "@/components/button/c-button.vue";
import { authGoogle } from "../services/auth-google.service";
</script>
