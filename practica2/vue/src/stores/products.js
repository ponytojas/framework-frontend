import { ref, computed } from "vue";
import { defineStore } from "pinia";
import categoriesData from "@/assets/categories.json";
import productsData from "@/assets/products.json";

const mappedCats = categoriesData.map((c) => ({ ...c, enabled: true }));

export const useDataStore = defineStore("data", () => {
  const categories = ref(mappedCats);
  const products = ref(productsData);

  const allCategories = computed(() => categories.value);

  const enabledCategories = computed(() =>
    categories.value.filter((category) => category.enabled)
  );

  const filteredProducts = computed(() => {
    const enabledCategoryIds = enabledCategories.value.map(
      (category) => category.id
    );

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

  return {
    allCategories,
    enabledCategories,
    filteredProducts,
    toggleCategoryEnabled,
  };
});
