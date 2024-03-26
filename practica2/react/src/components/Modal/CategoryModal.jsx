import React, { useEffect, useState } from "react";
import { useDataStore } from "../../store/data";
import { useSharedStore } from "../../store/shared";

export const CategoryModal = () => {
  const addCategory = useDataStore((state) => state.addCategory);
  const setOpenModal = useSharedStore((state) => state.setOpenModal);
  const setModalType = useSharedStore((state) => state.setModalType);

  const [category, setCategory] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    addCategory(category);
    setOpenModal(false);
    setModalType(null);
  };

  return (
    <div className="bg-white p-4 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Añadir nueva categoría</h2>
      <form action="" className="flex flex-col gap-4">
        <input
          onChange={(e) => setCategory(e.target.value)}
          type="text"
          placeholder="Nombre de la categoría"
          className="border border-gray-300 p-2 rounded-lg"
        />
        <button
          type="submit"
          className="bg-green-600 text-white p-2 rounded-lg"
          onClick={handleSubmit}
        >
          Añadir
        </button>
      </form>
    </div>
  );
};
