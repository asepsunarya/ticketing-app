<template>
  <ui-multiselect
    @search="handleSearchProjects"
    @select="handleSelectProject"
    @unselect="handleUnselectProject"
    :options="projectStore.project.docs"
    :title="title ?? 'Project'"
    :is-loading="isLoading"
    :selected="projectStore.selectedOption"
  >
    <template v-if="$slots.error" #error>
      <slot name="error" />
    </template>
  </ui-multiselect>
</template>

<script setup lang="ts">
import uiMultiselect from "@/components/multiselect/ui-multiselect.vue";
import { onMounted, reactive, ref } from "vue";
import { getProjects } from "../projects/services/projects.service";
import { useProjectStore } from "@/stores/project";
import type { Project } from "../projects/services/projects.struct";

const timeOut = ref<number>(0);
const isLoading = ref<boolean>(false);

const projectStore = useProjectStore();

defineProps<{
  title?: string;
}>();

const filter = reactive({
  page: 1,
  limit: 5,
  search: "",
});

function handleSearchProjects(search: string): void {
  filter.search = search;
  clearTimeout(timeOut.value);
  timeOut.value = setTimeout(() => {
    handleGetProjects();
  }, 500);
}

async function handleGetProjects(): Promise<void> {
  try {
    isLoading.value = true;
    const project = await getProjects(filter);
    projectStore.project = project;
  } catch (error) {
    console.log("error : ", error);
  } finally {
    isLoading.value = false;
  }
}

function handleSelectProject(project: Project): void {
  projectStore.selectedOption = project;
}

function handleUnselectProject(): void {
  projectStore.clearSelected();
}

onMounted(async () => {
  handleUnselectProject();
  await handleGetProjects();
});
</script>
