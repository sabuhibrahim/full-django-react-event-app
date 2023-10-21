import { useCallback } from "react";
import axios from "../api/axios";
import { useAuth } from "../store/auth-context";

const useRefreshToken = () => {
  const { setToken } = useAuth();

  return useCallback(async () => {
    const response = await axios.post("/refresh", {
      withCredentials: true,
    });
    console.log(response.data);
    setToken(response.data.token);
    return response.data.token;
  }, []);
};

export default useRefreshToken;
