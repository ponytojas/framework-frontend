<script setup></script>
<template>
  <div class="flex flex-row justify-evenly">
    <button
      class="px-2 py-2 border border-green-600 rounded-lg text-green-800 hover:bg-green-600 hover:text-white cursor-pointer"
      @click="$emit('open-modal', 'category')">
      Añadir nueva categoría
    </button>
    <button
      class="px-2 py-2 border border-green-600 rounded-lg text-green-800 hover:bg-green-600 hover:text-white cursor-pointer"
      @click="$emit('open-modal', 'product')">
      Añadir nuevo producto
    </button>
  </div>
</template>