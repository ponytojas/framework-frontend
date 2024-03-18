<script setup>
import { Icon } from '@iconify/vue';
</script>

<template>
  <div class="flex min-h-96 h-3/6 bg-gray-100 w-11/12 rounded-lg sticky top-0">
    <div class="flex flex-row pt-7 pl-7 justify-center content-center align-middle">
      <div class="flex flex-col">
        <Icon icon="ic:outline-shopping-bag" class="pb-1" width="42" height="42" />
      </div>
      <div class="flex flex-col">
        <p class="text-4xl ml-2 font-light">Carrito</p>
      </div>
    </div>
  </div>
</template>