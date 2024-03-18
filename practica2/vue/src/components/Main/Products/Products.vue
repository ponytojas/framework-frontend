<script setup>
import { storeToRefs } from 'pinia';
import { useDataStore } from '../../../stores/products';
import ProductCard from './ProductCard.vue';

const dataStore = useDataStore();
const { filteredProducts } = storeToRefs(dataStore);
console.debug(filteredProducts);
</script>

<template>
  <div class="flex flex-col w-full justify-center align-middle items-center content-center flex-wrap">
    <div class="flex flex-col w-full items-center" v-for="(product, index) in filteredProducts" :key="product.id">
      <ProductCard :product="product" />
      <hr v-if="index < filteredProducts.length - 1" class="w-10/12 my-4">
    </div>
  </div>
</template>