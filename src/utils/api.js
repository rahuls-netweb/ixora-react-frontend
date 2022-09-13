import axios from "axios";

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

export default axiosInstance;
