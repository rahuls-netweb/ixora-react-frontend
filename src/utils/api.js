import axios from "axios";
import { getLocalStorage } from "./localStorage";

export const BASE_URL = process.env.REACT_APP_API_BASE_URL;

let auth = localStorage.getItem("auth");
if (auth) {
  auth = JSON.parse(auth);
}
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  // withCredentials: true,
  headers: {
    Authorization: `Bearer ${auth?.token}`,
  },
});

axiosInstance.interceptors.request.use(function (config) {
  const auth = getLocalStorage("auth");
  config.headers.Authorization =
    auth && auth.token ? `Bearer ${auth.token}` : "";
  return config;
});

export default axiosInstance;
