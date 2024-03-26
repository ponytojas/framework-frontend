import React from "react";
import { useSharedStore } from "../../store/shared";

export const Admin = () => {
  const setOpenModal = useSharedStore((state) => state.setOpenModal);
  const setModalType = useSharedStore((state) => state.setModalType);

  const handleNewCategory = () => {
    setOpenModal(true);
    setModalType("category");
  };

  const handleNewProduct = () => {
    setOpenModal(true);
    setModalType("product");
  };

  return (
    <div className="flex flex-row justify-evenly">
      <button
        className="px-2 py-2 border border-green-600 rounded-lg text-green-800 hover:bg-green-600 hover:text-white cursor-pointer"
        onClick={handleNewCategory}
      >
        Añadir nueva categoría
      </button>
      <button
        className="px-2 py-2 border border-green-600 rounded-lg text-green-800 hover:bg-green-600 hover:text-white cursor-pointer"
        onClick={handleNewProduct}
      >
        Añadir nuevo producto
      </button>
    </div>
  );
};
