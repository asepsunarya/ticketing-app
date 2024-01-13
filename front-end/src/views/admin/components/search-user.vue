<template>
  <ui-multiselect
    @search="handleSearchUsers"
    @select="handleSelectUser"
    @unselect="handleUnselectUser"
    :options="userStore.user.docs"
    :title="title ?? 'User'"
    :is-loading="isLoading"
    :selected="userStore.selected"
  >
    <template v-if="$slots.error" #error>
      <slot name="error" />
    </template>
  </ui-multiselect>
</template>

<script setup lang="ts">
import uiMultiselect from "@/components/multiselect/ui-multiselect.vue";
import { onMounted, reactive, ref } from "vue";
import type { User } from "@/views/user/services/user.struct";
import { getUsers } from "@/views/admin/services/users.service";
import { useUserStore } from "@/stores/user";

const timeOut = ref<number>(0);
const isLoading = ref<boolean>(false);

const userStore = useUserStore();

const props = defineProps<{
  title?: string;
  includeSelf?: boolean;
}>();

const filter = reactive({
  page: 1,
  limit: 5,
  search: "",
  includeSelf: props.includeSelf,
});

function handleSearchUsers(search: string): void {
  filter.search = search;
  clearTimeout(timeOut.value);
  setTimeout(() => {
    handleGetUsers();
  }, 500);
}

async function handleGetUsers(): Promise<void> {
  try {
    isLoading.value = true;
    const users = await getUsers(filter);
    userStore.user = users;
  } catch (error) {
    console.log("error : ", error);
  } finally {
    isLoading.value = false;
  }
}

function handleSelectUser(user: User): void {
  userStore.selected = user;
}

function handleUnselectUser(): void {
  userStore.clearSelected();
}

onMounted(async () => {
  handleUnselectUser();
  await handleGetUsers();
});
</script>
