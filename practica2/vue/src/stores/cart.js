import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { useDataStore } from "./products";

export const useCartStore = defineStore("cart", () => {
  const dataStore = useDataStore(); // Create an instance of the data store

  const items = ref([]);

  const total = computed(() => {
    return items.value
      .reduce((acc, item) => acc + item.totalPrice, 0)
      .toFixed(2);
  });

  function addItem(itemToAdd) {
    const product = dataStore.filteredProducts.find(
      (p) => p.id === itemToAdd.id
    );

    if (product && product.stock > 0) {
      const existingItem = items.value.find((item) => item.id === itemToAdd.id);

      if (existingItem) {
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.price * existingItem.quantity;
      } else {
        items.value.push({
          ...itemToAdd,
          quantity: 1,
          totalPrice: itemToAdd.price,
        });
      }

      product.stock--; // Decrease the stock in the product store
      return true; // Item successfully added
    } else {
      return false; // Insufficient stock
    }
  }

  function removeItem(itemId) {
    const itemIndex = items.value.findIndex((item) => item.id === itemId);

    if (itemIndex !== -1) {
      const item = items.value[itemIndex];
      item.quantity--;
      item.totalPrice = item.price * item.quantity;

      const product = dataStore.filteredProducts.find((p) => p.id === itemId);
      if (product) {
        product.stock++; // Increase the stock in the product store
      }

      if (item.quantity === 0) {
        items.value.splice(itemIndex, 1);
      }
    }
  }

  function clear(resetStock = false) {
    if (resetStock) {
      items.value.forEach((item) => {
        const product = dataStore.filteredProducts.find(
          (p) => p.id === item.id
        );
        if (product) {
          product.stock += item.quantity;
        }
      });
    }

    items.value = [];
  }

  return {
    items,
    total,
    addItem,
    removeItem,
    clear,
  };
});
