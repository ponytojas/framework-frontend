import React from "react";
import { useDataStore } from "../../store/data";
import { ProductCard } from "./ProductCard";
export const Products = () => {
  const products = useDataStore((state) => state.products);
  const categories = useDataStore((state) => state.categories);
  const enabledCategories = categories
    .filter((category) => category.enabled)
    .map((category) => category.id);
  const filteredProducts = products.filter((product) =>
    enabledCategories.includes(product.categoryId)
  );

  return (
    <>
      <div className="flex flex-col w-full justify-center align-middle items-center content-center flex-wrap">
        {filteredProducts.map((product, index) => (
          <React.Fragment key={product.id}>
            <ProductCard product={product} />
            {index < filteredProducts.length - 1 && (
              <hr className="w-10/12 my-4" />
            )}
          </React.Fragment>
        ))}
      </div>
    </>
  );
};
