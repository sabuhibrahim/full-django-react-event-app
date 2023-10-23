import { useEffect } from "react";
import axios from "../api/axios";
import { useAuth } from "../store/auth-context";
import useRefreshToken from "./use-refresh-token";

const useAxios = () => {
  const refresh = useRefreshToken();
  const { token } = useAuth();

  useEffect(() => {
    const requestIntercept = axios.interceptors.request.use(
      (config) => {
        if (token && !config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
      },
      (err) => Promise.reject(err)
    );

    const responseIntercept = axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true;
          const newToken = await refresh();
          prevRequest.headers["Authorization"] = `Bearer ${newToken}`;
          return axios(prevRequest);
        }

        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.request.eject(requestIntercept);
      axios.interceptors.response.eject(responseIntercept);
    };
  }, [token, refresh]);

  return axios;
};

export default useAxios;
