import { create } from "zustand";
import { useDataStore } from "./data";

export const useCartStore = create((set) => ({
  items: [],

  addItem: (itemToAdd, cb) => {
    const { products, modifyProductStock } = useDataStore.getState();
    const product = products.find((p) => p.id === itemToAdd.id);

    if (product && product.stock > 0) {
      set((state) => {
        const existingItemIndex = state.items.findIndex(
          (item) => item.id === itemToAdd.id
        );

        if (existingItemIndex !== -1) {
          const updatedItems = [...state.items];
          const existingItem = updatedItems[existingItemIndex];
          const updatedItem = {
            ...existingItem,
            quantity: existingItem.quantity + 1,
            totalPrice: existingItem.price * (existingItem.quantity + 1),
          };
          updatedItems[existingItemIndex] = updatedItem;
          return { ...state, items: updatedItems };
        } else {
          const newItem = {
            ...itemToAdd,
            quantity: 1,
            totalPrice: itemToAdd.price,
          };
          return { ...state, items: [...state.items, newItem] };
        }
      });

      modifyProductStock(itemToAdd.id, product.stock - 1);
      cb(true);
    } else {
      cb(false);
    }
  },

  removeItem: (itemId) => {
    set((state) => {
      const itemIndex = state.items.findIndex((item) => item.id === itemId);

      if (itemIndex !== -1) {
        const updatedItems = [...state.items];
        const item = updatedItems[itemIndex];
        const updatedItem = {
          ...item,
          quantity: item.quantity - 1,
          totalPrice: item.price * (item.quantity - 1),
        };

        if (updatedItem.quantity === 0) {
          updatedItems.splice(itemIndex, 1);
        } else {
          updatedItems[itemIndex] = updatedItem;
        }

        const { products, modifyProductStock } = useDataStore.getState();
        const product = products.find((p) => p.id === itemId);
        if (product) {
          modifyProductStock(itemId, product.stock + 1);
        }

        return { ...state, items: updatedItems };
      }
    });
  },

  clear: (resetStock = false) => {
    if (resetStock) {
      const dataStore = useDataStore.getState();
      useCartStore.getState().items.forEach((item) => {
        const product = dataStore.products.find((p) => p.id === item.id);
        if (product) {
          useDataStore.setState((state) => {
            product.stock += item.quantity;
          });
        }
      });
    }

    set({ items: [] });
  },
}));
