import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
      "@views": resolve(__dirname, "src/views"),
      "@assets": resolve(__dirname, "src/assets"),
      "@components": resolve(__dirname, "src/components"),
      "@router": resolve(__dirname, "src/router"),
      "@services": resolve(__dirname, "src/services"),
      "@styles": resolve(__dirname, "src/styles"),
    },
  },
});
