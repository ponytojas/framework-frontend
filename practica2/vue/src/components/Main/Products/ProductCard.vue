<script setup>
import { ref, computed } from 'vue';
import { toast } from 'vue-sonner';
import { useCartStore } from '../../../stores/cart';

const props = defineProps(['product']);

const cartStore = useCartStore();
const { addItem } = cartStore;

const handleAddToCart = () => {
  const success = addItem(props.product);
  if (!success) {
    toast.error('No hay stock disponible');
  }
};

const isOutOfStock = computed(() => {
  return props.product.stock === 0;
});
</script>

<template>
  <div class="flex flex-row w-10/12 h-48">
    <div class="w-1/4 h-full rounded-l-md flex justify-center items-center">
      <div class="relative">
        <img :src="product.image" :alt="product.description"
          class="max-w-full max-h-full cursor-zoom-in object-contain transition duration-500 ease-in-out transform hover:scale-150 hover:z-10"
          :class="{ 'grayscale opacity-50': isOutOfStock }">
      </div>
    </div>
    <div class="flex flex-col w-full p-2">
      <p class="text-xl">{{ product.description }}</p>
      <p class="mt-4 text-sm">Producto: {{ product.id }}</p>
      <p class="mt-4 font-light">Stock disponible: {{ product.stock }}</p>
      <p class="mt-4 font-light">Precio: {{ product.price }}€</p>
    </div>
    <button class="text-teal-500" @click="handleAddToCart">
      Agregar a la cesta
    </button>
  </div>
</template>