import "./assets/main.css";
import "@/firebase";

import { createPinia } from "pinia";
import { createApp } from "vue";

import "@styles/app.css";
import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount("#app");
