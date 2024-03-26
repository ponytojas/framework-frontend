import React from "react";
import { toast } from "sonner";

import { useSharedStore } from "../../store/shared";
import { useCartStore } from "../../store/cart";

export const ConfirmModal = () => {
  const setOpenModal = useSharedStore((state) => state.setOpenModal);
  const setModalType = useSharedStore((state) => state.setModalType);
  const clear = useCartStore((state) => state.clear);

  const handleModalClose = () => {
    setOpenModal(false);
    setModalType(null);
  };

  const handleConfirmOrder = () => {
    clear();
    toast.success("Pedido realizado!  🥳");
    handleModalClose();
  };
  return (
    <div className="flex flex-col w-full h-auto">
      <div className="flex flex-row mt-4">
        <p className="text-2xl font-thin">
          ¿Estás seguro de que quieres realizar el pedido?
        </p>
      </div>
      <div className="flex flex-row justify-evenly mt-10">
        <button
          className="rounded-md px-2 py-2 border border-red-400 text-red-400 hover:bg-red-500 hover:text-white"
          onClick={handleModalClose}
        >
          Cancelar
        </button>
        <button
          className="rounded-md px-2 py-2 bg-green-600 text-white hover:bg-green-800"
          onClick={handleConfirmOrder}
        >
          Confirmar
        </button>
      </div>
    </div>
  );
};
