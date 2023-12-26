<template>
  <div class="form-control">
    <label class="label" v-if="props.label">{{ props.label }}</label>
    <input
      v-model="modelValue"
      :type="type"
      :name="name"
      :id="id"
      :placeholder="placeholder || ''"
      @input="emits('input')"
      @keyup.enter="emits('enter')"
      class="input input-bordered !outline-none border-zinc-300 focus:border-zinc-400"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

const emits = defineEmits<{
  (e: "update:modelValue", value: string): void;
  (e: "enter"): void;
  (e: "input"): void;
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
}>();

const modelValue = computed({
  get: () => props.modelValue,
  set: (value) => emits("update:modelValue", value),
});
</script>
