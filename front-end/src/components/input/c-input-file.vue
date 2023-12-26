<template>
  <div>
    <label
      for="dropzone-file"
      :class="customClass"
      class="w-32 flex flex-col rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
    >
      <c-button text="Add File" type="outline-default" icon="bi-upload mr-1" />
      <input id="dropzone-file" type="file" class="hidden" />
    </label>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import cButton from "../button/c-button.vue";

const emit = defineEmits(["update:modelValue", "enter"]);
const props = defineProps<{
  modelValue: string;
  name: string;
  label?: string;
  placeholder?: string;
  customClass?: string;
  hint?: string;
}>();

const modelValue = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});
</script>
