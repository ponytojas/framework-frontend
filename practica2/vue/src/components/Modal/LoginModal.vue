<script setup>
import { Icon } from '@iconify/vue';
import { ref } from 'vue';

const user = ref('');
const password = ref('');

</script>
<template>
  <form class="mt-4">
    <div class="flex flex-col my-2">
      <div class="flex flex-row items-center">
        <Icon icon="mdi:user-key" class="mr-4 text-black h-6 w-6 mb-1 ml-1" />
        <label for="user">Usuario</label>
      </div>
      <input type="text" name="user" id="user" v-model="user"
        class="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
    </div>
    <div class="flex flex-col my-2">
      <div class="flex flex-row items-center">
        <Icon icon="material-symbols:password-rounded" class="mr-4 text-black h-6 w-6 mb-1 ml-1" />
        <label for="password">Contraseña</label>
      </div>
      <input type="password" name="password" id="password" v-model="password"
        class="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">

    </div>
    <div class="flex flex-row justify-between mt-5">
      <button class="bg-green-700 px-4 py-2 rounded-lg text-white"
        @click="$emit('logged', { user, password })">Enviar</button>
      <button class="bg-red-700 px-4 py-2 rounded-lg text-white" @click="$emit('close')">Cerrar</button>
    </div>
  </form>
</template>