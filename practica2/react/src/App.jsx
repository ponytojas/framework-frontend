import React from "react";
import { Header } from "./components/Header";
import { Categories } from "./components/Categories";
import { Products } from "./components/Products";
import { Cart } from "./components/Cart";
import { Modal } from "./components/Modal";
import { Admin } from "./components/Admin";
import { useSharedStore } from "./store/shared";

const App = () => {
  const isLogged = useSharedStore((state) => state.isLogged);
  return (
    <>
      <div className="flex flex-col w-full h-full min-w-screen min-h-screen">
        <Modal />
        <Header />
        <div className="flex flex-row w-full mt-4">
          <div className="flex flex-col w-4/6">
            {isLogged && <Admin />}
            <p className="text-4xl ml-4 mb-4 font-extralight">Productos</p>
            <Categories />
            <Products />
          </div>
          <div className="flex flex-col w-2/6 h-auto">
            <Cart />
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
