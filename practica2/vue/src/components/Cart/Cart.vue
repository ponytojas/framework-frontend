<script setup>
import { Icon } from '@iconify/vue';
import { storeToRefs } from 'pinia';
import { useCartStore } from '../../stores/cart';

const cartStore = useCartStore();
const { removeItem } = cartStore;
const { items, total } = storeToRefs(cartStore);

</script>

<template>
  <div class="flex flex-row min-h-96 bg-gray-100 w-11/12 rounded-lg sticky top-0">
    <div class="flex flex-col w-full">
      <div class="flex flex-col pt-7 pl-7 justify-center content-center align-middle">
        <div class="flex flex-row justify-center w-full">
          <div class="flex flex-col">
            <Icon icon="ic:outline-shopping-bag" class="pb-1" width="42" height="42" />
          </div>
          <div class="flex flex-col">
            <p class="text-4xl ml-2 font-light">Carrito</p>
          </div>
        </div>
        <div v-if="items.length > 0">
          <div class="flex flex-row w-full justify-evenly my-4">
            <p class="text-2xl font-semibold">TOTAL: {{ total }}€</p>
            <button class="bg-green-700 px-4 py-2 rounded-lg text-white" @click="$emit('open-modal', 'order')">Realizar
              el
              pedido</button>
          </div>
          <div class="flex flex-col">
            <div class="flex flex-row w-full items-center justify-between my-3 pr-3 pb-4" v-for="(product) in items"
              :key="product.id">
              <div class="flex flex-row">
                <img :src="product.image" class="w-12 h-12 mr-5" />
                <div class="flex flex-col">
                  <div class="flex flex-row">
                    {{ product.description }}
                  </div>
                  <div class="flex flex-row">
                    Cantidad: {{ product.quantity }}. Total: {{ product.price * product.quantity }}€
                  </div>
                </div>
              </div>
              <button class="border border-red-500 px-2 py-1 rounded-lg text-red-500 hover:bg-red-500 hover:text-white"
                @click="removeItem(product.id)">
                Eliminar de la cesta
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>