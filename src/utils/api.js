import axios from "axios";
import { getLocalStorage, deleteLocalStorage } from "./localStorage";

export const BASE_URL = process.env.REACT_APP_API_BASE_URL;

let auth = localStorage.getItem("auth");
if (auth) {
  auth = JSON.parse(auth);
}
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  // withCredentials: true,
  headers: {
    'Accept': 'application/json',
    Authorization: `Bearer ${auth?.token}`,
  },
});

export const axiosWithActiveBranch = axios.create({
  baseURL: BASE_URL,
  // withCredentials: true,
  headers: {
    'Accept': 'application/json',
    Authorization: `Bearer ${auth?.token}`,
    'active_branch_id': getLocalStorage('active_branch_id'),
  },
});

axiosInstance.interceptors.request.use(function (config) {
  const auth = getLocalStorage("auth");
  config.headers.Authorization =
    auth && auth.token ? `Bearer ${auth.token}` : "";
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    try {
      const originalRequest = error.config;
      if (error.response.status === 403 && !originalRequest._retry) {
        originalRequest._retry = true;
        deleteLocalStorage("auth");
        window.location.reload();
        // return axiosInstance(originalRequest);
      } else if (error.response.status === 406) {
        // console.log(error, 'error')
        // deleteLocalStorage("auth");
        // window.location.reload();
      }
      return Promise.reject(error);
    } catch (err) {
      return Promise.reject(err);
    }
  }
);

export default axiosInstance;
