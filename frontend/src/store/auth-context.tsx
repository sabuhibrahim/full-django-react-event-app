import React, { useContext, useState, useCallback } from "react";

import { AuthData, LoginData, RefreshData } from "../types/auth";
import { Props } from "../types/props";

const initialData: AuthData = {
  accessToken: null,
  refreshToken: null,
  isLoggedIn: false,
  login: (loginData: LoginData) => {},
  logout: () => {},
  refreshRequest: (refreshData: RefreshData) => {},
};

const AuthContext = React.createContext(initialData);

export const AuthProvider = (props: Props) => {
  const [accessToken, setAccessToken] = useState<string | null>(
    localStorage.getItem("accessToken")
  );
  const [refreshToken, setRefreshToken] = useState<string | null>(
    localStorage.getItem("refreshToken")
  );

  const isLoggedIn = !!accessToken && !!refreshToken;

  const logoutHandler = useCallback(() => {
    setAccessToken(null);
    setRefreshToken(null);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  }, []);

  const loginHandler = useCallback((loginData: LoginData) => {
    setAccessToken(loginData.accessToken);
    setRefreshToken(loginData.refreshToken);
    localStorage.setItem("accessToken", loginData.accessToken);
    localStorage.setItem("refreshToken", loginData.refreshToken);
  }, []);

  const refreshHandler = useCallback((refreshData: RefreshData) => {
    setAccessToken(refreshData.token);
    localStorage.setItem("accessToken", refreshData.token);
  }, []);

  const authContext: AuthData = {
    accessToken,
    refreshToken,
    isLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
    refreshRequest: refreshHandler,
  };

  return (
    <AuthContext.Provider value={authContext}>
      {props.children}
    </AuthContext.Provider>
  )
};


export const useAuth = () => useContext(AuthContext);

export default AuthContext;