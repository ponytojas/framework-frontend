<script setup>
defineProps({
  isLogged: {
    type: Boolean,
    required: true,
  },
});
</script>
<template>
  <div class="w-full min-w-screen bg-gray-100 px-4 py-4 h-16 content-center items-center justify-items-center">
    <div class="flex flex-row content-center items-center justify-items-center">
      <p class="text-3xl font-thin">Frameworks frontend</p>
      <button v-if="!isLogged" class="my-auto text-lg ml-6" @click="$emit('open-modal', 'login')">Login</button>
      <button v-else class="my-auto text-lg ml-6" @click="$emit('open-modal', 'login')">Logout</button>
    </div>
  </div>
</template>