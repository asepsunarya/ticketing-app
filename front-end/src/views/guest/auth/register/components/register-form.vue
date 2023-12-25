<template>
  <div class="w-full flex flex-col gap-4">
    <c-input
      v-model="form.email"
      type="email"
      label="Email"
      custom-class="btn-medium"
      name="email"
    />
    <c-input
      v-model="form.password"
      type="password"
      label="Password"
      custom-class="btn-medium"
      name="password"
    />
    <c-input
      v-model="form.passwordConfirm"
      type="passwordConfirm"
      label="Konfirmasi Password"
      custom-class="btn-medium"
      name="passwordConfirm"
    />
    <c-button
      text="Buat Akun"
      custom-class="bg-zinc-800 text-white"
      type="dark"
    />
    <div class="w-full flex justify-center gap-1 text-sm">
      <div class="text-neutral-900">Sudah Mempunyai Akun?</div>
      <a
        class="text-zinc-700 select-none cursor-pointer hover:text-primary-700"
        @click="handleLogin"
      >
        Login
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import CButton from "@components/button/c-button.vue";
import CInput from "@components/input/c-input.vue";
import { reactive } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const form = reactive({
  email: "",
  password: "",
  passwordConfirm: "",
});

function handleLogin() {
  router.push("login");
}
</script>
