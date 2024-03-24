import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { useCartStore } from "../../store/cart";

export const ProductCard = ({ product }) => {
  const { id, description, price, stock, image } = product;
  const [isOutOfStock, setIsOutOfStock] = useState(false);

  const addItem = useCartStore((state) => state.addItem);
  const handleAddToCart = () => {
    const cb = (success) => {
      if (!success) {
        toast.error("No hay stock disponible");
      }
    };
    addItem(product, cb);
  };

  useEffect(() => {
    setIsOutOfStock(stock === 0);
  }, [stock]);

  const imageClasses = `max-w-full max-h-full cursor-zoom-in object-contain transition duration-500 ease-in-out transform hover:scale-150 hover:z-10 ${
    isOutOfStock ? "grayscale opacity-50" : ""
  }`;

  return (
    <>
      <div className="flex flex-row w-10/12 h-48">
        <div className="w-1/4 h-full rounded-l-md flex justify-center items-center">
          <div className="relative">
            <img
              src={product.image}
              alt={product.description}
              className={imageClasses}
            />
          </div>
        </div>
        <div className="flex flex-col w-full p-2">
          <p className="text-xl">{product.description}</p>
          <p className="mt-4 text-sm">Producto: {product.id}</p>
          <p className="mt-4 font-light">Stock disponible: {product.stock}</p>
          <p className="mt-4 font-light">Precio: {product.price}€</p>
        </div>
        <button className="text-teal-500" onClick={() => handleAddToCart()}>
          Agregar a la cesta
        </button>
      </div>
    </>
  );
};
