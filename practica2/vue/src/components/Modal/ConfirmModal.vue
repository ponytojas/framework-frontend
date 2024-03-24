<script setup></script>
<template>
  <div class="flex flex-col w-full h-auto">
    <div class="flex flex-row mt-4">
      <p class="text-2xl font-thin">¿Estás seguro de que quieres realizar el pedido?</p>
    </div>
    <div class="flex flex-row justify-evenly mt-10">
      <button class="rounded-md px-2 py-2 border border-red-400 text-red-400 hover:bg-red-500 hover:text-white"
        @click="$emit('cancel')">
        Cancelar
      </button>
      <button class="rounded-md px-2 py-2 bg-green-600 text-white hover:bg-green-800"
        @click="$emit('confirm')">Confirmar</button>
    </div>
  </div>
</template>