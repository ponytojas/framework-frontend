import React from "react";
import { Icon } from "@iconify/react";
import { useCartStore } from "../../store/cart";
export const Cart = () => {
  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const total = items.reduce((acc, item) => acc + item.totalPrice, 0);

  return (
    <div className="flex flex-row min-h-96 bg-gray-100 w-11/12 rounded-lg sticky top-0">
      <div className="flex flex-col w-full">
        <div className="flex flex-col pt-7 pl-7 justify-center content-center align-middle">
          <div className="flex flex-row justify-center w-full">
            <div className="flex flex-col">
              <Icon
                icon="ic:outline-shopping-bag"
                className="pb-1"
                width="42"
                height="42"
              />
            </div>
            <div className="flex flex-col">
              <p className="text-4xl ml-2 font-light">Carrito</p>
            </div>
          </div>
          <div v-if="items.length > 0">
            <div className="flex flex-row w-full justify-evenly my-4">
              <p className="text-2xl font-semibold">{`Total: ${total}€`}</p>
              <button className="bg-green-700 px-4 py-2 rounded-lg text-white">
                Realizar el pedido
              </button>
            </div>
            <div className="flex flex-col">
              {items.map((product) => (
                <div
                  className="flex flex-row w-full items-center justify-between my-3 pr-3 pb-4"
                  key={product.id}
                >
                  <div className="flex flex-row">
                    <img src={product.image} className="w-12 h-12 mr-5" />
                    <div className="flex flex-col">
                      <div className="flex flex-row">{product.description}</div>
                      <div className="flex flex-row">
                        Cantidad: {product.quantity}. Total:{" "}
                        {product.price * product.quantity}€
                      </div>
                    </div>
                  </div>
                  <button
                    className="border border-red-500 px-2 py-1 rounded-lg text-red-500 hover:bg-red-500 hover:text-white"
                    onClick={() => removeItem(product.id)}
                  >
                    Eliminar de la cesta
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
