<template>
  <div class="w-full flex flex-col gap-4">
    <c-input
      v-model="form.email"
      name="email"
      type="email"
      label="Email"
      custom-class="btn-medium"
    >
      <template v-if="v$.$error && v$.email.$invalid" #error>
        Email harus valid
      </template>
    </c-input>
    <c-input
      v-model="form.password"
      name="password"
      type="password"
      label="Password"
      custom-class="btn-medium"
    >
      <template v-if="v$.$error && v$.password.$invalid" #error>
        Password harus diisi
      </template>
    </c-input>
    <ui-button
      :is-loading="isLoading"
      type="dark"
      text="Masuk"
      @click="handleLogin"
    />
    <div class="w-full flex justify-center gap-1 text-sm">
      <div class="text-neutral-900">Belum mempunyai akun?</div>
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
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import useVuelidate from "@vuelidate/core";
import { email, minLength, required } from "@vuelidate/validators";
import { loginService } from "../services/login.service";
import { toast } from "vue3-toastify";

const router = useRouter();
const isLoading = ref(false);
const form = reactive({
  email: "",
  password: "",
});

const rules = {
  email: { required, email },
  password: { required, minLength: minLength(6) },
};
const v$ = useVuelidate(rules, form);

async function handleLogin() {
  const isValidated = await v$.value.$validate();
  if (!isValidated) return;

  try {
    isLoading.value = true;
    await loginService(form);
    location.href = "/customer/tickets";
  } catch (error) {
    console.log(error);
    toast("Gagal masuk", { type: "error" });
  } finally {
    isLoading.value = false;
  }
}

function handleRegister() {
  router.push("register");
}
</script>
