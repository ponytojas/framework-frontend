import React from "react";
import { useSharedStore } from "../../store/shared";

export const Header = () => {
  const isLogged = useSharedStore((state) => state.isLogged);
  const setIsLogged = useSharedStore((state) => state.setIsLogged);
  const setOpenModal = useSharedStore((state) => state.setOpenModal);
  const setModalType = useSharedStore((state) => state.setModalType);

  const handleLogin = () => {
    setOpenModal(true);
    setModalType("login");
  };
  return (
    <>
      <div className="w-full min-w-screen bg-gray-100 px-4 py-4 h-16 content-center items-center justify-items-center">
        <div className="flex flex-row content-center items-center justify-items-center">
          <p className="text-3xl font-thin">Frameworks frontend</p>
          {!isLogged && (
            <button className="my-auto text-lg ml-6" onClick={handleLogin}>
              Login
            </button>
          )}
          {isLogged && (
            <button
              className="my-auto text-lg ml-6"
              onClick={() => setIsLogged(false)}
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </>
  );
};
