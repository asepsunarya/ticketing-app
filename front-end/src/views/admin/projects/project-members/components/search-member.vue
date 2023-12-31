<template>
  <div class="relative group">
    <ui-input
      v-model="filter.search"
      type="text"
      placeholder="Masukan nama atau email"
      :label="label || 'Nama atau Email'"
      @input="handleSearchUsers"
    />
    <div
      class="absolute w-full group-focus-within:block group-active:block hidden"
    >
      <div
        class="flex flex-col divide-y bg-white drop-shadow-lg mt-2 rounded-lg max-h-40 overflow-auto"
      >
        <template v-if="isLoadingSearchUsers">
          <div class="flex justify-center p-3">
            <span class="loading loading-spinner text-zinc-400" />
          </div>
        </template>
        <template v-else-if="suggestedUsers.length">
          <div
            v-for="user in suggestedUsers"
            :key="user.email"
            class="p-3 cursor-pointer hover:bg-zinc-100 flex items-center gap-3"
            @click="handleSelectUser(user)"
          >
            <div
              class="w-7 h-7 rounded-full bg-zinc-300 flex justify-center items-center"
            >
              <i class="bi bi-person" />
            </div>
            <div>
              {{ user.name }}
            </div>
          </div>
        </template>
        <template v-else>
          <div class="p-3 text-center">User Tidak Ditemukan.</div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import uiInput from "@/components/input/ui-input.vue";
import { onMounted, reactive, ref } from "vue";
import type { User } from "@/views/user/services/user.struct";
import { getUsers } from "@/views/admin/services/users.service";

const timeOut = ref<number>(0);
const suggestedUsers = ref<User[]>([]);
const isLoadingSearchUsers = ref<boolean>(false);

const props = defineProps<{
  includeSelf?: boolean;
  label?: string;
}>();
const emits = defineEmits<{
  (e: "select", user: User): void;
}>();

const filter = reactive({
  page: 1,
  limit: 5,
  search: "",
  includeSelf: props.includeSelf,
});

function handleSearchUsers(): void {
  clearTimeout(timeOut.value);
  timeOut.value = setTimeout(() => {
    searchUsers();
  }, 500);
}

async function searchUsers(): Promise<void> {
  try {
    isLoadingSearchUsers.value = true;
    const users = await getUsers(filter);
    suggestedUsers.value = users.docs;
  } catch (error) {
    console.log("error : ", error);
  } finally {
    isLoadingSearchUsers.value = false;
  }
}

function handleSelectUser(user: User): void {
  emits("select", user);
}

onMounted(async () => {
  await searchUsers();
});
</script>
