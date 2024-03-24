import { create } from "zustand";
import categoriesData from "../assets/categories.json";
import productsData from "../assets/products.json";

const mappedCategories = categoriesData.map((c) => ({ ...c, enabled: true }));
const mappedProducts = productsData.map((p) => ({ ...p }));

export const useDataStore = create((set) => ({
  categories: mappedCategories,
  products: mappedProducts,

  toggleCategoryEnabled: (categoryId) => {
    set((state) => ({
      categories: state.categories.map((category) =>
        category.id === categoryId
          ? { ...category, enabled: !category.enabled }
          : category
      ),
    }));
  },

  modifyProductStock: (productId, newStock) => {
    set((state) => {
      const updatedProducts = state.products.map((product) => {
        if (product.id === productId) {
          return { ...product, stock: newStock };
        }
        return product;
      });
      return { ...state, products: updatedProducts };
    });
  },

  addProduct: (product) => {
    set((state) => {
      if (!state.products.find((p) => p.description === product.description)) {
        const id =
          state.products.length > 0
            ? Math.max(...state.products.map((p) => p.id)) + 1
            : 1;
        product.id = id;
        product.price = Number(product.price);
        product.stock = Number(product.stock);
        return { products: [...state.products, product] };
      }
      return state;
    });
  },

  addCategory: (catName) => {
    set((state) => {
      if (!state.categories.find((c) => c.value === catName)) {
        const id =
          state.categories.length > 0
            ? Math.max(...state.categories.map((c) => c.id)) + 1
            : 1;
        const newCategory = { id, value: catName, enabled: true };
        return { categories: [...state.categories, newCategory] };
      }
      return state;
    });
  },
}));
