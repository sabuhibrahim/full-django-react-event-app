import React, { useContext, useState } from "react";

import { AuthData } from "../types/auth";
import { Props } from "../types/props";
import { User } from "../types/user";

const initialData: AuthData = {
  token: null,
  isLoggedIn: false,
  setToken: (token: string | null) => {},
  user: null,
  setUser: (user: User | null) => {},
  login: false,
  updateLogin: (l: boolean) => {},
  clearState: () => {},
};

const AuthContext = React.createContext(initialData);

export const AuthProvider = (props: Props) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [login, updateLogin] = useState<boolean>(false);

  const isLoggedIn = !!token;

  const clearState = () => {
    setToken(null);
    setUser(null);
    updateLogin(false);
  }

  const authContext: AuthData = {
    token,
    setToken,
    isLoggedIn,
    user,
    setUser,
    login,
    updateLogin,
    clearState,
  };

  return (
    <AuthContext.Provider value={authContext}>
      {props.children}
    </AuthContext.Provider>
  )
};


export const useAuth = () => useContext(AuthContext);

export default AuthContext;