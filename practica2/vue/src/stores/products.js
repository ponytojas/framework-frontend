import { ref, computed } from "vue";
import { defineStore } from "pinia";
import categoriesData from "@/assets/categories.json";
import productsData from "@/assets/products.json";

const mappedCats = categoriesData.map((c) => ({ ...c, enabled: true }));
const mappedProducts = productsData.map((p) => ({ ...p }));

export const useDataStore = defineStore("data", () => {
  const categories = ref(mappedCats);
  const products = ref(mappedProducts);

  const allCategories = computed(() => categories.value);

  const enabledCategories = computed(() =>
    categories.value.filter((category) => category.enabled)
  );

  const filteredProducts = computed(() => {
    const enabledCategoryIds = enabledCategories.value.map(
      (category) => category.id
    );
    // Access `products.value` to interact with the reactive reference.
    return products.value.filter((product) =>
      enabledCategoryIds.includes(product.categoryId)
    );
  });

  const toggleCategoryEnabled = (categoryId) => {
    const category = categories.value.find(
      (category) => category.id === categoryId
    );
    if (category) {
      category.enabled = !category.enabled;
    }
  };

  const addProduct = (product) => {
    if (!products.value.find((p) => p.description === product.description)) {
      const id =
        products.value.length > 0
          ? Math.max(...products.value.map((p) => p.id)) + 1
          : 1;
      product.id = id;
      product.price = Number(product.price);
      product.stock = Number(product.stock);
      products.value.push(product);
    }
  };

  const addCategory = (catName) => {
    if (!categories.value.find((c) => c.value === catName)) {
      const id =
        categories.value.length > 0
          ? Math.max(...categories.value.map((c) => c.id)) + 1
          : 1;
      const newCategory = { id, value: catName, enabled: true };
      categories.value.push(newCategory);
    }
  };

  return {
    products,
    allCategories,
    enabledCategories,
    filteredProducts,
    toggleCategoryEnabled,
    addProduct,
    addCategory,
  };
});
