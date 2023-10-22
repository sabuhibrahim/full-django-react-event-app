import { useEffect } from "react";
import useAxios from "./use-axios";
import { useAuth } from "../store/auth-context";

const PROFILE_URL = "/profile";

const useUser = () => {
  const axios = useAxios();
  const { setUser, login } = useAuth();
  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get(PROFILE_URL);
        if (response.data) {
          setUser(response.data);
        }
      } catch (err) {
        console.error(err);
      }
    };
    getUser();
  }, [login]);
};

export default useUser;
