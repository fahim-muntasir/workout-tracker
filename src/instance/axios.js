import axios from "axios";
const baseUrl = import.meta.env.VITE_API_URL_V1;

const axiosInstance = axios.create({
  baseURL: baseUrl,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${
      JSON.parse(localStorage.getItem("auth"))?.accessToken
    }`,
  },
});

export default axiosInstance;
