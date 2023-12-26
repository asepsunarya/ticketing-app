<template>
  <div class="relative z-0 w-full mb-5 group">
    <input
      v-model="modelValue"
      :type="type"
      :name="name"
      :id="name"
      :class="[inputClass, customClass]"
      :placeholder="placeholder || ''"
      @keyup.enter="emit('enter')"
      required
    />
    <label :for="name" :class="labelClass">
      {{ label }}
    </label>
    <p v-if="$slots.error" class="mt-2 text-sm text-red-600">
      <slot name="error" />
    </p>
    <label v-if="hint" class="label">
      <span class="label-text-alt !text-xs !font-semibold text-zinc-600">
        {{ hint }}
      </span>
    </label>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

const labelClass =
  "peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6";
const inputClass =
  "block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none    focus:outline-none focus:ring-0 focus:border-blue-600 peer";
const emit = defineEmits(["update:modelValue", "enter"]);
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
