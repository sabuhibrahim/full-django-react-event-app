import React, { useContext, useState } from "react";

import { Props } from "../types/props";

type LoginModal = {
    open: boolean,
    setOpen: (open: boolean) => void,
}

const initialData: LoginModal = {
  open: false,
  setOpen: (open: boolean) => {},
};

const LoginContext = React.createContext(initialData);

export const LoginProvider = (props: Props) => {
  const [open, setOpen] = useState<boolean>(false);

  const loginContext: LoginModal = {
    open,
    setOpen,
  };

  return (
    <LoginContext.Provider value={loginContext}>
      {props.children}
    </LoginContext.Provider>
  )
};


export const useLogin = () => useContext(LoginContext);

export default LoginContext;