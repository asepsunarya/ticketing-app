<template>
  <div class="w-full flex flex-col">
    <c-input
      name="email"
      v-model="form.email"
      type="email"
      label="Email"
      custom-class="btn-medium"
    >
      <template v-if="v$.email.$invalid" #error>
        {{ v$.email.$errors[0]?.$message }}
      </template></c-input
    >
    <c-input
      name="password"
      v-model="form.password"
      type="password"
      label="Password"
      custom-class="btn-medium"
    >
      <template v-if="v$.password.$invalid" #error>
        {{ v$.password.$errors[0]?.$message }}
      </template>
    </c-input>
    <ui-button
      :is-loading="isLoading"
      @click="loginAdmin()"
      type="dark"
      text="Masuk"
    />
  </div>
</template>

<script setup lang="ts">
import uiButton from "@/components/button/ui-button.vue";
import CInput from "@/components/input/c-input.vue";
import { reactive, ref } from "vue";
import { loginAdminService } from "@/views/guest/auth-admin/login/services/login-admin.service";
import useVuelidate from "@vuelidate/core";
import { email, minLength, required } from "@vuelidate/validators";

const form = reactive({
  email: "",
  password: "",
});

const rules = {
  email: { required, email },
  password: { required, minLength: minLength(6) },
};
const v$ = useVuelidate(rules, form);

const isLoading = ref(false);

async function loginAdmin() {
  const isValidated = await v$.value.$validate();
  if (!isValidated) return;

  isLoading.value = true;
  await loginAdminService({ email: form.email, password: form.password });
  location.href = "/admin";
  isLoading.value = false;
}
</script>
