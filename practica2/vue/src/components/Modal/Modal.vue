<script setup>
import { defineProps } from 'vue';
import { Icon } from '@iconify/vue';

defineProps({
  show: {
    type: Boolean,
    required: true,
  },
});
</script>

<template>
  <div v-if="show" class="z-50 fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div class="bg-white p-8 w-4/12 rounded-lg">
      <div class="flex flex-row w-full justify-end">
        <Icon icon="mdi:close-circle-outline" class="text-black cursor-pointer w-6 h-6" @click="$emit('close')" />
      </div>
      <slot @close="$emit('close')"></slot>
    </div>
  </div>
</template>
