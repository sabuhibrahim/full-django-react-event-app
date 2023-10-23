import React, { useContext, useState } from "react";

import { Props } from "../types/props";

type AuthModal = {
  loginOpen: boolean,
  setLoginOpen: (open: boolean) => void,
  registerOpen: boolean,
  setRegisterOpen: (open: boolean) => void,
}

const initialData: AuthModal = {
  loginOpen: false,
  setLoginOpen: (open: boolean) => {},
  registerOpen: false,
  setRegisterOpen: (open: boolean) => {},
};

const AuthModalContext = React.createContext(initialData);

export const AuthModalProvider = (props: Props) => {
  const [loginOpen, setLoginOpen] = useState<boolean>(false);
  const [registerOpen, setRegisterOpen] = useState<boolean>(false);

  const authModalContext: AuthModal = {
    loginOpen,
    setLoginOpen,
    registerOpen,
    setRegisterOpen
  };

  return (
    <AuthModalContext.Provider value={authModalContext}>
      {props.children}
    </AuthModalContext.Provider>
  )
};


export const useAuthModal = () => useContext(AuthModalContext);

export default AuthModalContext;