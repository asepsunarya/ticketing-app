<template>
  <div class="form-control">
    <label class="label" v-if="props.label">{{ props.label }}</label>
    <input
      v-model="modelValue"
      :type="type"
      :name="name"
      :id="id"
      :multiple="multiple || false"
      :placeholder="placeholder || ''"
      @input="emits('input')"
      @change="handleChange"
      @keyup.enter="emits('enter')"
      class="input input-bordered !outline-none border-zinc-300 focus:border-zinc-400"
      :class="customClass || ''"
    />

    <label v-if="$slots.error" class="label">
      <div class="label-text-alt text-error">
        <slot name="error" />
      </div>
    </label>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

const emits = defineEmits<{
  (e: "update:modelValue", value: string): void;
  (e: "enter"): void;
  (e: "input"): void;
  (e: "change", value: any): void;
}>();

const props = defineProps<{
  modelValue: string;
  type: string;
  label?: string;
  placeholder?: string;
  customClass?: string;
  hint?: string;
  name?: string;
  id?: string;
  multiple?: boolean;
}>();

const modelValue = computed({
  get: () => props.modelValue,
  set: (value) => emits("update:modelValue", value),
});

function handleChange(e: any) {
  emits("change", e.target.files);
}
</script>
