<script setup>
import Header from './components/Main/Header.vue'
import Categories from './components/Main/Categories/Categories.vue'
import Cart from './components/Cart/Cart.vue'
import Products from './components/Main/Products/Products.vue'
</script>

<template>
  <div class="flex flex-col w-full h-full min-w-screen min-h-screen">
    <Header />
    <div class="flex flex-row w-full mt-4">
      <div class="flex flex-col w-4/6">
        <p class="text-4xl ml-4 mb-4 font-extralight">Productos</p>
        <Categories />
        <Products />
      </div>
      <div class="flex flex-col w-2/6">
        <Cart />
      </div>
    </div>
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
