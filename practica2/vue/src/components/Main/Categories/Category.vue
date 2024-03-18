<script setup>
import { computed } from "vue";
import Button from './Button.vue'
import { useDataStore } from "../../../stores/products";

const dataStore = useDataStore();
const { toggleCategoryEnabled } = dataStore;

const props = defineProps(['category'])

const classes = computed(() => props?.category?.enabled ? 'bg-blue-500 text-white border border-white' : 'border border-blue-400 text-blue-500')

</script>

<template>
  <Button :classes="classes" @click="() => toggleCategoryEnabled(category.id)">
    {{ category.value }}
  </Button>
</template>