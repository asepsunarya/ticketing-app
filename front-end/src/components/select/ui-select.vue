<template>
  <div class="form-control">
    <label class="label" v-if="props.label">{{ props.label }}</label>
    <select
      v-model="modelValue"
      :name="name"
      :id="name"
      class="select select-bordered w-full !outline-none border-zinc-300 focus:border-zinc-400"
      @change="handleChange"
    >
      <slot />
    </select>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick } from "vue";

const emits = defineEmits<{
  (e: "update:modelValue", value: string): void;
  (e: "change", value: string): void;
}>();

const props = defineProps<{
  modelValue: string;
  label?: string;
  customClass?: string;
  name?: string;
}>();

const modelValue = computed({
  get: () => props.modelValue,
  set: (value) => emits("update:modelValue", value),
});

async function handleChange() {
  await nextTick();
  emits("change", modelValue.value);
}
</script>
