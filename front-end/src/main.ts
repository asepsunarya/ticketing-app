import "./assets/main.css";
import "@/firebase";

import { createPinia } from "pinia";
import { createApp } from "vue";

import "@styles/app.css";
import App from "./App.vue";
import router from "./router";
import Vue3Toasity, { type ToastContainerOptions } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

const app = createApp(App).use(Vue3Toasity, {
  autoClose: 3000,
} as ToastContainerOptions);

app.use(createPinia());
app.use(router);

app.mount("#app");
