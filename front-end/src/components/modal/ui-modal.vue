<template>
  <input
    type="checkbox"
    :id="props.id"
    class="modal-toggle"
    @change="handleChangeToggleModal"
    v-model="modalToggle"
  />
  <div
    class="modal bg-zinc-700 bg-opacity-80 items-start overflow-scroll pt-10 px-2 scrollbar-none !overflow-y-visible !overflow-x-visible"
    role="dialog"
  >
    <div
      class="modal-box !max-h-full !rounded"
      :class="[
        { 'w-[250px]': size === 'xxs' },
        { 'lg:w-3/12 w-full': size === '2xs' },
        { 'lg:w-2/6 w-full': size === 'xs' },
        { 'lg:w-3/6 w-full': size === 'sm' },
        { 'lg:w-4/6 w-full': size === 'md' },
        { 'lg:w-5/6 w-full': size === 'lg' },
        {
          '!max-h-full lg:!max-h-max !h-full lg:!h-max !rounded-none lg:!rounded-lg':
            size === 'mobile-full',
        },
        {
          '!max-h-full !w-full !h-full !rounded-none': size === 'absolute-full',
        },
        { 'w-auto': size === 'auto' },
      ]"
    >
      <slot />
    </div>
    <label class="modal-backdrop" :for="props.preventClose ? '' : props.id" />
  </div>
</template>

<script setup lang="ts">
import { nextTick, ref } from "vue";

const props = defineProps<{
  id: string;
  preventClose?: boolean;
  withHeader?: boolean;
  size?: string;
  customClass?: string;
}>();

const modalToggle = ref(false);

const emits = defineEmits<{
  (e: "close"): void;
  (e: "open"): void;
}>();

async function handleChangeToggleModal() {
  await nextTick();
  if (modalToggle.value) emits("open");
  else emits("close");
}
</script>
