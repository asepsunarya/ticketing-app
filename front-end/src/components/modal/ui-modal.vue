<template>
  <input
    type="checkbox"
    :id="props.id"
    class="modal-toggle"
    @change="handleChangeToggleModal"
    v-model="modalToggle"
  />
  <div
    class="modal bg-zinc-700 bg-opacity-80 items-start overflow-scroll pt-10 scrollbar-none !overflow-y-visible !overflow-x-visible"
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
        { 'lg:w-7/12 !max-h-[740px] max-w-5xl !p-0': size === 'xl' },
        {
          '!max-h-full lg:!max-h-max !h-full lg:!h-max !rounded-none lg:!rounded-lg':
            size === 'mobile-full',
        },
        {
          '!max-h-full !w-full !h-full !rounded-none': size === 'absolute-full',
        },
        { 'w-auto': size === 'auto' },
        { 'mb-8': $slots.action },
      ]"
    >
      <div
        v-if="withHeader"
        class="z-[100] sticky top-0 bg-white h-[60px] flex justify-between items-center shadow px-4"
      >
        <div class="font-semibold text-lg capitalize">
          {{ title }}
        </div>
      </div>
      <div :class="{ 'px-5 py-2': withHeader || $slots.action }">
        <slot />
      </div>

      <div
        v-if="$slots.action"
        class="sticky bottom-0 h-[60px] border-t px-5 flex items-center gap-x-2 justify-end bg-white !z-[100] !rounded"
      >
        <slot name="action" />
      </div>
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
  title?: string;
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
