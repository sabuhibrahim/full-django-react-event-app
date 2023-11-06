import { useEffect, useState } from "react";
import { Club } from "../types/club";
import useAxios from "./use-axios";
import { Query } from "../types/query";

const CLUBS_URL = "/clubs";

const useClubs = ({ search, page }: Query) => {
  const [clubs, setClubs] = useState<Club[]>([]);
  const [count, setCount] = useState<number>(0);

  const axios = useAxios();

  useEffect(() => {
    const getClubs = async () => {
      const params = {
        page: page ?? 1,
      };
      if (!!search) params["query"] = search;
      try {
        const response = await axios.get(CLUBS_URL, { params });
        if (response.data) {
          setClubs(response.data.results);
          setCount(response.data.count);
        }
      } catch (err) {
        console.error(err);
      }
    };

    getClubs();
  }, [search, page]);
  return { clubs, count };
};

export default useClubs;
