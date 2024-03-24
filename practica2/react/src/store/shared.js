import { create } from "zustand";
import zustymiddleware from "zustymiddleware";

export const useSharedStore = create(
  zustymiddleware((set) => ({
    openModal: false,
    isLogged: false,
    modalType: null,
    setOpenModal: (value) => set({ openModal: value }),
    setIsLogged: (value) => set({ isLogged: value }),
    setModalType: (value) => set({ modalType: value }),
  }))
);
