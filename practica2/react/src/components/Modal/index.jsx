import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { useSharedStore } from "../../store/shared";
import { LoginModal } from "./LoginModal";
import { ConfirmModal } from "./ConfirmModal";
import { CategoryModal } from "./CategoryModal";
import { ProductModal } from "./ProductModal";

export const Modal = () => {
  const openModal = useSharedStore((state) => state.openModal);
  const modalType = useSharedStore((state) => state.modalType);
  const setOpenModal = useSharedStore((state) => state.setOpenModal);
  const setModalType = useSharedStore((state) => state.setModalType);

  const closeModal = () => {
    setOpenModal(false);
    setModalType(null);
  };
  const [Child, setChild] = useState(null);

  useEffect(() => {
    if (!openModal || !modalType) return;
    if (modalType === "login") {
      setChild(() => LoginModal);
    } else if (modalType === "confirm") {
      setChild(() => ConfirmModal);
    } else if (modalType === "category") {
      setChild(() => CategoryModal);
    } else if (modalType === "product") {
      setChild(() => ProductModal);
    } else {
      return;
    }
  }, [openModal, modalType]);

  if (!openModal || !modalType) return null;

  return (
    <div className="z-50 fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 w-4/12 rounded-lg">
        <div className="flex flex-row w-full justify-end">
          <Icon
            icon="mdi:close-circle-outline"
            className="text-black cursor-pointer w-6 h-6"
            onClick={() => closeModal()}
          />
        </div>
        {Child && <Child />}
      </div>
    </div>
  );
};
