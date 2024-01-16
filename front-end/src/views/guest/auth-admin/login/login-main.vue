<template>
  <div class="w-screen h-screen flex">
    <div class="w-1/2 h-full bg-white">
      <header-layout />
      <auth-card title="Selamat Datang">
        <div class="text-sm-medium my-4">
          Masukan email dan password untuk masuk ke aplikasi
        </div>
        <login-form />
      </auth-card>
    </div>
    <div class="w-1/2 bg-zinc-200">
      <img
        class="w-full h-full"
        src="https://img.freepik.com/free-vector/call-center-helpdesk-concept-with-support-symbols-isometric-vector-illustration_1284-69102.jpg?w=2000"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import headerLayout from "../../auth/layouts/header-layout.vue";
import loginForm from "./components/login-form.vue";
import authCard from "../../auth/components/auth-card.vue";
</script>
