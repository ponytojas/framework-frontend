import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { toast } from "sonner";
import { useSharedStore } from "../../store/shared";

export const LoginModal = () => {
  const setOpenModal = useSharedStore((state) => state.setOpenModal);
  const setModalType = useSharedStore((state) => state.setModalType);
  const setIsLogged = useSharedStore((state) => state.setIsLogged);

  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (event) => {
    event.preventDefault();
    if (!user || !password) return;
    const valid = user === "admin" && password === "pass";

    if (valid) {
      setIsLogged(true);
      toast.success("¡Bienvenido!  🎉");
      handleModalClose();
    } else {
      toast.warning("Usuario o contraseña incorrectos");
    }
  };

  const handleModalClose = () => {
    setOpenModal(false);
    setModalType(null);
  };

  return (
    <form className="mt-4">
      <div className="flex flex-col my-2">
        <div className="flex flex-row items-center">
          <Icon
            icon="mdi:user-key"
            className="mr-4 text-black h-6 w-6 mb-1 ml-1"
          />
          <label htmlFor="user">Usuario</label>
        </div>
        <input
          type="text"
          name="user"
          id="user"
          onChange={(e) => setUser(e.target.value)}
          className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
      </div>
      <div className="flex flex-col my-2">
        <div className="flex flex-row items-center">
          <Icon
            icon="material-symbols:password-rounded"
            className="mr-4 text-black h-6 w-6 mb-1 ml-1"
          />
          <label htmlFor="password">Contraseña</label>
        </div>
        <input
          type="password"
          name="password"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
          className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
      </div>
      <div className="flex flex-row justify-between mt-5">
        <button
          className="bg-green-700 px-4 py-2 rounded-lg text-white"
          onClick={(e) => handleLogin(e)}
        >
          Enviar
        </button>
        <button
          className="bg-red-700 px-4 py-2 rounded-lg text-white"
          onClick={handleModalClose}
        >
          Cerrar
        </button>
      </div>
    </form>
  );
};
