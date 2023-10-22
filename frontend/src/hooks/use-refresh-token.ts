import { useCallback } from "react";
import axios from "../api/axios";
import { useAuth } from "../store/auth-context";

const REFRESH_URL = "/auth/refresh";

const useRefreshToken = () => {
  const { setToken } = useAuth();

  return useCallback(async () => {
    const response = await axios.post(REFRESH_URL, {
      withCredentials: true,
    });
    console.log(response.data);
    setToken(response.data.token);
    return response.data.token;
  }, []);
};

export default useRefreshToken;
