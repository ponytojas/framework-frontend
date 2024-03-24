<script setup>
import { ref } from 'vue';
import { useDataStore } from '../../stores/products';
const productStore = useDataStore();
const { allCategories } = productStore;

const handleImageUpload = (event) => {
  const file = event.target.files[0];
  const reader = new FileReader();
  reader.onload = (e) => {
    product.value.image = e.target.result;
  };
  reader.readAsDataURL(file);
};


const product = ref({
  price: '',
  description: '',
  stock: '',
  categoryId: '',
  image: '',
});
</script>
<template>
  <div class="bg-white p-4 rounded-lg">
    <h2 class="text-2xl font-bold mb-4">Añadir nuevo producto</h2>
    <form action="" class="flex flex-col gap-4">
      <input v-model="product.description" type="text" placeholder="Descripción"
        class="border border-gray-300 p-2 rounded-lg">
      <input type="file" @change="handleImageUpload" accept="image/*" class="border border-gray-300 p-2 rounded-lg">
      <input v-model="product.price" type="text" placeholder="Precio" class="border border-gray-300 p-2 rounded-lg">
      <input v-model="product.stock" type="text" placeholder="Stock" class="border border-gray-300 p-2 rounded-lg">
      <select v-model="product.categoryId" class="border border-gray-300 p-2 rounded-lg">
        <option v-for="category in allCategories" :key="category.id" :value="category.id">{{ category.value }}</option>
      </select>
      <button type="submit" class="bg-green-600 text-white p-2 rounded-lg"
        @click="$emit('product', product)">Añadir</button>
    </form>
  </div>
</template>