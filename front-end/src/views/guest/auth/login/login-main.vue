<template>
  <div class="w-screen h-screen flex">
    <div class="w-1/2 h-full bg-white">
      <header-layout />
      <login-card title="Selamat Datang">
        <div class="text-sm-medium my-4">
          Masuk sebagai customer untuk membuat dan memantau tiket.
        </div>
        <login-form />
      </login-card>
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
import loginCard from "../components/auth-card.vue";
import HeaderLayout from "../layouts/header-layout.vue";
import LoginForm from "./components/login-form.vue";
</script>
