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
import { onMounted, reactive, ref, watch } from "vue";
import { getMembers } from "@/views/admin/projects/project-members/services/project-members.service";
import { updateTickets } from "@/views/admin/tickets/services/tickets.service";
import { useProjectMemberStore } from "@/stores/project-member";
import type { ProjectMember } from "@/views/admin/projects/project-members/services/project-members.struct";
import type { User } from "@/views/user/services/user.struct";
import { useProjectStore } from "@/stores/project";

const timeOut = ref<number>(0);
const isLoading = ref<boolean>(false);

const projectStore = useProjectStore();
const projectMemberStore = useProjectMemberStore();

const props = defineProps<{
  id: string;
  selected?: User;
}>();

const emits = defineEmits<{
  (e: "update:selected", id: string, member?: ProjectMember): void;
}>();

const filter = reactive({
  page: 1,
  limit: 5,
  search: "",
  projectId: "",
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
    filter.projectId = String(projectStore.selected?._id);
    const member = await getMembers(filter);
    projectMemberStore.member = member;
  } catch (error) {
    console.log("error : ", error);
  } finally {
    isLoading.value = false;
  }
}

async function handleUpdateAssignee(member?: ProjectMember): Promise<void> {
  try {
    const assignedBy = {};
    if (member) {
      Object.assign(assignedBy, {
        _id: String(member?.userId),
        name: member?.name,
        email: member?.email,
        photo: member?.photo,
      });
    }
    const newTickets = { assignedBy };
    await updateTickets(props.id, newTickets);
  } catch (error) {
    console.log("error : ", error);
  } finally {
    //
  }
}

function handleSelectMember(member: ProjectMember): void {
  handleUpdateAssignee(member);
  emits("update:selected", props.id, member);
}

function handleUnselectMember(): void {
  handleUpdateAssignee();
  emits("update:selected", props.id);
}

watch(
  () => projectStore.selected,
  async () => {
    await handleGetMembers();
  }
);

onMounted(async () => {
  if (projectStore.selected?._id) {
    await handleGetMembers();
  }
});
</script>
