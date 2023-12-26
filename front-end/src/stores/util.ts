import { defineStore } from "pinia";
import { ref } from "vue";

export const useUtilStore = defineStore("util", () => {
  const withSidebar = ref(false);

  return { withSidebar };
});
