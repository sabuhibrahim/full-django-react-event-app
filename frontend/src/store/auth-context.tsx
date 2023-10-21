import React, { useContext, useState } from "react";

import { AuthData } from "../types/auth";
import { Props } from "../types/props";

const initialData: AuthData = {
  token: null,
  isLoggedIn: false,
  setToken: (token: string) => {},
};

const AuthContext = React.createContext(initialData);

export const AuthProvider = (props: Props) => {
  const [token, setToken] = useState<string | null>(null);

  const isLoggedIn = !!token;

  const authContext: AuthData = {
    token,
    setToken,
    isLoggedIn
  };

  return (
    <AuthContext.Provider value={authContext}>
      {props.children}
    </AuthContext.Provider>
  )
};


export const useAuth = () => useContext(AuthContext);

export default AuthContext;