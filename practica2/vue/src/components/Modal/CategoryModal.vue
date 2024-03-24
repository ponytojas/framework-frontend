<script setup>
import { ref } from 'vue';
const category = ref();
</script>

<template>
  <div class="bg-white p-4 rounded-lg">
    <h2 class="text-2xl font-bold mb-4">Añadir nueva categoría</h2>
    <form action="" class="flex flex-col gap-4">
      <input v-model="category" type="text" placeholder="Nombre de la categoría"
        class="border border-gray-300 p-2 rounded-lg">
      <button type="submit" class="bg-green-600 text-white p-2 rounded-lg"
        @click="$emit('category', category)">Añadir</button>
    </form>
  </div>
</template>