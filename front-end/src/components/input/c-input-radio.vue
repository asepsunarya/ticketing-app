<template>
  <div class="flex items-center mb-4">
    <input
      v-model="modelValue"
      type="radio"
      :name="name"
      :id="label"
      :value="label"
      class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
    />
    <label
      :for="label"
      class="ms-2 text-sm font-medium text-gray-900 capitalize cursor-pointer"
      >{{ label }}</label
    >
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

const emit = defineEmits(["update:modelValue"]);
const props = defineProps<{
  modelValue: string;
  type: string;
  label?: string;
  placeholder?: string;
  customClass?: string;
  hint?: string;
  name: string;
}>();

const modelValue = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});
</script>
