import axios from "axios";

const BASE_URL = "http://localhost/api/v1";

export default axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
