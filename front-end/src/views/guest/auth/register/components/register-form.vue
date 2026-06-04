<template>
  <div class="w-full flex flex-col gap-4">
    <c-input
      v-model="form.name"
      type="text"
      label="Nama"
      custom-class="btn-medium"
      name="name"
    />
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
      type="password"
      label="Konfirmasi Password"
      custom-class="btn-medium"
      name="passwordConfirm"
    />
    <ui-button :is-loading="isLoading" text="Buat Akun" type="dark" @click="handleRegister" />
    <div class="w-full flex justify-center gap-1 text-sm">
      <div class="text-neutral-900">Sudah mempunyai akun?</div>
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
import uiButton from "@components/button/ui-button.vue";
import CInput from "@components/input/c-input.vue";
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { toast } from "vue3-toastify";
import { registerService } from "../services/register.service";

const router = useRouter();
const isLoading = ref(false);

const form = reactive({
  name: "",
  email: "",
  password: "",
  passwordConfirm: "",
});

async function handleRegister() {
  if (!form.name || !form.email || !form.password) {
    toast("Nama, email, dan password harus diisi", { type: "error" });
    return;
  }
  if (form.password !== form.passwordConfirm) {
    toast("Konfirmasi password tidak sesuai", { type: "error" });
    return;
  }

  try {
    isLoading.value = true;
    await registerService({
      name: form.name,
      email: form.email,
      password: form.password,
      role: "customer",
    });
    toast("Berhasil membuat akun, silakan login", { type: "success" });
    router.push("login");
  } catch (error) {
    console.log(error);
    toast("Gagal membuat akun", { type: "error" });
  } finally {
    isLoading.value = false;
  }
}

function handleLogin() {
  router.push("login");
}
</script>
