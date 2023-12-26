<template>
  <div class="text-2xl font-bold">Tambah Bugs</div>
  <div class="text-zinc-400 mb-4">
    Silahkan tambah bugs baru agar programmer kerja
  </div>
  <c-card class="flex flex-col gap-4">
    <div>
      <div class="font-semibold mb-2">Produk</div>
      <div class="flex gap-x-4">
        <c-input-radio
          v-for="(product, index) in products"
          :key="index"
          :label="product"
          type="radio"
          name="product"
          v-model="form.product"
        ></c-input-radio>
      </div>
    </div>
    <div>
      <div class="font-semibold">Penjelasan</div>
      <div class="text-zinc-500 text-sm mb-2">
        Jelaskan dengan singkat padat dan jelas masalah yang terjadi
      </div>
      <c-input
        v-model="form.text"
        label=""
        placeholder="Penjelasan"
        type="input"
        name="text"
        custom-class="lg:w-2/4"
      >
      </c-input>
    </div>
    <div>
      <div class="font-semibold">Email</div>
      <div class="text-zinc-500 text-sm mb-2">
        Email yang digunakan untuk login ke aplikasi manypage atau manychat
      </div>
      <c-input
        v-model="form.email"
        label=""
        placeholder="Email"
        type="email"
        name="email"
        custom-class="lg:w-2/4"
      >
      </c-input>
    </div>
    <div>
      <div class="font-semibold">Screenshot</div>
      <div class="text-zinc-500 text-sm mb-4">
        Sertakan tangkapan layar berupa gambar atau video untuk mempermudah
        penyelesaian masalah
      </div>
      <c-input-file name="screenshot" v-model="form.screenshot" label="" />
    </div>
    <div>
      <div class="font-semibold">Tingkat Urgensi</div>
      <div class="text-zinc-500 text-sm mb-4">
        Level urgensi dari yang tertinggi 5 sampai yg terendah 1
      </div>
      <div class="flex gap-x-4">
        <c-input-radio
          v-for="(urgency, index) in urgencyLevels"
          :key="index"
          :label="urgency"
          type="radio"
          name="product"
          v-model="form.urgency"
        ></c-input-radio>
      </div>
    </div>
    <div>
      <div class="font-semibold mb-4">Pelapor</div>
      <div class="flex gap-x-4">
        <c-input-radio
          v-for="(reporter, index) in reporters"
          :key="index"
          :label="reporter"
          type="radio"
          name="product"
          v-model="form.reporter"
        ></c-input-radio>
      </div>
    </div>
    <div>
      <div class="font-semibold">Status Rilis Fitur</div>
      <div class="text-zinc-500 text-sm mb-4">
        Masalah ditemukan di fitur yang baru saja rilis atau yang sudah lama
        rilis
      </div>
      <div class="flex gap-x-4">
        <c-input-radio
          v-for="(urgency, index) in releaseStatuses"
          :key="index"
          :label="urgency"
          type="radio"
          name="product"
          v-model="form.urgency"
        ></c-input-radio>
      </div>
    </div>
    <div class="w-28">
      <ui-button text="Simpan" type="default" />
    </div>
  </c-card>
</template>

<script setup lang="ts">
import cCard from "@/components/card/c-card.vue";
import cInput from "@/components/input/c-input.vue";
import cInputRadio from "@/components/input/c-input-radio.vue";
import { reactive } from "vue";
import CInputFile from "@/components/input/c-input-file.vue";
import uiButton from "@/components/button/ui-button.vue";

const form = reactive({
  product: "",
  text: "",
  email: "",
  screenshot: "",
  urgency: "",
  reporter: "",
});

const products = ["manypage", "manychat"];
const urgencyLevels = ["5", "4", "3", "2", "1"];
const reporters = ["user", "admin", "product owner", "developer"];
const releaseStatuses = ["baru", "lama"];
</script>
