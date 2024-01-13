<template>
  <ui-multiselect
    @search="handleSearchMembers"
    @select="handleSelectMember"
    @unselect="handleUnselectMember"
    :options="projectMemberStore.member.docs"
    :id="id"
    :is-loading="isLoading"
    :selected="selected"
  >
    <template v-if="$slots.error" #error>
      <slot name="error" />
    </template>
  </ui-multiselect>
</template>

<script setup lang="ts">
import uiMultiselect from "@/components/multiselect/ui-multiselect.vue";
import { onMounted, reactive, ref } from "vue";
import { getMembers } from "@/views/admin/projects/project-members/services/project-members.service";
import { useProjectMemberStore } from "@/stores/project-member";
import type { ProjectMember } from "@/views/admin/projects/project-members/services/project-members.struct";
import type { User } from "@/views/user/services/user.struct";

const timeOut = ref<number>(0);
const isLoading = ref<boolean>(false);

const projectMemberStore = useProjectMemberStore();

defineProps<{
  id: string;
  selected?: User;
}>();

const filter = reactive({
  page: 1,
  limit: 5,
  search: "",
});

function handleSearchMembers(search: string): void {
  filter.search = search;
  clearTimeout(timeOut.value);
  setTimeout(() => {
    handleGetMembers();
  }, 500);
}

async function handleGetMembers(): Promise<void> {
  try {
    isLoading.value = true;
    const member = await getMembers(filter);
    projectMemberStore.member = member;
  } catch (error) {
    console.log("error : ", error);
  } finally {
    isLoading.value = false;
  }
}

function handleSelectMember(member: ProjectMember): void {
  projectMemberStore.selected = member;
}

function handleUnselectMember(): void {
  projectMemberStore.clearSelected();
}

onMounted(async () => {
  handleUnselectMember();
  await handleGetMembers();
});
</script>
