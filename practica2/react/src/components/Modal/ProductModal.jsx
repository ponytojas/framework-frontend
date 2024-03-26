import React, { useState } from "react";
import { useDataStore } from "../../store/data";
import { useSharedStore } from "../../store/shared";

export const ProductModal = () => {
  const allCategories = useDataStore((state) => state.categories);
  const addProduct = useDataStore((state) => state.addProduct);
  const setOpenModal = useSharedStore((state) => state.setOpenModal);
  const setModalType = useSharedStore((state) => state.setModalType);

  const [product, setProduct] = useState({
    price: "",
    description: "",
    stock: "",
    categoryId: "",
    image: "",
  });

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      setProduct({ ...product, image: e.target.result });
    };
    reader.readAsDataURL(file);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addProduct(product);
    setOpenModal(false);
    setModalType(null);
  };

  return (
    <div className="bg-white p-4 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Añadir nuevo producto</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          name="description"
          value={product.description}
          onChange={handleChange}
          type="text"
          placeholder="Descripción"
          className="border border-gray-300 p-2 rounded-lg"
        />
        <input
          type="file"
          onChange={handleImageUpload}
          accept="image/*"
          className="border border-gray-300 p-2 rounded-lg"
        />
        <input
          name="price"
          value={product.price}
          onChange={handleChange}
          type="text"
          placeholder="Precio"
          className="border border-gray-300 p-2 rounded-lg"
        />
        <input
          name="stock"
          value={product.stock}
          onChange={handleChange}
          type="text"
          placeholder="Stock"
          className="border border-gray-300 p-2 rounded-lg"
        />
        <select
          name="categoryId"
          value={product.categoryId}
          onChange={handleChange}
          className="border border-gray-300 p-2 rounded-lg"
        >
          {allCategories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.value}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="bg-green-600 text-white p-2 rounded-lg"
        >
          Añadir
        </button>
      </form>
    </div>
  );
};
