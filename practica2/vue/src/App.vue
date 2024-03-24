<script setup>
import { ref, shallowRef } from 'vue';
import { Toaster, toast } from 'vue-sonner'

import Header from './components/Main/Header.vue'
import Categories from './components/Main/Categories/Categories.vue'
import Cart from './components/Cart/Cart.vue'
import Products from './components/Main/Products/Products.vue'
import Modal from './components/Modal/Modal.vue';
import OrderConfirmation from './components/Modal/ConfirmModal.vue';
import LoginModal from './components/Modal/LoginModal.vue';
import CategoryModal from './components/Modal/CategoryModal.vue';
import ProductModal from './components/Modal/ProductModal.vue';

import { useCartStore } from './stores/cart';
import { useDataStore } from './stores/products';

import AdminActions from './components/Main/Admin/AdminActions.vue';

const cartStore = useCartStore();
const productStore = useDataStore();

const { clear } = cartStore;
const { addCategory, addProduct } = productStore;

const showModal = ref(false);
const modalContent = shallowRef(null);

const isLogged = ref(false);

function openModal(content) {
  const components = {
    order: OrderConfirmation,
    login: LoginModal,
    product: ProductModal,
    category: CategoryModal,
  };
  modalContent.value = components[content];
  showModal.value = true;
}

function closeModal() {
  showModal.value = false;
}

function confirmOrder() {
  clear();
  closeModal();
}

function submitForm() {
  closeModal();
}

function submitCategory(value) {
  addCategory(value);
  closeModal();
}


function submitProduct(value) {
  addProduct(value);
  closeModal();
}

function checkLogin({ user, password }) {
  if (user === 'admin' && password === 'pass') {
    isLogged.value = true;
    toast.success('¡Bienvenido!  🎉');
    closeModal();
  } else {
    toast.warning('Usuario o contraseña incorrectos');
  }
}

</script>

<template>
  <Toaster richColors position="top-right" />
  <Modal :show="showModal" @close="closeModal">
    <component :is="modalContent" @cancel="closeModal" @confirm="confirmOrder" @submit="submitForm"
      @category="submitCategory" @product="submitProduct" @logged="checkLogin" />
  </Modal>
  <div class="flex flex-col w-full h-full min-w-screen min-h-screen">
    <Header :isLogged="isLogged" @open-modal="openModal" />
    <div class="flex flex-row w-full mt-4">
      <div class="flex flex-col w-4/6">
        <AdminActions v-if="isLogged" @open-modal="openModal" />
        <p class="text-4xl ml-4 mb-4 font-extralight">Productos</p>
        <Categories />
        <Products />
      </div>
      <div class="flex flex-col w-2/6 h-auto">
        <Cart @open-modal="openModal" />
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
</style>./components/Modal/LoginModal.vue
