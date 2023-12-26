<template>
  <div class="w-full flex flex-col gap-4">
    <c-input
      v-model="form.email"
      name="email"
      type="email"
      label="Email"
      custom-class="btn-medium"
    />
    <c-input
      v-model="form.password"
      name="password"
      type="password"
      label="Password"
      custom-class="btn-medium"
    />
    <ui-button type="dark" text="Buat Akun" />
    <div class="w-full flex justify-center gap-1 text-sm">
      <div class="text-neutral-900">Belum Mempunyai Akun?</div>
      <a
        class="text-zinc-700 select-none cursor-pointer hover:text-primary-700"
        @click="handleRegister"
      >
        Daftar
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import uiButton from "@/components/button/ui-button.vue";
import CInput from "@/components/input/c-input.vue";
import { reactive } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const form = reactive({
  email: "",
  password: "",
});

function handleRegister() {
  router.push("register");
}
</script>
