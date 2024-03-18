<script setup>
import { computed } from "vue";

const props = defineProps(['classes'])
const variantClasses = computed(() => props.classes || '')
</script>

<template>
  <button class="px-4 py-2 border hover:bg-blue-600 hover:text-white  mx-4 rounded-lg" :class="variantClasses">
    <slot></slot>
  </button>
</template>
