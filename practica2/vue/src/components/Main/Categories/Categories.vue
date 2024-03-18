<script setup>
import { useDataStore } from '../../../stores/products';
import Category from './Category.vue';

const dataStore = useDataStore();
const { allCategories } = dataStore;

</script>

<template>
  <div class="flex flex-row w-full justify-center content-center">
    <div v-for="category in allCategories">
      <Category :category="category" />
    </div>

  </div>
</template>